import * as pg from 'pg';
import * as mysql from 'mysql';


/**
 * Connection for postgres database
 */
export const pg_pool = new pg.Pool({
    user: 'root',
    host: 'localhost',
    password: 'mercafacil',
    database: 'pgmercafacil',
    port: 5434
});


/**
 * Connection for mysql database
 */

export const mysql_pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mercafacil',
    database: 'mysqlmercafacil',
    port: 3308
})



