const {Router} = require("express")

const notesRouter = Router()
const MovieNotesController = require("../controllers/MovieNotesController")

const notesController = new MovieNotesController()

notesRouter.get("/", notesController.index)
notesRouter.post("/", notesController.create)
notesRouter.get("/:id", notesController.show)
notesRouter.delete("/:id", notesController.delete)

module.exports = notesRouter