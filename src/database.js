const mysql = require ('mysql');
const {promisify} = require ('util');
const {database} = require ('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) =>{
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Conexion con la base de datos cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Demasiadas conexiones a la base de datos');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexion denegada');
        }
    }

    if (connection) connection.release();
    console.log('Conectado a la base de datos');
    return;
});

//Promesas con promisify
pool.query = promisify(pool.query);

module.exports = pool;