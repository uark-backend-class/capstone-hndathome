//`https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipCode}&daysInPast=7` county 7 days
const axios = require('axios');

async function getLocalCovidData(zipCode) {
    const url = `https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipCode}&daysInPast=7`;
    const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
    return response.data;
}

module.exports = {
    getLocalCovidData,
};