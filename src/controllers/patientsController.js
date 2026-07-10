// import patient model
import {
    getAllPatients,
    getPatientById,
    addPatient,
    updatePatient,
    deletePatient
} from "../models/patientsModel.js";

// show patient list
const showPatients = async (req, res) => {
    const patients = await getAllPatients();
    res.render("patients", { patients });
};

// show add patient page
const showAddPatient = (req, res) => {
    res.render("add-patient");
};

// save patient
const savePatient = async (req, res) => {
    const { phone, address, birth_date, emergency_contact } = req.body;

    await addPatient(phone, address, birth_date, emergency_contact);

    res.redirect("/patients");
};

// show edit patient page
const showEditPatient = async (req, res) => {
    const patient = await getPatientById(req.params.id);

    res.render("edit-patient", { patient });
};

// update patient
const updatePatientInfo = async (req, res) => {
    const { phone, address, birth_date, emergency_contact } = req.body;

    await updatePatient(
        req.params.id,
        phone,
        address,
        birth_date,
        emergency_contact
    );

    res.redirect("/patients");
};

// delete patient
const deletePatientInfo = async (req, res) => {
    await deletePatient(req.params.id);

    res.redirect("/patients");
};

export {
    showPatients,
    showAddPatient,
    savePatient,
    showEditPatient,
    updatePatientInfo,
    deletePatientInfo
};
