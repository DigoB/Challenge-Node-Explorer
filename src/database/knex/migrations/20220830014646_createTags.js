exports.up = knex => knex.schema.createTable("tags", table => {

    table.increments("id")
    table.integer("note_id")
        .notNullable()
        .references("id")
        .inTable("notes")
    table.integer("user_id")
        .references("id")
        .inTable("users")
})

exports.down = knex => knex.schema.dropTable("tags")
