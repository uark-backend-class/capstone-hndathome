//`https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipCode}&daysInPast=7` county 7 days
const axios = require('axios');

let lastZipCode;
let localCovidData;

// also check timestamp?
async function getLocalCovidData(zipCode) {
    try {
        if (zipCode != lastZipCode || localCovidData === undefined) {
            const url = `https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipCode}&daysInPast=7`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            localCovidData = response.data;
        }
    } catch (error) {
        localCovidData = undefined;
        console.error(error);
    }
    lastZipCode = zipCode;
    return localCovidData;
}

module.exports = {
    getLocalCovidData,
};