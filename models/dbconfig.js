const pgp = require('pg-promise')()
const connectionString = 'postgres://jiggs@localhost:5432/toDoListSandbox'
const db = pgp(connectionString)

module.exports = db
