const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class MovieNotesController {

    async create(request, response) {

        const {title, description, rating} = request.body
        const { user_id } = request.query

        const checkIfUserExists = await knex("users").where({id: user_id}).first()
        
        if(!checkIfUserExists) {
            throw new AppError("User id does not exists")
        }

        await knex("notes").insert({title, description, rating, user_id})

        return response.status(201).json()
    }

    async show(request, response) {
        const {id} = request.params

        if(!id) {
            throw new AppError("Movie note not found")
        }

        const note = await knex("notes").where({id})
        //const tags = await knex("movie_tags").where({note_id: id}).orderBy("name")


        return response.json({note})
    }
}

module.exports = MovieNotesController