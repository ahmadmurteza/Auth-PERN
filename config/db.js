const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "#Teza0878",
    port: 5432,
    database: "authtodolist",
    host: "localhost"
});

module.exports = pool;