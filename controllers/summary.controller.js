const covidtracking = require('../covidtracking.api')
const localcoviddata = require('../localcoviddata.api')
const hereapi = require('../here.api')

exports.render = async (req, res) => {
    const locations = await req.user.getLocations({ raw: true });
    const statesInfo = await covidtracking.getStatesInfo();

    const updatedLocations = await Promise.all(
        locations.map(async (location) => {
            let atLat = location.latitude.toString();
            let atLong = location.longitude.toString();
            atLat = (atLat.startsWith("-")) ? atLat.substring(0, 5) : atLat.substring(0, 4);
            atLong = (atLong.startsWith("-")) ? atLong.substring(0, 5) : atLong.substring(0, 4);
            const gps = `${atLat},${atLong}`
            const hereData = await hereapi.getCovid19TestingLocations(gps);
            const localCovidData = await localcoviddata.getLocalCovidData(location.zip_code)
            const { counties } = localCovidData;
            const series = counties.reduce((accumulator, current) => {
                return [...accumulator, { id: current.countyName, values: current.historicData.sort((a, b) => a.date.localeCompare(b.date)) }]
            }, [])

            return { ...location, hereData: hereData, localCovidData: series, statesInfo: statesInfo.find(({ state }) => state === location.state_abbr), }
        })
    )
    res.render('summary', { locations: updatedLocations });
}