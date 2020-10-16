//`https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipCode}&daysInPast=7` county 7 days
const axios = require('axios');

let lastZipCode;
let localCovidData;
let lastDay;

async function getLocalCovidData(zipCode) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        if (zipCode != lastZipCode || localCovidData === undefined || lastDay === undefined || today != lastDay) {
            const url = `https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipCode}&daysInPast=7`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            localCovidData = response.data;
        }
    } catch (error) {
        localCovidData = undefined;
        console.error(error);
    }
    lastDay = today;
    lastZipCode = zipCode;
    return localCovidData;
}

module.exports = {
    getLocalCovidData,
};