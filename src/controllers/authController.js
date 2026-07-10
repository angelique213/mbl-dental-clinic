// import bcrypt
import bcrypt from "bcrypt";

// import models
import {
    findUserByEmail,
    createUser
} from "../models/userModel.js";

import {
    addPatient
} from "../models/patientsModel.js";

// show login page
const showLogin = (req, res) => {
    res.render("auth/login");
};

// login user
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return res.send("Email or password is incorrect.");
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatches) {
        return res.send("Email or password is incorrect.");
    }

    req.session.user = {
        id: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
    };

    res.redirect("/");

};

// show register page
const showRegister = (req, res) => {

    res.render("auth/register");

};

// register user
const registerUser = async (req, res) => {

    const {
        first_name,
        last_name,
        email,
        password
    } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return res.send("Email already exists.");
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    // create user
    const user = await createUser(
        first_name,
        last_name,
        email,
        hashedPassword
    );

    // automatically create patient profile
    await addPatient(
        user.user_id,
        "",
        "",
        null,
        ""
    );

    res.redirect("/login");

};

// logout
const logoutUser = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

};

// export
export {
    showLogin,
    loginUser,
    showRegister,
    registerUser,
    logoutUser
};