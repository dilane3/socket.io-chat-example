const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 5000

const users = []

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  const {name, room} = req.query

  if (name && room)
    res.render("index", {name, req})
  else
    res.redirect("/login")
})

app.get("/login", (req, res) => {
  res.render("login")
})

io.on("connection", (socket) => {
  console.log("new connexion detected")
  console.log(socket.id)

  socket.on("chat message", (message) => {
    socket.broadcast.emit("message", message)
  })

  socket.on("disconnect", (reason) => {
    console.log("a user has left")
    console.log(reason)
  })
})


server.listen(PORT, () => console.log("Server up on http://localhost:5000"))