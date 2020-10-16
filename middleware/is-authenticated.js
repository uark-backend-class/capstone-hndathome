module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        req.session.returnTo = req.originalUrl;
        res.redirect('/login');
    }
}