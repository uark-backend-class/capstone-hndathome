const covidtracking = require('../covidtracking.api')

exports.render = async (req, res) => {
    const historicUSData = await covidtracking.getHistoricUSData();
    res.render('home', { historicUSData });
}