// simple patient validation
const validatePatient = (req, res, next) => {
    const { phone, address, birth_date, emergency_contact } = req.body;

    if (!phone || !address || !birth_date || !emergency_contact) {
        return res.send("Please complete all patient fields.");
    }

    next();
};

// simple appointment validation
const validateAppointment = (req, res, next) => {
    const { patient_id, service_id, appointment_date, appointment_time } = req.body;

    if (!patient_id || !service_id || !appointment_date || !appointment_time) {
        return res.send("Please complete all appointment fields.");
    }

    next();
};

export {
    validatePatient,
    validateAppointment
};
