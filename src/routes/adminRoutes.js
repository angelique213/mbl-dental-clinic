// import express
import express from "express";

// import controller
import {
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

} from "../controllers/adminController.js";

// create router
const router = express.Router();

// ==========================
// Dashboard
// ==========================

router.get(
    "/",
    showAdminDashboard
);

// ==========================
// Services
// ==========================

router.get(
    "/services",
    showManageServices
);

router.get(
    "/services/add",
    showAddService
);

router.post(
    "/services/add",
    saveService
);

router.get(
    "/services/edit/:id",
    showEditService
);

router.post(
    "/services/edit/:id",
    saveEditedService
);

router.post(
    "/services/delete/:id",
    removeService
);

// ==========================
// Appointments
// ==========================

router.get(
    "/appointments",
    showManageAppointments
);

router.get(
    "/appointments/edit/:id",
    showEditAppointment
);

router.post(
    "/appointments/edit/:id",
    saveEditedAppointment
);

router.post(
    "/appointments/delete/:id",
    removeAppointment
);

// export router
export default router;