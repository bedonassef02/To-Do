const {List} = require("../models/list.model");

class ListService {

    async findAll(user_id) {
        try {
            const lists = await List.findAll({where: {user_id}})
            return lists
        } catch (e) {
            return false
        }
    }

    async findById(id) {
        try {
            const list = await List.findByPk(1)
            return list
        } catch (e) {
            return false
        }
    }

}

module.exports = {
    ListService
}