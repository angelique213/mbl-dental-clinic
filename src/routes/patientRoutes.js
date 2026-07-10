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
import { validatePatient } from "../middleware/validationMiddleware.js";

// create router
const router = express.Router();

// patient list
router.get("/", showPatients);

// add patient
router.get("/add", showAddPatient);
router.post("/add", validatePatient, savePatient);

// edit patient
router.get("/edit/:id", showEditPatient);
router.post("/edit/:id", validatePatient, updatePatientInfo);

// delete patient
router.get("/delete/:id", deletePatientInfo);

// export router
export default router;
