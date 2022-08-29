const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class UserController {
    async create(request, response) {
        const {name, email, password} = request.body

        if(!name) {
            throw new AppError("Nome é obrigatório")
        }

        await knex("users").insert({name, email, password})

        return response.status(201).json({name, email, password})
    }

    async show(request, response) {
        const {id} = request.params

        const user = await knex("users").where({id}).first()

        return response.json(user)
    }

    async delete(request, response) {
        const {id} = request.params

        await knex("users").where({id}).delete()

        return response.json("Delete successful")
    }

    async index(request, response) {
        const users = await knex("users")

        return response.json(users)
        
    }
}

module.exports = UserController



