const express = require('express');
const router = express.Router();

const {ListService} = require("../services/list.service");
const {ListController} = require("../controllers/list.controller");

const listController = new ListController(new ListService());

router.get("/", listController.index.bind(listController));

router.get("/:id", listController.findById.bind(listController));


module.exports = router;