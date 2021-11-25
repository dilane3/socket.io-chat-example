const User = require('./user.js')

const users = []

const addUser = ({id, name, room, color}) => {
  const index = users.findIndex(user => user.getId === id)

  if (index === -1) {
    const user = new User(id, name, room, color)

    users.push(user)
  }
}

const removeUser = (id) => {
  const index = users.findIndex(user => user.getId === id)

  if (index > -1) {
    users.splice(index, 1)
  }
}

const getUser = (id) => {
  const user = users.find(user => user.getId === id)

  if (user) {
    return {user}
  }

  return {error: "user not found"}
}

const getUsersRoom = (room) => users.filter(user => user.getRoom === room).length

const getUsersTyping = (room) => {
  console.log(room)
  const usersRoom = users.filter(user => user.getRoom === room)

  const usersTyping = usersRoom.filter(user => user.getIsTyping)

  return usersTyping
}

const setUserTyping = (id, val, room) => {
  const index = users.findIndex(user => user.getId === id)

  if (index > -1) {
    const user = users[index]

    user.setIsTyping(val)

    users[index] = user
  }

  console.log(getUsersTyping(room))

  return getUsersTyping(room)
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersRoom,
  getUsersTyping,
  setUserTyping
}