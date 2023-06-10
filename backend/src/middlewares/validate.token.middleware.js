const {checkToken} = require("../services/token.service");
const {UNAUTHORIZED} = require("../../constants");

class ValidateToken {
    async checkToken(request, response, next) {
        const token = await checkToken(request)
        if (token) {
            next()
        } else {
            response.status(UNAUTHORIZED).json("You are not Authorized")
        }
    }

}

module.exports = {ValidateToken}