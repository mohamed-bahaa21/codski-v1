const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("../dbconnect");
const User = require("../models/User");
const Chats = require("../models/Chat");

const app = express();
const router = express.Router();

require('dotenv').config();

var AWS = require('aws-sdk');


// socket.emit("chat message", { username: username, sender: username, message: req.body.message });

router.get("/signup", (req, res, next) => {
  console.log("signup local phone: ", res.app.locals.phone);
  if (req.session.loggedIn) {
    req.flash('info', "You're logged in already")
    res.redirect('/')
  } else {
    res.render('signup', {
      msgs: req.flash('info')
    })
  }
});
router.get('/signup/verify', (req, res, next) => {
  console.log("verify local phone: ", res.app.locals.phone);
  if (!res.app.locals.phone) {
    req.flash('info', "Link isn't valid")
    res.redirect('/signup')

  } else {
    res.render('verify', {
      msgs: req.flash('info')
    })
  }
})
router.get('/signup/setup', (req, res, next) => {
  console.log("setup local phone: ", res.app.locals.phone);
  if (!res.app.locals.phone) {
    req.flash('info', "Link isn't valid")
    res.redirect('/signup')
  } else {
    res.render('setup', {
      msgs: req.flash('info')
    })
  }
})




/*
signup:

phone                 | phone                         | no-phone
otp                   | no-otp                        | >verify
>verify(old-otp)      | >verify(new-otp)              | >setup
>setup                | >setup               
*/
router.post("/signup", (req, res, next) => {
  var { phone } = req.body;
  var randomOTP = `${Math.floor(100000 + Math.random() * 900000)}`

  User.findOne({ phone: phone }).then(user => {

    if (!user) {
      console.log("no user");

      const newUser = new User({
        phone: phone,
        otp: randomOTP,
        otp_valid: true,
        unread: true
      });

      newUser.save()
        .then(() => {
          // ======================================================
          // send verification message









          const YOUR_MESSAGE = `Your verification code is ${randomOTP}`
          var subject = "Signup";

          // console.log("Subject = " + subject);
          // console.log("Phone = " + phone);
          // console.log("OTP_Message = " + randomOTP);

          var params = {
            Message: YOUR_MESSAGE,
            PhoneNumber: phone,
            MessageAttributes: {
              'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': subject
              },
              'AWS.SNS.SMS.SMSType': {
                'DataType': 'String',
                'StringValue': "Transactional"
              }
            }
          };

          var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

          publishTextPromise.then(
            function (data) {
              res.app.locals.phone = phone;
              // console.log(data)
              // res.end(JSON.stringify({ MessageID: data.MessageId, OTP: randomOTP }));

              req.flash('info', "We sent the new verification code")
              res.redirect(`/signup/verify`)

            }).catch(
              function (err) {
                res.end(JSON.stringify({ Error: err }));
              });















          // ==============================================
        })
        .catch(err => {
          res.send(err)
          // req.flash('info', "[1] Something went wrong")
          // res.redirect('/signup'`)
        })
    } else {
      if (user.otp_valid) {
        res.app.locals.phone = phone;

        req.flash('info', "We already have sent a code, check it out !")
        res.redirect('/signup/verify')
      } else {
        if (user.username) {
          req.flash('info', "You already have an account")
          res.redirect('/login')
        } else {
          req.flash('info', "We sent and you missed, signup tomorrow")
          res.redirect('/signup')
        }
      }
    }
  });

});
router.post('/signup/verify', (req, res, next) => {

  var { digit_1, digit_2, digit_3, digit_4, digit_5, digit_6 } = req.body;
  var SUBMITTED_OTP = digit_1 + digit_2 + digit_3 + digit_4 + digit_5 + digit_6;

  console.log("SUBMITTED_OTP: ", SUBMITTED_OTP);

  User.findOne({ phone: res.app.locals.phone }).then(user => {
    if (user) {
      if (user.otp_valid) {
        if (user.otp == SUBMITTED_OTP) {

          user.otp = null;
          user.otp_valid = false;

          user.save()
            .then(data => {
              console.log(data);
              req.flash('info', "Accepted, Setup you account")
              res.redirect('/signup/setup')
            })
            .catch(err => {
              console.log("Error: ", err);
              req.flash('info', "[verify] Something went wrong")
              res.redirect('/signup/verify')
            })
        } else {
          req.flash('info', "Wrong verification code")
          res.redirect('/signup/verify')
        }
      } else {
        req.flash('info', "Verification code isn't valid")
        res.redirect('/signup/verify')
      }
    } else {
      req.flash('info', "[*] Something went wrong")
      res.redirect('/signup')
    }
  })
})
router.post('/signup/setup', (req, res, next) => {
  var { username, password } = req.body;
  var phone = res.app.locals.phone;

  User.findOne({ username: username })
    .then(user => {
      if (user) {
        req.flash('info', "This username is already used")
        res.redirect('/signup/setup')
      } else if (password.length <= 7) {
        req.flash('info', "Password must be more than 7 letters")
        res.redirect('/signup/setup')
      } else {
        User.findOne({ phone: phone }).then(setupUser => {
          setupUser.username = username;
          setupUser.password = password;

          setupUser.save()
            .then(data => {
              console.log(data);
              res.locals.username = username;
              req.flash('info', "Account Setup Successfully")
              next();
            })
            .catch(err => {
              console.log("Error: ", err);
              req.flash('info', "[verify] Something went wrong")
              res.redirect('/signup')
            })
        })
      }
    })
}, (req, res) => {
  req.session.loggedIn = true;
  req.session.username = res.locals.username;
  // console.log(req.session);
  req.flash('info', "Logged in successfully")
  res.redirect('/')
});



router.get("/login", (req, res, next) => {
  if (req.session.loggedIn) {
    req.flash('info', "You're logged in already")
    res.redirect('/')
  } else {
    res.render('login', {
      msgs: req.flash('info')
    })
  }
});

router.post("/login", (req, res, next) => {
  var { username, password } = req.body;

  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        req.flash('info', "This username wasn't found")
        res.redirect('/login')
      } else {
        if (user.password !== password) {
          req.flash('info', "Either username or password is wrong")
          res.redirect('/login')
        }
        if (user.password == password) {
          res.locals.username = user.username;
          next();
        }
      }
    })
}, (req, res) => {
  req.session.loggedIn = true;
  req.session.username = res.locals.username;
  // console.log(req.session);
  req.flash('info', "Logged in successfully")
  res.redirect('/')
});

router.get("/logout", (req, res, next) => {
  // req.session.destroy((err) => { })
  req.session.loggedIn = false;
  req.flash('info', "Logged out successfully")
  res.redirect('/login')
})


// ==================================================================
router.get('/', (req, res, next) => {
  if (req.session.loggedIn) {
    // console.log(req.session);
    res.render('chats', {
      msgs: req.flash('info')
    });
  } else {
    req.flash('info', "login first")
    res.redirect('/login');
  }
})

router.get("/chats", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  let username = req.session.username;
  console.log(username);

  connectdb.then(db => {
    // let data = Chats.find({ message: "Anonymous" });
    Chats.find({ username: username }).then(chat => {
      res.json(chat);
    });
  });
});







// ================================================================
// API
router.post("/api/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        res.status(200).send(user.username);
      } else {
        res.status(404).send("No user was found");
      }
    })
}, (req, res) => {
  req.session.loggedIn = true;
  req.session.username = res.locals.username;
  // console.log(req.session);
  req.flash('info', "Logged in successfully")
  res.redirect('/')
});

router.get("/api/getUnread", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  connectdb.then(db => {
    // let data = Chats.find({ message: "Anonymous" });
    User.findOne({ unread: true }).then(user => {
      if (user) {
        res.json({ unread: true });
      } else {
        res.json({ unread: false });
      }
    });
  });
});

router.get("/api/users", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  connectdb.then(db => {
    // let data = Chats.find({ message: "Anonymous" });
    User.find().then(users => {
      res.json(users);
    });
  });
});

router.get("/api/users/:username", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  let username = req.params.username;

  connectdb.then(db => {
    // let data = Chats.find({ message: "Anonymous" });
    User.findOne({ username: username }).populate('chat').then(user => {
      if (user) {
        if (user.unread == true && user.unread !== null) {
          user.unread = false;
          user.save()
            .then(newUser => {
              res.json(newUser);
            })
            .catch(err => { console.error(err); })
        } else {
          res.json(user);
        }
      }
    });
  });
});

router.post("/api/users/:username", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  let username = req.params.username;

  console.log("Admin sent a message");
  User.findOne({ username: username }).then(user => {
    // console.log(chatMessage);
    let chatMessage = new Chats({ username: req.body.username, sender: req.body.sender, message: req.body.message });
    chatMessage.save().then(msg => {
      user.chat.push(msg._id);
      user.unread = true;

      user.save()
    })
  })
});

module.exports = router;
