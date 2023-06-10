const {CONFLICT, CREATED, OK, NOT_FOUND} = require("../../constants");

class UserController {

    constructor(userService) {
        this.userService = userService
    }

    async create(request, response) {
        const {username, email, password} = request.body
        const isEmailExist = await this.userService.isEmailExist(email)
        if (!isEmailExist) {
            const user = await this.userService.create({username, email, password})
            response.status(CREATED).json(user)
        } else {
            response.status(CONFLICT).json({msg: "Email Already Exist"})
        }
    }

    async login(request, response) {
        const {email, password} = request.body
        const user = await this.userService.login({email, password})
        if (user) {
            response.status(OK).json(user)
        } else {
            response.status(NOT_FOUND).json({msg: "Email or Password is Incorrect"})
        }
    }
}

module.exports = {
    UserController
}