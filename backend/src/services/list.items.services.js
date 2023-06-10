const {ListItem} = require("../models/list.items.model")

class ListItemsService {
    async findAll(list_id) {
        try {
            const listItems = ListItem.findAll({where: {list_id}})
            return listItems
        } catch (error) {
            console.error("Error in findAll:", error);
            return false;
        }
    }

    async findById(id) {
        try {
            const listItems = await ListItem.findByPk(id);
            return listItems;
        } catch (error) {
            console.error("Error in findById:", error);
            return false;
        }
    }

    async create(listItem) {
        try {
            const createdListItems = await ListItem.create(listItem);
            return createdListItems;
        } catch (error) {
            console.error("Error in create:", error);
            return false;
        }
    }

    async destroy(id) {
        try {
            const deletedRowCount = await ListItem.destroy({where: {id}});
            return deletedRowCount > 0;
        } catch (error) {
            console.error("Error in destroy:", error);
            return false;
        }
    }

    async update(listItem) {
        try {
            const [updatedRowCount] = await ListItem.update(listItem, {
                where: {id: listItem.id},
            });
            return updatedRowCount > 0;
        } catch (error) {
            console.error("Error in update:", error);
            return false;
        }
    }
}

module.exports = {
    ListItemsService,
};
