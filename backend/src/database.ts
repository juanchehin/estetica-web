const mysql = require('mysql2');

var database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

const pool = mysql.createPool(database);

pool.getConnection((err: any, connection: { release: () => void; }) => {
    if (err) throw err; connection.release(); 
    console.log('Base de datos conectada'); 

});

export default pool;
