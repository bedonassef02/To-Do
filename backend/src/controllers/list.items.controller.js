const {checkToken} = require("../Services/token.Service");

class ListItemsController {

    constructor(listItemService) {
        this.listItemService = listItemService
    }

    async index(request, response) {
        const {list_id} = request.params
        const listItems = await this.listItemService.findAll(list_id)
        if (listItems) {
            response.status(200).json(listItems)
        } else {
            response.status(404).json({msg: "Error!"})
        }
    }

    async findById(request, response) {
        const {id} = request.params
        const listItem = await this.listItemService.findById(id)
        if (listItem) {
            response.status(200).json(listItem)
        } else {
            response.status(404).json({msg: "Error!"})
        }
    }

    async create(request, response) {
        const {list_id} = request.params
        const {name, description} = request.body
        const createdItem = await this.listItemService.create({name, description, list_id})
        if (createdItem) {
            response.status(200).json(createdItem)
        } else {
            response.status(404).json({msg: "Error! Can't Create List Item"})
        }
    }

    async destroy(request, response) {
        const {id} = request.params
        const isDeleted = await this.listItemService.destroy(id)
        if (isDeleted) {
            response.status(200).json({msg: "List Item Deleted"})
        } else {
            response.status(404).json({msg: "Can't Delete ListItems"})
        }
    }

    async update(request, response) {
        const {name, description} = request.body
        const {id} = request.params
        const isUpdated = await this.listItemService.update({id, name, description})
        if (isUpdated) {
            response.status(200).json({msg: "List Item Updated"})
        } else {
            response.status(404).json({msg: "Can't Update List Item"})
        }
    }
}

module.exports = {
    ListItemsController
}