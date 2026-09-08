import pool from './bd.js';
import md5 from 'md5';

export async function getUser(user, password) {
    try {
        const query = "SELECT * FROM usuarios WHERE userName = ? AND password = ? LIMIT 1";

        const hashPass = md5(password);
        const [rows] = await pool.query(query, [user, hashPass]);

        return rows[0];
    } catch (error) {
        console.log(error);
    }
}
