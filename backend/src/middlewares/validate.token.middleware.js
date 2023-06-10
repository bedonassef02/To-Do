const {checkToken} = require("../services/token.service");

class ValidateToken {
    async checkToken(request, response, next) {
        const token = await checkToken(request)
        if (token) {
            next()
        } else {
            response.status(401).json("You are not Authorized")
        }
    }

}

module.exports = {ValidateToken}