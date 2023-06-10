const express = require('express');
const router = express.Router();

const {ListItemsService} = require("../services/list.items.services");
const {ListItemsController} = require("../controllers/list.items.controller");
const {ValidateToken} = require("../middlewares/validate.token.middleware")

const listItemsController = new ListItemsController(new ListItemsService());
const validateToken = new ValidateToken()

router.get("/:list_id/items", validateToken.checkToken, listItemsController.index.bind(listItemsController));

router.get("/:list_id/items/:id", validateToken.checkToken, listItemsController.findById.bind(listItemsController));

router.post("/:list_id/items/", validateToken.checkToken, listItemsController.create.bind(listItemsController));

router.delete("/:list_id/items/:id", validateToken.checkToken, listItemsController.destroy.bind(listItemsController));

router.put("/:list_id/items/:id", validateToken.checkToken, listItemsController.update.bind(listItemsController));

module.exports = router;