// import database
import pool from "../config/database.js";

// get all reviews
const getAllReviews = async () => {

    const result = await pool.query(`
        SELECT
            reviews.*,
            users.first_name,
            users.last_name
        FROM reviews
        JOIN users
            ON reviews.user_id = users.user_id
        ORDER BY review_id DESC
    `);

    return result.rows;

};

// create review
const createReview = async (
    userId,
    rating,
    comment
) => {

    await pool.query(
        `
        INSERT INTO reviews
        (
            user_id,
            rating,
            comment
        )
        VALUES
        ($1,$2,$3)
        `,
        [
            userId,
            rating,
            comment
        ]
    );

};

export {

    getAllReviews,

    createReview

};