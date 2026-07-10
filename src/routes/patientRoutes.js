// import express
import express from "express";

// import controller
import {
    showPatients,
    showAddPatient,
    savePatient,
    showEditPatient,
    updatePatientInfo,
    deletePatientInfo
} from "../controllers/patientsController.js";

// import validation
import {
    validatePatient
} from "../middleware/validationMiddleware.js";

// create router
const router = express.Router();

// =========================
// Patient List
// =========================

router.get(
    "/",
    showPatients
);

// =========================
// Add Patient
// =========================

router.get(
    "/add",
    showAddPatient
);

router.post(
    "/add",
    validatePatient,
    savePatient
);

// =========================
// Edit Patient
// =========================

router.get(
    "/edit/:id",
    showEditPatient
);

router.post(
    "/edit/:id",
    validatePatient,
    updatePatientInfo
);

// =========================
// Delete Patient
// =========================

router.get(
    "/delete/:id",
    deletePatientInfo
);

// export router
export default router;