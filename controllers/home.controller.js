const covidtracking = require('../covidtracking.api')

exports.render = async (req, res) => {
    const historicUSData = await covidtracking.getHistoricUSData();
    const lastUpdateET = new Date(historicUSData[0].lastUpdateET || historicUSData[0].lastModified || historicUSData[0].datechecked);
    let usDaily = [...historicUSData];
    const series = { id: "US Covid-19", values: usDaily.reverse() };
    const data = { historic: historicUSData, series: [series], lastUpdateET: lastUpdateET.toLocaleDateString(), caption: "The most recent COVID data for the US. The most recent data may not be from today." }
    if (req.user) {
        const locations = await req.user.getLocations({ raw: true });
        res.render('home', { data: data, locations: locations, isAuth: true });
    }
    else {
        res.render('home', { data });
    }
}