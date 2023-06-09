const express = require('express');
const router = express.Router();

const {UserService} = require("../services/user.service");
const {UserController} = require("../controllers/user.controller");

const userController = new UserController(new UserService());

router.post("/register", userController.create.bind(userController));

router.post("/login", userController.login.bind(userController));

module.exports = router;