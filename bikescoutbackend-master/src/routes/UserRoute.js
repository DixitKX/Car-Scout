const routes=require("express").Router()

const userController=require("../controllers/UserController")

routes.get("/users", userController.getAllUsers);
routes.post("/user", userController.signup);
routes.post("/user/login", userController.loginUser);
routes.delete("/user/:id", userController.deleteUser);
routes.get("/user/:id", userController.getUserById);
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetpassword)

module.exports = routes;