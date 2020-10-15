const router = require('express').Router();
const locationController = require('../controllers/location.controller');
const homeController = require('../controllers/home.controller');
const passport = require('passport');
const isAuthenticated = require('../middleware/is-authenticated');


router.get('/login', passport.authenticate('google', { scope: ["profile", "email"] }));
router.get('/login/callback', passport.authenticate('google'), (req, res) => { res.redirect('/'); });

router.use(isAuthenticated);
//router.get('/', homeController.render);
router.get('/', locationController.getAll);
router.get('/add', (req, res) => { res.render('add-edit') });
router.get('/edit/:id', locationController.editView);
router.get('/delete/:id', locationController.delete);
router.post('/update', locationController.update);
router.get('logout', (req, res) => {
    req.logout();
    res.send('Logout successful');
});

module.exports = router;