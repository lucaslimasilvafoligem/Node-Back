import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'lucas2112',
    database: 'nodemysql1',
});

export default pool;
