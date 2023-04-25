import mysql from 'promise-mysql';
//import mysql from "mysql2/promise";

import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is connected');
    })

export default pool;

//npm i promise-mysql@3.3.1 Instalar esta version de mysql