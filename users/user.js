class User {
  constructor (id, name, room, color) {
    this.id = id
    this.name = name
    this.room = room
    this.color = color
  }

  // getters
  get getId() {
    return this.id
  }

  get getName() {
    return this.name
  }

  get getRoom() {
    return this.room
  }

  get getColor() {
    return this.color
  }
}

module.exports = User