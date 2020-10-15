//`https://discover.search.hereapi.com/v1/discover?apikey={{apiKey}}&q=Covid&at=${gps}&limit=10` covid-19 testing locations
const axios = require('axios');
let lastGPS;
let hereData;
async function getCovid19TestingLocations(gps) {
    if (gps != lastGPS) {
        const url = `https://discover.search.hereapi.com/v1/discover?apikey=${process.env.HERE_API_KEY}&q=Covid&at=${gps}&limit=10`;
        const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
        hereData = response.data;
        lastGPS = gps;
    }
    return hereData;
}

module.exports = {
    getCovid19TestingLocations,
};