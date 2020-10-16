const covidtracking = require('../covidtracking.api')

exports.render = async (req, res) => {
    const historicUSData = await covidtracking.getHistoricUSData();
    const lastUpdateET = new Date(historicUSData[0].lastUpdateET || historicUSData[0].lastModified || historicUSData[0].datechecked);
    const data = { historic: historicUSData, lastUpdateET: lastUpdateET.toLocaleDateString(), caption: "The most recent COVID data for the US. The most recent data may not be from today." }
    res.render('home', { data });
}