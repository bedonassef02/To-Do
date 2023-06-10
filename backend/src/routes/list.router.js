const express = require('express');
const router = express.Router();

const {ListService} = require("../services/list.service");
const {ListController} = require("../controllers/list.controller");
const {ValidateToken} = require("../middlewares/validate.token.middleware")

const listController = new ListController(new ListService());
const validateToken = new ValidateToken()

router.get("/", validateToken.checkToken, listController.index.bind(listController));

router.get("/:id", validateToken.checkToken, listController.findById.bind(listController));

router.post("/", validateToken.checkToken, listController.create.bind(listController));

router.delete("/:id", validateToken.checkToken, listController.destroy.bind(listController));

router.put("/:id", validateToken.checkToken, listController.update.bind(listController));

module.exports = router;