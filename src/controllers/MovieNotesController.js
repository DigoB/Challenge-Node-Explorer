const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class MovieNotesController {

    async create(request, response) {

        const {title, description, rating, tags} = request.body
        const { user_id } = request.query

        const checkIfUserExists = await knex("users").where({id: user_id}).first()
        
        if(!checkIfUserExists) {
            throw new AppError("User id does not exists")
        }

        const note_id = await knex("notes").insert({title, description, rating, user_id})

        const insertTag = tags.map(tagName => {
            return {
                note_id,
                name: tagName,
                user_id
            }
        })

        await knex("tags").insert(insertTag)

        return response.status(201).json()
    }

    async show(request, response) {
        const {id} = request.params

        const note = await knex("notes").where({id}).first()

        if(!note) {
            throw new AppError("Note id does not exists")
        }

        return response.json({note})
    }

    async delete(request, response) {
        const {id} = request.params

        const checkIfNoteExists = await knex("notes").where({id}).first()
        if(!checkIfNoteExists) {
            throw new AppError("Note id does not exists")
        }

        await knex("notes").where({id}).delete()

        response.json("Note deleted successfully")
    }

    async index(request, response) {

        const { user_id } = request.query

        const notes = await knex("notes").where({user_id}).orderBy("title")
        
        return response.json({notes})
    }
}

module.exports = MovieNotesController