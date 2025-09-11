class UserService {
  constructor(database) {
    this.database = database;
  }

  getUser(id) {
    return this.database.findUser(id);
  }

  createUser(userData) {
    if (!userData.name || !userData.email) {
      throw new Error("Datos incompletos");
    }
    return this.database.saveUser(userData);
  }
}

module.exports = UserService;
