// import express
import express from "express";

// import controller
import { showServices } from "../controllers/servicesController.js";

// create router
const router = express.Router();

// show all services
router.get("/", showServices);

// export router
export default router;