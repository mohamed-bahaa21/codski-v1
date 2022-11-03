// http://localhost:5001
// https://chat.horizon-lenses.com
var socket = io("/", {
  // transports: ['websocket'],
  // upgrade: true,
  withCredentials: true,
  extraHeaders: {
    "secret-header": "horizon"
  }
});
var messages = document.getElementById("messages");


function updateScroll() {
  messages.scrollTop = messages.scrollHeight;
}

(function () {
  socket.on('message', function (username) {
    console.log("data from here: ", username);

    $("form").submit(function (e) {
      let li = document.createElement("li");
      let p = document.createElement("p");
      let span = document.createElement("span");

      e.preventDefault(); // prevents page reloading
      socket.emit("chat message", { username: username, sender: username, message: $("#message").val() });

      li.appendChild(p).append($("#message").val());
      li.appendChild(span).append("by " + "You" + ": " + "just now");
      messages.appendChild(li);

      $("#message").val("");
      updateScroll();
      return false;
    });
  });

  socket.on("received", data => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let span = document.createElement("span");
    var messages = document.getElementById("messages");
    updateScroll();

    if (data.sender == data.username) {
      li.appendChild(p).append(data.message);
      li.appendChild(span).append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
      messages.appendChild(li);
    } else {
      li.classList.add("right");
      li.appendChild(p).append(data.message);
      li.appendChild(span).append("by " + "Horizon" + ": " + formatTimeAgo(data.createdAt));
      messages.appendChild(li);
    }
    console.log("Hello bingo!");
  });
})();

// fetching initial chat messages from the database
(function () {
  fetch("/chats")
    .then(data => {
      return data.json();
    })
    .then(json => {
      json.map(data => {
        let li = document.createElement("li");
        let p = document.createElement("p");
        let span = document.createElement("span");

        if (data.sender == data.username) {
          li.appendChild(p).append(data.message);
          li.appendChild(span).append("by " + "You" + ": " + formatTimeAgo(data.createdAt));
          messages.appendChild(li);
        } else {
          li.classList.add("right");
          li.appendChild(p).append(data.message);
          li.appendChild(span).append("by " + "Horizon" + ": " + formatTimeAgo(data.createdAt));
          messages.appendChild(li);
        }
        updateScroll();
      });
    });
})();

//is typing...

let messageInput = document.getElementById("message");
let typing = document.getElementById("typing");

//isTyping event
messageInput.addEventListener("keypress", () => {
  socket.emit("typing", { user: "Someone", message: "is typing..." });
});

socket.on("notifyTyping", data => {
  typing.innerText = data.user + " " + data.message;
  console.log(data.user + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
  socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
  typing.innerText = "";
});
