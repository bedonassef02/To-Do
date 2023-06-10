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

    async create(request, response) {
        const {name, description} = request.body
        const {id} = await checkToken(request)
        const list = await this.listService.create({user_id: id, name, description})
        if (list) {
            response.status(200).json(list)
        } else {
            response.status(404).json({msg: "Error! Can't Create List"})
        }
    }

    async destroy(request, response) {
        const {id} = request.params
        const isDelted = await this.listService.destroy(id)
        if (isDelted) {
            response.status(200).json({msg: "List Deleted"})
        } else {
            response.status(404).json({msg: "Can't Delete List"})
        }
    }

    async update(request, response) {
        const {name, description} = request.body
        const {id} = request.params
        const isUpdated = await this.listService.update({id, name, description})
        if (isUpdated) {
            response.status(200).json({msg: "List Updated"})
        } else {
            response.status(404).json({msg: "Can't Update List"})
        }
    }
}

module.exports = {
    ListController
}