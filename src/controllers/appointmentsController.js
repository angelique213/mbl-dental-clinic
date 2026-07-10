// import model
import {
    getPatientByUserId,
    getAllAppointments,
    getAppointmentsByUserId,
    getAllServices,
    createAppointment,
    cancelAppointment
} from "../models/appointmentsModel.js";

// show appointments
const showAppointments = async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    let appointments;

    if (req.session.user.role === "admin") {
        appointments = await getAllAppointments();
    } else {
        appointments = await getAppointmentsByUserId(
            req.session.user.id
        );
    }

    res.render("appointments", {
        appointments
    });
};

// show add page
const showAddAppointment = async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const services = await getAllServices();

    res.render("add-appointment", {
        services
    });
};

// save appointment
const saveAppointment = async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const {
        service_id,
        appointment_date,
        appointment_time,
        notes
    } = req.body;

    const patient = await getPatientByUserId(
        req.session.user.id
    );

    if (!patient) {
        return res.send("Patient profile not found.");
    }

    await createAppointment(
        patient.patient_id,
        service_id,
        appointment_date,
        appointment_time,
        notes
    );

    res.redirect("/appointments");
};

// cancel appointment
const cancelPatientAppointment = async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    if (req.session.user.role === "admin") {
        return res.status(403).send("Patients only.");
    }

    await cancelAppointment(
        req.params.id,
        req.session.user.id
    );

    res.redirect("/appointments");
};

export {
    showAppointments,
    showAddAppointment,
    saveAppointment,
    cancelPatientAppointment
};