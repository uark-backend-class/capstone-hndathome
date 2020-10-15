//`https://api.covidtracking.com/v1/us/daily.json` historic us
//`https://api.covidtracking.com/v1/states/daily.json` all states historic
//`https://api.covidtracking.com/v1/states/info.json` all states info
const axios = require('axios');

let historicUSData;
let historicStatesData;
let StatesInfo;

async function getHistoricUSData() {
    if (!historicUSData) {
        const url = `https://api.covidtracking.com/v1/us/daily.json`;
        const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
        historicUSData = response.data;
    }
    return historicUSData;
}

async function getHistoricStatesData() {
    if (!historicStatesData) {
        const url = `https://api.covidtracking.com/v1/states/daily.json`;
        const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
        historicStatesData = response.data;
    }
    return historicStatesData;
}

async function getStatesInfo() {
    if (!StatesInfo) {
        const url = `https://api.covidtracking.com/v1/states/info.json`;
        const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
        StatesInfo = response.data;
    }
    return StatesInfo;
}

module.exports = {
    getHistoricUSData,
    getHistoricStatesData,
    getStatesInfo
};