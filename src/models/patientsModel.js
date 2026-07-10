// import database
import pool from "../config/database.js";

// get all patients
const getAllPatients = async () => {

    const result = await pool.query(`
        SELECT
            patient_id,
            user_id,
            phone,
            address,
            birth_date,
            emergency_contact
        FROM patients
        ORDER BY patient_id
    `);

    return result.rows;

};

// get one patient
const getPatientById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM patients
        WHERE patient_id = $1
        `,
        [id]
    );

    return result.rows[0];

};

// get patient by user id
const getPatientByUserId = async (userId) => {

    const result = await pool.query(
        `
        SELECT *
        FROM patients
        WHERE user_id = $1
        `,
        [userId]
    );

    return result.rows[0];

};

// add patient
const addPatient = async (
    userId,
    phone,
    address,
    birthDate,
    emergencyContact
) => {

    const result = await pool.query(
        `
        INSERT INTO patients
        (
            user_id,
            phone,
            address,
            birth_date,
            emergency_contact
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
            userId,
            phone,
            address,
            birthDate,
            emergencyContact
        ]
    );

    return result.rows[0];

};

// update patient
const updatePatient = async (
    id,
    phone,
    address,
    birthDate,
    emergencyContact
) => {

    await pool.query(
        `
        UPDATE patients
        SET
            phone = $1,
            address = $2,
            birth_date = $3,
            emergency_contact = $4
        WHERE patient_id = $5
        `,
        [
            phone,
            address,
            birthDate,
            emergencyContact,
            id
        ]
    );

};

// delete patient
const deletePatient = async (id) => {

    await pool.query(
        `
        DELETE FROM patients
        WHERE patient_id = $1
        `,
        [id]
    );

};

export {
    getAllPatients,
    getPatientById,
    getPatientByUserId,
    addPatient,
    updatePatient,
    deletePatient
};