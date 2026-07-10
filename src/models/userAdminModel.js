// import database
import pool from "../config/database.js";

// get all users
const getAllUsers = async () => {

    const result = await pool.query(
        `
        SELECT
            user_id,
            first_name,
            last_name,
            email,
            role
        FROM users
        ORDER BY user_id
        `
    );

    return result.rows;

};

// update user role
const updateUserRole = async (
    userId,
    role
) => {

    await pool.query(
        `
        UPDATE users
        SET role = $1
        WHERE user_id = $2
        `,
        [
            role,
            userId
        ]
    );

};

export {
    getAllUsers,
    updateUserRole
};