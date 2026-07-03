// import database connection
import pool from "../config/database.js";

// get all dental services from the database
const getAllServices = async () => {
    const result = await pool.query(
        "SELECT * FROM services ORDER BY service_id"
    );

    return result.rows;
};

// export model functions
export {
    getAllServices
};