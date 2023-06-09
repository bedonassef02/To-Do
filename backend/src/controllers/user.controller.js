class UserController {

    constructor(userService) {
        this.userService = userService
    }

    async create(request, response) {
        const {username, email, password} = request.body
        const isEmailExist = await this.userService.isEmailExist(email)
        if (!isEmailExist) {
            const user = await this.userService.create({username, email, password})
            response.status(201).json(user)
        } else {
            response.status(409).json({msg: "Email Already Exist"})
        }
    }

    async login(request, response) {
        const {email, password} = request.body
        const user = await this.userService.login({email, password})
        if (user) {
            response.status(200).json(user)
        } else {
            response.status(404).json({msg: "Email or Password is Incorrect"})
        }
    }
}

module.exports = {
    UserController
}