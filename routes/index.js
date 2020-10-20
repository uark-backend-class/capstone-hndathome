const router = require('express').Router();
const locationController = require('../controllers/location.controller');
const homeController = require('../controllers/home.controller');
const summaryController = require('../controllers/summary.controller');
const detailsController = require('../controllers/details.controller');
const passport = require('passport');
const isAuthenticated = require('../middleware/is-authenticated');

router.get('/login', passport.authenticate('google', { scope: ["profile", "email"] }));
router.get('/login/callback', passport.authenticate('google'), (req, res) => {
    res.redirect(req.session.returnTo || '/');
    delete req.session.returnTo;
});

router.get('/favicon.ico', function (req, res) { res.sendStatus(204); });
router.get('/', homeController.render);
router.use(isAuthenticated);
router.get('/list', locationController.getAll);
router.get('/add', locationController.add);
router.get('/edit/:id', locationController.editView);
router.get('/delete/:id', locationController.delete);
router.post('/update', locationController.update);
router.get('/summary', summaryController.render);
router.get('/details/:zipcode', detailsController.render);
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

module.exports = router;