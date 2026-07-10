// import database
import pool from "../config/database.js";

// import service model
import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from "../models/serviceModel.js";

// import appointment model
import {
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} from "../models/appointmentsModel.js";

// =========================
// ADMIN DASHBOARD
// =========================

const showAdminDashboard = async (req, res) => {

    const patientResult =
        await pool.query("SELECT COUNT(*) FROM patients");

    const appointmentResult =
        await pool.query("SELECT COUNT(*) FROM appointments");

    const serviceResult =
        await pool.query("SELECT COUNT(*) FROM services");

    res.render("admin/dashboard", {
        patientCount: patientResult.rows[0].count,
        appointmentCount: appointmentResult.rows[0].count,
        serviceCount: serviceResult.rows[0].count
    });

};

// =========================
// SERVICES
// =========================

const showManageServices = async (req, res) => {

    const services = await getAllServices();

    res.render("admin/services", {
        services,
        message: req.query.message || null,
        error: req.query.error || null
    });

};

const showAddService = (req, res) => {

    res.render("admin/add-service", {
        error: null
    });

};

const saveService = async (req, res) => {

    const {
        service_name,
        description,
        price
    } = req.body;

    await createService(
        service_name,
        description,
        price
    );

    res.redirect("/admin/services");

};

const showEditService = async (req, res) => {

    const service =
        await getServiceById(req.params.id);

    res.render("admin/edit-service", {
        service
    });

};

const saveEditedService = async (req, res) => {

    const {
        service_name,
        description,
        price
    } = req.body;

    await updateService(
        req.params.id,
        service_name,
        description,
        price
    );

    res.redirect("/admin/services");

};

const removeService = async (req, res) => {

    await deleteService(req.params.id);

    res.redirect("/admin/services");

};

// =========================
// APPOINTMENTS
// =========================

const showManageAppointments = async (req, res) => {

    const appointments =
        await getAllAppointments();

    res.render("admin/appointments", {
        appointments
    });

};

const showEditAppointment = async (req, res) => {

    const appointment =
        await getAppointmentById(req.params.id);

    const services =
        await getAllServices();

    res.render("admin/edit-appointment", {
        appointment,
        services
    });

};

const saveEditedAppointment = async (req, res) => {

    const {
        service_id,
        appointment_date,
        appointment_time,
        status,
        notes
    } = req.body;

    await updateAppointment(
        req.params.id,
        service_id,
        appointment_date,
        appointment_time,
        status,
        notes
    );

    res.redirect("/admin/appointments");

};

const removeAppointment = async (req, res) => {

    await deleteAppointment(req.params.id);

    res.redirect("/admin/appointments");

};

export {

    showAdminDashboard,

    showManageServices,
    showAddService,
    saveService,
    showEditService,
    saveEditedService,
    removeService,

    showManageAppointments,
    showEditAppointment,
    saveEditedAppointment,
    removeAppointment

};