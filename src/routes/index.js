const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

// dashboard route
router.get("/", dashboardController.showDashboard);

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

module.exports = router;