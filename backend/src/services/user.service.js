const {hashPassword, checkPassword} = require("./password.service");
const {User} = require("../models/user.model");
const {createToken} = require("./token.service");

class UserService {

    async create(user) {
        const hash_password = await hashPassword(user.password)
        try {
            const created_user = await User.create({...user, password: hash_password})
            return await this.sendUser(created_user)
        } catch (e) {
            return false
        }
    }

    async login(user) {
        try {
            const db_user = await User.findOne({where: {email: user.email}})
            if (await checkPassword(user.password, db_user.dataValues.password)) {
                return await this.sendUser(db_user)
            }
            return false
        } catch (e) {
            return false
        }
    }

    async isEmailExist(email) {
        try {
            const user = await User.findOne({where: {email}})
            return user ? true : false
        } catch (e) {
            return false
        }
    }

    async sendUser(user) {
        user = user.dataValues
        delete user.password
        const token = await createToken(user)
        return {user, token}
    }
}

module.exports = {
    UserService
}