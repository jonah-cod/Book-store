const router = require("express").Router();
const { loginUser } = require("../controllers/usersController")

router.post("/login", loginUser);


module.exports = {usersRouter: router}