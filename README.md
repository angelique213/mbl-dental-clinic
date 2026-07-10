# 🦷 MBL Dental Clinic Booking and Management System

## Overview

The **MBL Dental Clinic Booking and Management System** is a web application developed as the final project for **CSE 340 – Web Backend Development** at **BYU–Idaho**.

The application allows patients to register, log in, book dental appointments, view their appointments, and manage their patient information. Administrators can manage patients, appointments, and dental services through a secure admin dashboard.

This project was inspired by my family's dental clinic, **MBL Dental Clinic**, in the Philippines and was created to provide a more organized and convenient appointment booking and management system.

---

## Features

### Guest Users
- View the home page
- View available dental services
- Create a new account
- Log in to the system

### Patient Features
- Secure login and logout
- View patient dashboard
- Book dental appointments
- View appointment history
- Cancel appointments
- Update patient profile

### Administrator Features
- View administrator dashboard
- Manage patients
- Manage appointments
- Manage dental services
- Add, edit, and delete services
- Edit and delete appointments

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- EJS
- Express Session
- bcrypt
- HTML5
- CSS3
- JavaScript
- Render

---

## Database Tables

The application uses the following database tables:

- Users
- Patients
- Services
- Appointments

---

## Project Structure

```text
mbl-dental-clinic
│
├── public/
│   ├── css/
│   └── images/
│
├── sql/
│   ├── schema.sql
│   └── seed.sql
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── views/
│
├── app.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/angelique213/mbl-dental-clinic.git
```

Navigate to the project folder:

```bash
cd mbl-dental-clinic
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure your environment variables:

```text
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
```

Start the application:

```bash
npm start
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## Sample Accounts

### Administrator

Create an administrator account by updating a user's role in the database to:

```text
admin
```

### Patient

Register a new account using the application's registration page.

---

## Live Application

**Render Deployment**

(https://mbl-dental-clinic.onrender.com/)

---

## GitHub Repository

https://github.com/angelique213/mbl-dental-clinic

---

## Author

**Angelique Legaspi**

BYU–Idaho

CSE 340 – Web Backend Development

2026

---
