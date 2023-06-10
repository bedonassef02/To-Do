const express = require('express');
const router = express.Router();

const {ListItemsService} = require("../services/list.items.services");
const {ListItemsController} = require("../controllers/list.items.controller");

const listItemsController = new ListItemsController(new ListItemsService());

router.get("/:list_id/items", listItemsController.index.bind(listItemsController));

router.get("/:list_id/items/:id", listItemsController.findById.bind(listItemsController));

router.post("/:list_id/items/", listItemsController.create.bind(listItemsController));

router.delete("/:list_id/items/:id", listItemsController.destroy.bind(listItemsController));

router.put("/:list_id/items/:id", listItemsController.update.bind(listItemsController));

module.exports = router;