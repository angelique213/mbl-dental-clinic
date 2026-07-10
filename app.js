// import packages
import express from "express";
import path from "path";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// import database
import pool from "./src/config/database.js";

// import routes
import routes from "./src/routes/index.js";
import authRoutes from "./src/routes/authRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

// load environment variables
dotenv.config();

// create __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create app
const app = express();

// PostgreSQL session store
const PgSession = connectPgSimple(session);

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// session setup
app.use(
    session({
        store: new PgSession({
            pool,
            tableName: "session",
            createTableIfMissing: true
        }),
        secret: process.env.SESSION_SECRET || "temporary_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

// make user/session available in all EJS pages
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.session = req.session;
    next();
});

// routes
app.use("/", routes);
app.use("/", authRoutes);
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/services", serviceRoutes);
app.use("/admin", adminRoutes);

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});