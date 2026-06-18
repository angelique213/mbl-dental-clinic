// import express
import express from "express";

// import controllers
import { showDashboard } from "../controllers/dashboardController.js";

// create router
const router = express.Router();

// dashboard route
router.get("/", showDashboard);

// patients route
router.get("/patients", (req, res) => {
    res.render("patients");
});

// add patient route
router.get("/patients/add", (req, res) => {
    res.render("add-patient");
});

// appointments route
router.get("/appointments", (req, res) => {
    res.render("appointments");
});

// add appointment route
router.get("/appointments/add", (req, res) => {
    res.render("add-appointment");
});

// export router
export default router;