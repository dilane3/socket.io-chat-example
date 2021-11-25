const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 5000

const colors = [
  "red",
  "blue",
  "green",
  "lightgreen",
  "orange",
  "violet",
  "yellow",
  "brown"
]

const {
  addUser,
  removeUser,
  getUser,
  getUsersRoom,
  getUsersTyping,
  setUserTyping
} = require("./users/users.js")

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/sound", express.static("public"))

app.get("/", (req, res) => {
  const {name, room} = req.query

  const idColor = Math.floor(Math.random() * colors.length)

  if (name && room)
    res.render("index", {name, room, color: colors[idColor]})
  else
    res.redirect("/login")
})

app.get("/login", (req, res) => {
  res.render("login")
})

io.on("connection", (socket) => {
  console.log("new connexion detected")
 
  socket.on("join", ({name, room, color}, cb) => {
    socket.join(room)

    // adding a user
    addUser({id: socket.id, name, room, color})

    // trigger an event
    socket.broadcast.to(room).emit("online users", getUsersRoom(room))

    // get all users typying
    socket.broadcast.to(room).emit("users typing", getUsersTyping(room))

    cb(getUsersRoom(room))
  })

  socket.on("chat message", ({message, name, color, room}) => {
    socket.broadcast.to(room).emit("message", {message, name, color})
  })

  socket.on("user is typing", ({room, val}) => {
    const users = setUserTyping(socket.id, val, room)

    console.log(users)

    socket.broadcast.to(room).emit("users typing", users)
  })

  socket.on("disconnect", (reason) => {
    console.log("a user has left")

    const user = getUser(socket.id)
    
    // remove a user
    removeUser(socket.id)

    // console.log(user.user.getName)

    if (user?.user) {
      socket.broadcast.to(user.user?.getRoom).emit("online users", getUsersRoom(user.user?.getRoom))
    }
  })
})


server.listen(PORT, () => console.log("Server up on https://chat-room-server-app.herokuapp.com/"))