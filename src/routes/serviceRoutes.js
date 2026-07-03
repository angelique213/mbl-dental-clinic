// import express
import express from "express";

// import services controller
import { showServices } from "../controllers/servicesController.js";

// create router
const router = express.Router();

// services route
router.get("/services", showServices);

// export router
export default router;