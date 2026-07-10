// import database
import pool from "../config/database.js";

// get patient using logged in user
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

// get all appointments (admin)
const getAllAppointments = async () => {

    const result = await pool.query(
        `
        SELECT
            appointments.appointment_id,
            appointments.appointment_date,
            appointments.appointment_time,
            appointments.status,
            appointments.notes,
            patients.phone,
            users.first_name,
            users.last_name,
            services.service_id,
            services.service_name
        FROM appointments
        JOIN patients
            ON appointments.patient_id = patients.patient_id
        JOIN users
            ON patients.user_id = users.user_id
        JOIN services
            ON appointments.service_id = services.service_id
        ORDER BY appointments.appointment_date,
                 appointments.appointment_time
        `
    );

    return result.rows;

};

// get appointments for one patient
const getAppointmentsByUserId = async (userId) => {

    const result = await pool.query(
        `
        SELECT
            appointments.appointment_id,
            appointments.appointment_date,
            appointments.appointment_time,
            appointments.status,
            appointments.notes,
            services.service_name
        FROM appointments
        JOIN patients
            ON appointments.patient_id = patients.patient_id
        JOIN services
            ON appointments.service_id = services.service_id
        WHERE patients.user_id = $1
        ORDER BY appointments.appointment_date,
                 appointments.appointment_time
        `,
        [userId]
    );

    return result.rows;

};

// get all services
const getAllServices = async () => {

    const result = await pool.query(
        `
        SELECT *
        FROM services
        ORDER BY service_name
        `
    );

    return result.rows;

};

// create appointment
const createAppointment = async (
    patientId,
    serviceId,
    appointmentDate,
    appointmentTime,
    notes
) => {

    await pool.query(
        `
        INSERT INTO appointments
        (
            patient_id,
            service_id,
            appointment_date,
            appointment_time,
            notes
        )
        VALUES ($1,$2,$3,$4,$5)
        `,
        [
            patientId,
            serviceId,
            appointmentDate,
            appointmentTime,
            notes
        ]
    );

};

// get one appointment
const getAppointmentById = async (appointmentId) => {

    const result = await pool.query(
        `
        SELECT *
        FROM appointments
        WHERE appointment_id = $1
        `,
        [appointmentId]
    );

    return result.rows[0];

};

// update appointment
const updateAppointment = async (
    appointmentId,
    serviceId,
    appointmentDate,
    appointmentTime,
    status,
    notes
) => {

    await pool.query(
        `
        UPDATE appointments
        SET
            service_id = $1,
            appointment_date = $2,
            appointment_time = $3,
            status = $4,
            notes = $5
        WHERE appointment_id = $6
        `,
        [
            serviceId,
            appointmentDate,
            appointmentTime,
            status,
            notes,
            appointmentId
        ]
    );

};

// patient cancels appointment
const cancelAppointment = async (appointmentId) => {

    await pool.query(
        `
        UPDATE appointments
        SET status = 'Cancelled'
        WHERE appointment_id = $1
        `,
        [appointmentId]
    );

};

// admin deletes appointment
const deleteAppointment = async (appointmentId) => {

    await pool.query(
        `
        DELETE FROM appointments
        WHERE appointment_id = $1
        `,
        [appointmentId]
    );

};

// export
export {
    getPatientByUserId,
    getAllAppointments,
    getAppointmentsByUserId,
    getAllServices,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    cancelAppointment,
    deleteAppointment
};