const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>MBL Dental Clinic Booking System</h1>
    <p>Final Project for CSE 340</p>
    <p>Project currently under development.</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});