// import database connection
import pool from "../config/database.js";

// get all services
const getAllServices = async () => {
    const result = await pool.query(
        `SELECT
            service_id,
            service_name,
            description,
            price
         FROM services
         ORDER BY service_id`
    );

    return result.rows;
};

// get one service
const getServiceById = async (serviceId) => {
    const result = await pool.query(
        `SELECT
            service_id,
            service_name,
            description,
            price
         FROM services
         WHERE service_id = $1`,
        [serviceId]
    );

    return result.rows[0];
};

// add service
const createService = async (
    serviceName,
    description,
    price
) => {
    const result = await pool.query(
        `INSERT INTO services
            (service_name, description, price)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [
            serviceName,
            description,
            price
        ]
    );

    return result.rows[0];
};

// update service
const updateService = async (
    serviceId,
    serviceName,
    description,
    price
) => {
    const result = await pool.query(
        `UPDATE services
         SET
            service_name = $1,
            description = $2,
            price = $3
         WHERE service_id = $4
         RETURNING *`,
        [
            serviceName,
            description,
            price,
            serviceId
        ]
    );

    return result.rows[0];
};

// delete service
const deleteService = async (serviceId) => {
    await pool.query(
        `DELETE FROM services
         WHERE service_id = $1`,
        [serviceId]
    );
};

export {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};