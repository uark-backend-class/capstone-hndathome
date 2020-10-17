const covidtracking = require('../covidtracking.api')
const localcoviddata = require('../localcoviddata.api')
const hereapi = require('../here.api')

exports.render = async (req, res) => {
    const locations = await req.user.getLocations({ raw: true });

    let localPromises = [];
    let herePromises = [];
    locations.forEach(
        location => {
            localPromises.push(localcoviddata.getLocalCovidData(location.zip_code))
            let atLat = location.latitude.toString();
            let atLong = location.longitude.toString();
            atLat = (atLat.startsWith("-")) ? atLat.substring(0, 5) : atLat.substring(0, 4);
            atLong = (atLong.startsWith("-")) ? atLong.substring(0, 5) : atLong.substring(0, 4);
            const gps = `${atLat},${atLong}`
            herePromises.push(hereapi.getCovid19TestingLocations(gps))
        }
    )

    const localResponses = await Promise.all(localPromises);
    const hereResponses = await Promise.all(herePromises);
    const statesInfo = await covidtracking.getStatesInfo();

    // [
    //     {
    //       id: 12,
    //       zip_code: '71852',
    //       alias: 'mom & dad',
    //       state_abbr: 'AR',
    //       state: 'Arkansas',
    //       latitude: '33.959840',
    //       longitude: '-93.852310',
    //       default_city: 'Nashville',
    //       createdAt: 2020-10-17T05:10:26.024Z,
    //       updatedAt: 2020-10-17T05:10:26.024Z,
    //       userId: 1
    //     },
    //     {
    //       id: 11,
    //       zip_code: '72701',
    //       alias: 'home',
    //       state_abbr: 'AR',
    //       state: 'Arkansas',
    //       latitude: '36.051480',
    //       longitude: '-94.144810',
    //       default_city: 'Fayetteville',
    //       createdAt: 2020-10-17T05:10:09.293Z,
    //       updatedAt: 2020-10-17T05:10:52.531Z,
    //       userId: 1
    //     }
    //   ]
    res.render('summary', { locations });
}