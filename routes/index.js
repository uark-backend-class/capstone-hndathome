const router = require('express').Router();
const zipCodeController = require('../controllers/zipCode.controller');
const homeController = require('../controllers/home.controller');
//const passport = require('passport');
//const isAuthenticated = require('../middleware/is-authenticated');


// router.get('/login', passport.authenticate('google', { scope: ["profile", "email"] }));
// router.get('/login/callback', passport.authenticate('google'), (req, res) => { res.redirect('/'); });

//router.use(isAuthenticated);
router.get('/', homeController.render);
// router.get('/add', (req, res) => { res.render('add-edit') });
// router.get('/edit/:id', expenseController.editView);
// router.get('/delete/:id', expenseController.delete);
// router.post('/update', expenseController.update);
router.get('logout', (req, res) => {
    req.logout();
    res.send('Logout successful');
});

module.exports = router;