const {Router} = require("express")

const userRouter = Router()
const UserController = require("../controllers/UserController")

const userController = new UserController()

userRouter.post("/", userController.create)
userRouter.get("/:id", userController.show)
userRouter.delete("/:id", userController.delete)
userRouter.get("/", userController.index)


module.exports = userRouter