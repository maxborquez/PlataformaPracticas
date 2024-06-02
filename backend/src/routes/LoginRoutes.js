
const express = require("express");
const LoginController = require("../auth/LoginController");
const LoginRouter = express.Router();

LoginRouter.post("/login",LoginController.Login);


module.exports = LoginRouter;