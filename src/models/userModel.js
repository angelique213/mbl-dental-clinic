// import database connection
import pool from "../config/database.js";

// find user by email
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};

// create new user
const createUser = async (firstName, lastName, email, hashedPassword) => {
    const result = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [firstName, lastName, email, hashedPassword, "patient"]
    );

    return result.rows[0];
};

// export functions
export {
    findUserByEmail,
    createUser
};