//`https://discover.search.hereapi.com/v1/discover?apikey={{apiKey}}&q=Covid&at=${gps}&limit=10` covid-19 testing locations
const axios = require('axios');
let lastGPS;
let hereData;
let lastDay;
async function getCovid19TestingLocations(gps) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        if (gps != lastGPS || hereData === undefined || lastDay === undefined || today != lastDay) {
            const url = `https://discover.search.hereapi.com/v1/discover?apikey=${process.env.HERE_API_KEY}&q=Covid&at=${gps}&limit=10`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            hereData = response.data;
        }
    } catch (error) {
        hereData = undefined;
        console.error(error);
    }
    lastDay = today;
    lastGPS = gps;
    return hereData;
}

module.exports = {
    getCovid19TestingLocations,
};