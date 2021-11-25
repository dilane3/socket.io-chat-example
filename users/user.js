class User {
  constructor (id, name, room, color) {
    this.id = id
    this.name = name
    this.room = room
    this.color = color
    this.isTyping = false
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

  get getIsTyping () {
    return this.isTyping
  }

  // setters
  setIsTyping(val) {
    this.isTyping = val
  }
}

module.exports = User