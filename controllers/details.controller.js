const covidtracking = require('../covidtracking.api')
const localcoviddata = require('../localcoviddata.api')
const hereapi = require('../here.api')

exports.render = async (req, res) => {
    const locations = await req.user.getLocations({ raw: true });
    const location = locations.filter(obj => obj.zip_code == req.params.zipcode)
    const statesInfo = await covidtracking.getStatesInfo();
    //const historicStatesData = await covidtracking.getHistoricStatesData();

    const updatedLocations = await Promise.all(
        location.map(async (current) => {
            let atLat = current.latitude.toString();
            let atLong = current.longitude.toString();
            const gps = `${atLat},${atLong}`;
            const hereData = await hereapi.getCovid19TestingLocations(gps);
            const localCovidData = await localcoviddata.getLocalCovidData(current.zip_code);
            const { counties } = localCovidData || [];
            const series = counties && counties.reduce((accumulator, element) => {
                return [...accumulator, { id: element.countyName, values: element.historicData.sort((a, b) => a.date.localeCompare(b.date)) }]
            }, []);

            return { ...current, hereData: hereData, localCovidData: series, statesInfo: statesInfo.find(({ state }) => state === current.state_abbr), }
        })
    )

    res.render('details', { location: updatedLocations[0], locations: locations, isAuth: true });
}