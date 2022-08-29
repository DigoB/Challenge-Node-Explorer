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
}

module.exports = UserController



