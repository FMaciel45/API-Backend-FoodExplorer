const sqlite3 = require("sqlite3") // import
const sqlite = require("sqlite") // import

const path = require("path") // import

async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })

  return database
}

module.exports = sqliteConnection
