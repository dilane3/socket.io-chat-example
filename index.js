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
 
  socket.on("join", ({name, room}) => {
    socket.join(room)
  })

  socket.on("chat message", ({message, name, color, room}) => {
    socket.broadcast.to(room).emit("message", {message, name, color})
  })

  socket.on("disconnect", (reason) => {
    console.log("a user has left")
    console.log(reason)
  })
})


server.listen(PORT, () => console.log("Server up on http://localhost:5000"))