import mysql from 'mysql2';

// mysql config
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'dog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
export default pool;
