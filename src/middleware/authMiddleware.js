// require user to be logged in
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

// require user to be admin
const requireAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.redirect("/");
    }

    next();
};

export {
    requireLogin,
    requireAdmin
};
