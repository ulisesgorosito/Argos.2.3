// bd.js
import { createPool } from 'mysql2/promise';
import util from 'util';

// Crear el pool de conexiones
const pool = createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cuervo_biblioteca',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//pool.query = util.promisify(pool.query);
export default pool;