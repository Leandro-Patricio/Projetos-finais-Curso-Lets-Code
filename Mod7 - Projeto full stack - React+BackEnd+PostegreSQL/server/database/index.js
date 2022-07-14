const knex = require ('knex')

module.exports = knex({
    client:'postgres',
    connection: {
        host: '127.0.0.1',//localhost
        user: 'postgres',
        password: 'admin',
        database: 'db_filmes',
        port: '5432',
    },
})