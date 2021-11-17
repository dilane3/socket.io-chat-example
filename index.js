const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

io.on("connection", (socket) => {
  console.log("new connexion detected")
  console.log(socket.id)

  socket.on("chat message", (message) => {
    socket.broadcast.emit("message", message)
  })

  socket.on("disconnect", () => {
    console.log("a user has left")
  })
})


server.listen(PORT, () => console.log("Server up on http://localhost:5000"))