const express = require("express");
const path = require("path");
const routes = require("./src/routes");

const app = express();

// use EJS pages
app.set("view engine", "ejs");

// tell Express where the views folder is
app.set("views", path.join(__dirname, "src", "views"));

// lets forms send data to the server
app.use(express.urlencoded({ extended: true }));

// allows css and other public files to work
app.use(express.static(path.join(__dirname, "public")));

// use routes from the routes folder
app.use("/", routes);

const PORT = 3000;

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});