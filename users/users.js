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

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersRoom
}