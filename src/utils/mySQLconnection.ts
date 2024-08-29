import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'hotelmiranda',
    port: 3306,
    password: process.env.MYSQL_PASSWORD
});
