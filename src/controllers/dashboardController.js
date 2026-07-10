// import database
import pool from "../config/database.js";

// show dashboard
const showDashboard = async (req, res) => {

    // =========================
    // Guest Dashboard
    // =========================
    if (!req.session.user) {

        const serviceResult = await pool.query(
            "SELECT COUNT(*) FROM services"
        );

        return res.render("dashboard", {
            user: null,
            serviceCount: serviceResult.rows[0].count
        });

    }

    // =========================
    // Admin Dashboard
    // =========================
    if (req.session.user.role === "admin") {

        const patientResult =
            await pool.query(
                "SELECT COUNT(*) FROM patients"
            );

        const appointmentResult =
            await pool.query(
                "SELECT COUNT(*) FROM appointments"
            );

        const serviceResult =
            await pool.query(
                "SELECT COUNT(*) FROM services"
            );

        return res.render("dashboard", {

            user: req.session.user,

            patientCount:
                patientResult.rows[0].count,

            appointmentCount:
                appointmentResult.rows[0].count,

            serviceCount:
                serviceResult.rows[0].count

        });

    }

    // =========================
    // Patient Dashboard
    // =========================

    const serviceResult =
        await pool.query(
            "SELECT COUNT(*) FROM services"
        );

    const appointmentResult =
        await pool.query(
            `
            SELECT COUNT(*) AS totalappointments
            FROM appointments
            JOIN patients
                ON appointments.patient_id = patients.patient_id
            WHERE patients.user_id = $1
            `,
            [req.session.user.id]
        );

    const statusResult =
        await pool.query(
            `
            SELECT appointments.status
            FROM appointments
            JOIN patients
                ON appointments.patient_id = patients.patient_id
            WHERE patients.user_id = $1
            ORDER BY
                appointments.appointment_date DESC,
                appointments.appointment_time DESC
            LIMIT 1
            `,
            [req.session.user.id]
        );

    res.render("dashboard", {

        user: req.session.user,

        serviceCount:
            serviceResult.rows[0].count,

        appointmentCount:
            appointmentResult.rows[0].totalappointments,

        latestStatus:
            statusResult.rows.length > 0
                ? statusResult.rows[0].status
                : "No Appointment"

    });

};

// export
export {
    showDashboard
};