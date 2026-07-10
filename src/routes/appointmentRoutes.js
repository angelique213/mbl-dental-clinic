// import express
import express from "express";

// import appointment controller
import {
    showAppointments,
    showAddAppointment,
    saveAppointment,
    cancelPatientAppointment
} from "../controllers/appointmentsController.js";

// create router
const router = express.Router();

// appointment list
router.get("/", showAppointments);

// add appointment page
router.get("/add", showAddAppointment);

// save appointment
router.post("/add", saveAppointment);

// patient cancels appointment
router.post(
    "/cancel/:id",
    cancelPatientAppointment
);

// export router
export default router;