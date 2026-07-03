// import bcrypt to check hashed passwords
import bcrypt from "bcrypt";

// import user model functions
import { findUserByEmail, createUser } from "../models/userModel.js";

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

    const passwordMatches = await bcrypt.compare(password, user.password);

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

// register new user
const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return res.send("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(first_name, last_name, email, hashedPassword);

    res.redirect("/login");
};

// logout user
const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

// export controller functions
export {
    showLogin,
    loginUser,
    showRegister,
    registerUser,
    logoutUser
};