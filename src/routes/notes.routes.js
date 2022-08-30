const {Router} = require("express")

const notesRouter = Router()
const MovieNotesController = require("../controllers/MovieNotesController")

const notesController = new MovieNotesController()

notesRouter.post("/", notesController.create)
notesRouter.get("/:id", notesController.show)


module.exports = notesRouter