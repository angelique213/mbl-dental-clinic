// =========================
// Patient Validation
// =========================

const validatePatient = (req, res, next) => {

    const {
        phone,
        address,
        birth_date,
        emergency_contact
    } = req.body;

    if (
        !phone ||
        !address ||
        !birth_date ||
        !emergency_contact
    ) {
        return res.send("Please complete all patient fields.");
    }

    next();

};

// =========================
// Appointment Validation
// =========================

const validateAppointment = (req, res, next) => {

    const {
        patient_id,
        service_id,
        appointment_date,
        appointment_time
    } = req.body;

    if (
        !patient_id ||
        !service_id ||
        !appointment_date ||
        !appointment_time
    ) {
        return res.send("Please complete all appointment fields.");
    }

    next();

};

// =========================
// Registration Validation
// =========================

const validateRegister = (req, res, next) => {

    const {
        first_name,
        last_name,
        email,
        phone,
        password
    } = req.body;

    if (
        !first_name ||
        !last_name ||
        !email ||
        !phone ||
        !password
    ) {
        return res.send("Please complete all required fields.");
    }

    if (!email.includes("@")) {
        return res.send("Please enter a valid email address.");
    }

    if (password.length < 8) {
        return res.send("Password must be at least 8 characters.");
    }

    next();

};

// =========================
// Service Validation
// =========================

const validateService = (req, res, next) => {

    const {
        service_name,
        price
    } = req.body;

    if (!service_name || !price) {
        return res.send("Please complete all required fields.");
    }

    if (Number(price) <= 0) {
        return res.send("Service price must be greater than zero.");
    }

    next();

};

// export
export {

    validatePatient,
    validateAppointment,
    validateRegister,
    validateService

};