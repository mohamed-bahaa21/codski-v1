const connect = require("../dbconnect"); //database connections
const Chat = require("../models/Chat");
const User = require("../models/User");

// ======================================================================
// socket.io event listener
module.exports = function (socket) {
    socket.on("connection", socket => {
        var username = socket.request.session.username;
        socket.join(`${username}`);
        
        if (username) {
            // console.log("user connected");
            socket.send(username);
        } else {
            console.log("admin connected");
        }

        socket.on("disconnect", function () {
            if (username) {
                // console.log("user disconnected");
                socket.send(username);
            } else {
                console.log("admin disconnected");
            }
        });

        //Someone is typing
        socket.on("typing", data => {
            socket.to(`${username}`).emit("notifyTyping", {
                user: data.user,
                message: data.message
            });
        });

        //when soemone stops typing
        socket.on("stopTyping", () => {
            socket.to(`${username}`).emit("notifyStopTyping");
        });

        socket.on("chat message", function ({ username, sender, message }) {
            console.log({
                "username": username,
                "sender": sender,
                "message": message
            });

            // broadcast message to everyone in port:5000 except yourself.
            socket.to(`${username}`).emit("received", { username: username, sender: sender, message: message });

            //save chat to the database
            connect.then((db) => {
                console.log("DB connected correctly...");
                User.findOne({ username: username }).then(user => {
                    // console.log(chatMessage);
                    let chatMessage = new Chat({ username: username, sender: username, message: message });
                    chatMessage.save().then(msg => {
                        user.chat.push(msg._id);
                        user.unread = true;
                        user.save()
                    })
                })
            });
        });
    });
}