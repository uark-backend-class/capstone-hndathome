const covidtracking = require('../covidtracking.api')
const localcoviddata = require('../localcoviddata.api')
const hereapi = require('../here.api')
const smartyStreets = require('../smartystreets.api')

exports.render = async (req, res) => {
    const locations = await req.user.getLocations({ raw: true });
    const location = locations.filter(obj => obj.zip_code == req.params.zipcode)
    let pageLocation;
    if (location.length === 0) {
        zipCode = await smartyStreets.lookupZipCode(req.params.zipcode);

        if (zipCode.zipcodes === undefined) {
            return res.render('details', { locations: locations, isAuth: true });
        }
        else {
            pageLocation = [{
                zip_code: req.params.zipcode,
                alias: '',
                state_abbr: zipCode.zipcodes[0].state_abbreviation,
                state: zipCode.zipcodes[0].state,
                latitude: zipCode.zipcodes[0].latitude,
                longitude: zipCode.zipcodes[0].longitude,
                default_city: zipCode.zipcodes[0].default_city
            }]
        }
    }
    else {
        pageLocation = [location[0]];
    }
    const statesInfo = await covidtracking.getStatesInfo();
    const historicStateData = await covidtracking.getHistoricStateData(pageLocation[0].state_abbr);
    const lastUpdateET = new Date(historicStateData[0].lastUpdateEt || historicStateData[0].lastModified || historicStateData[0].datechecked)
    let stateDaily = [...historicStateData];
    const stateSeries = { id: `${pageLocation[0].state} Covid-19`, values: stateDaily.reverse() };
    const data = { state: pageLocation[0].state, historic: historicStateData, series: [stateSeries], lastUpdateET: lastUpdateET.toLocaleDateString(), caption: `The most recent COVID data for ${pageLocation[0].state}. The current value may be different than today.` }

    const updatedLocations = await Promise.all(
        pageLocation.map(async (current) => {
            let atLat = current.latitude.toString();
            let atLong = current.longitude.toString();
            const gps = `${atLat},${atLong}`;
            const hereData = await hereapi.getCovid19TestingLocations(gps);
            const localCovidData = await localcoviddata.getLocalCovidData(current.zip_code);
            const { counties } = localCovidData || [];
            const series = counties && counties.reduce((accumulator, element) => {
                return [...accumulator, { id: element.countyName, values: element.historicData.sort((a, b) => a.date.localeCompare(b.date)) }]
            }, []);

            return { ...current, hereData: hereData, localCovidData: series, statesInfo: statesInfo.find(({ state }) => state === current.state_abbr) }
        })
    )
    res.render('details', { location: updatedLocations[0], locations: locations, isAuth: true, data: data });
}