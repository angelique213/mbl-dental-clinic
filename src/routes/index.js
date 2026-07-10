// import express
import express from "express";

// import dashboard controller
import { showDashboard } from "../controllers/dashboardController.js";

// create router
const router = express.Router();

// dashboard route
router.get("/", showDashboard);

// export router
export default router;
