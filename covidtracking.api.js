//`https://api.covidtracking.com/v1/us/daily.json` historic us
//`https://api.covidtracking.com/v1/states/daily.json` all states historic
//`https://api.covidtracking.com/v1/states/info.json` all states info
const axios = require('axios');

let historicUSData;
let historicStatesData;
let StatesInfo;

// also check timestamp?
async function getHistoricUSData() {
    try {
        if (!historicUSData) {
            const url = `https://api.covidtracking.com/v1/us/daily.json`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            historicUSData = response.data;
        }
    } catch (error) {
        console.error(error);
    }
    return historicUSData;
}

async function getHistoricStatesData() {
    try {
        if (!historicStatesData) {
            const url = `https://api.covidtracking.com/v1/states/daily.json`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            historicStatesData = response.data;
        }
    } catch (error) {
        console.error(error);
    }
    return historicStatesData;
}

async function getStatesInfo() {
    try {
        if (!StatesInfo) {
            const url = `https://api.covidtracking.com/v1/states/info.json`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            StatesInfo = response.data;
        }
    } catch (error) {
        console.error(error);
    }
    return StatesInfo;
}

module.exports = {
    getHistoricUSData,
    getHistoricStatesData,
    getStatesInfo
};