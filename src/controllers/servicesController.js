// import service model
import { getAllServices } from "../models/serviceModel.js";

// show services page
const showServices = async (req, res) => {
    const services = await getAllServices();

    res.render("services/services", {
        services: services
    });
};

// export controller functions
export {
    showServices
};