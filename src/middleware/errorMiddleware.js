// handle page not found
const notFound = (req, res) => {
    res.status(404).send("Page not found.");
};

// handle server errors
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again.");
};

export {
    notFound,
    errorHandler
};
