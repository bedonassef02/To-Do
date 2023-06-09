const {checkToken} = require("../services/token.service");

class ListController {

    constructor(listService) {
        this.listService = listService
    }

    async index(request, response) {
        const {id} = await checkToken(request)
        const lists = await this.listService.findAll(id)
        if (lists) {
            response.status(200).json(lists)
        } else {
            response.status(404).json({msg: "Error!"})
        }
    }

    async findById(request, response) {
        const {id} = request.params
        const list = await this.listService.findById(id)
        if (list) {
            response.status(200).json(list)
        } else {
            response.status(404).json({msg: "Error!"})
        }
    }

}

module.exports = {
    ListController
}