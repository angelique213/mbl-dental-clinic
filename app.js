// import packages
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// import routes
import routes from "./src/routes/index.js";

// create __dirname because ESM does not have it automatically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create express app
const app = express();

// use EJS pages
app.set("view engine", "ejs");

// tell Express where the views folder is
app.set("views", path.join(__dirname, "src", "views"));

// lets forms send data to the server
app.use(express.urlencoded({ extended: true }));

// allows css, images, and public files to work
app.use(express.static(path.join(__dirname, "public")));

// use routes from the routes folder
app.use("/", routes);

// Render gives a port, but local uses 3000
const PORT = process.env.PORT || 3000;

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});