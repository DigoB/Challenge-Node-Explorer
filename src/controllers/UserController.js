const {hash} = require("bcryptjs")
const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const bcrypt = require("bcryptjs")

class UserController {
    async create(request, response) {
        const {name, email, password} = request.body

        if(!name) {
            throw new AppError("Nome é obrigatório")
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        await knex("users").insert({name, email, password: hashedPassword})

        return response.status(201).json("User created successfully")
    }

    async show(request, response) {
        const {id} = request.params

        const user = await knex("users").where({id}).first()
        
        if(!user) {
            throw new AppError("User not found")
        }
        
        return response.status(201).json(user)
    }

    async delete(request, response) {
        const {id} = request.params

        const checkIfUserExists = await knex("users").where({id}).first()

        if(!checkIfUserExists) {
            throw new AppError("User id does not exists")
        }
        await knex("users").where({id}).delete()

        return response.json("Delete successful")
    }

    async index(request, response) {
        const users = await knex("users")

        return response.json(users)
        
    }
}

module.exports = UserController



