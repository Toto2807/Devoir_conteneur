const pool = require('../config/db_postgres.js');

const getAllUsers = async() =>{
    const user = await pool.query('SELECT * from users')
    return user.rows
}

const createuser = async({username,email,password}) =>{
    const user = await pool.query('INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *', [username,email,password])
    return user.rows[0]
}

module.exports = {
    getAllUsers,
    createuser
}