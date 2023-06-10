const {checkToken} = require("../services/token.service");
const {OK, NOT_FOUND, CREATED} = require("../../constants");
const {NOT} = require("sequelize/lib/deferrable");

class ListController {

    constructor(listService) {
        this.listService = listService
    }

    async index(request, response) {
        const {id} = await checkToken(request)
        const lists = await this.listService.findAll(id)
        if (lists) {
            response.status(OK).json(lists)
        } else {
            response.status(NOT_FOUND).json({msg: "Error!"})
        }
    }

    async findById(request, response) {
        const {id} = request.params
        const list = await this.listService.findById(id)
        if (list) {
            response.status(OK).json(list)
        } else {
            response.status(NOT_FOUND).json({msg: "Error!"})
        }
    }

    async create(request, response) {
        const {name, description} = request.body
        const {id} = await checkToken(request)
        const list = await this.listService.create({user_id: id, name, description})
        if (list) {
            response.status(CREATED).json(list)
        } else {
            response.status(NOT_FOUND).json({msg: "Error! Can't Create List"})
        }
    }

    async destroy(request, response) {
        const {id} = request.params
        const isDelted = await this.listService.destroy(id)
        if (isDelted) {
            response.status(OK).json({msg: "List Deleted"})
        } else {
            response.status(NOT_FOUND).json({msg: "Can't Delete List"})
        }
    }

    async update(request, response) {
        const {name, description} = request.body
        const {id} = request.params
        const isUpdated = await this.listService.update({id, name, description})
        if (isUpdated) {
            response.status(OK).json({msg: "List Updated"})
        } else {
            response.status(NOT_FOUND).json({msg: "Can't Update List"})
        }
    }
}

module.exports = {
    ListController
}