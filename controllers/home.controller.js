const { User } = require('../db');
const covidtracking = require('../covidtracking.api')

exports.render = async (req, res) => {
    //const historicUSData = await covidtracking.getHistoricStatesData();
    res.render('home');
}