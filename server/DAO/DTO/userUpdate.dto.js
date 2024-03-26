class userUpdateDTO {
  constructor(dataUser) {
    this.firstName = dataUser.firstName
    this.lastName = dataUser.lastName
    this.dni = parseInt(dataUser.dni.trim(), 10)
    this.phone = parseInt(dataUser.phone.trim(), 10)
    this.address = dataUser.address
    this.email = dataUser.email
    this.dateBirthday = dataUser.dateBirthday
    this.thumbnail = dataUser.thumbnail
    this.lastDate = dataUser.lastDate
    this.serviceHistory = dataUser.serviceHistory
    this.shopping = dataUser.shopping
  }
}
