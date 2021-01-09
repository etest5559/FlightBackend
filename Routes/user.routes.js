var express = require('express');
var UserRouter = express.Router();

var UserController = require('../Controller/user.controller');

UserRouter.get('/',UserController.test);

UserRouter.post("/signup", UserController.createUser);

UserRouter.post("/signIn", UserController.signIn);



module.exports = UserRouter;