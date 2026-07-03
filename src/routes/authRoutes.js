// import express
import express from "express";

// import auth controller functions
import {
    showLogin,
    loginUser,
    showRegister,
    registerUser,
    logoutUser
} from "../controllers/authController.js";

// create router
const router = express.Router();

// show login page
router.get("/login", showLogin);

// login user
router.post("/login", loginUser);

// show register page
router.get("/register", showRegister);

// register new user
router.post("/register", registerUser);

// logout user
router.get("/logout", logoutUser);

// export router
export default router;