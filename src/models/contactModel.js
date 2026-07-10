// import database
import pool from "../config/database.js";

// save contact message
const createContactMessage = async (
    userId,
    name,
    email,
    subject,
    message
) => {

    await pool.query(
        `
        INSERT INTO contact_messages
        (
            user_id,
            name,
            email,
            subject,
            message
        )
        VALUES
        ($1,$2,$3,$4,$5)
        `,
        [
            userId,
            name,
            email,
            subject,
            message
        ]
    );

};

// get all contact messages
const getAllContactMessages = async () => {

    const result = await pool.query(`
        SELECT *
        FROM contact_messages
        ORDER BY created_at DESC
    `);

    return result.rows;

};

export {

    createContactMessage,

    getAllContactMessages

};