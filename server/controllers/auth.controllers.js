const Admin = require("../models/Admin");
// const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");

// Admin Auth
exports.postAdminLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                // res.send("Successfully Authenticated");
                // console.log(req.user);
                // return res.redirect('http://localhost:3000/' + req.user._id || req.session.user._id);
                return res.send(req.user._id || req.session.user._id);
            });
        }
    })(req, res, next);
};

exports.postAdminRegister = (req, res) => {
    Admin.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new Admin({
                username: req.body.username,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("User Created");
        }
    });
};

// =========================================================
exports.getAdminUser = (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
};