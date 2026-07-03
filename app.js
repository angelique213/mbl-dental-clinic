// import packages
import express from "express";
import path from "path";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// import database pool
import pool from "./src/config/database.js";

// import routes
import routes from "./src/routes/index.js";
import authRoutes from "./src/routes/authRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";

// load .env file
dotenv.config();

// create __dirname because ESM does not have it automatically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create express app
const app = express();

// use PostgreSQL to store sessions
const PgSession = connectPgSimple(session);

// use EJS pages
app.set("view engine", "ejs");

// tell Express where the views folder is
app.set("views", path.join(__dirname, "src", "views"));

// lets forms send data to the server
app.use(express.urlencoded({ extended: true }));

// allows json data if needed later
app.use(express.json());

// allows css, images, and public files to work
app.use(express.static(path.join(__dirname, "public")));

// session setup for login system
app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: "session",
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET || "temporary_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// make user available in all EJS pages
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// use routes
app.use("/", routes);
app.use("/", authRoutes);
app.use("/", serviceRoutes);

// Render gives a port, but local uses 3000
const PORT = process.env.PORT || 3000;

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});