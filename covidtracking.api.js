//`https://api.covidtracking.com/v1/us/daily.json` historic us
//`https://api.covidtracking.com/v1/states/daily.json` all states historic
//`https://api.covidtracking.com/v1/states/info.json` all states info
const axios = require('axios');

async function getHistoricUSData() {
    const url = `https://api.covidtracking.com/v1/us/daily.json`;
    const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
    return response.data;
}

async function getHistoricStatesData() {
    const url = `https://api.covidtracking.com/v1/states/daily.json`;
    const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
    return response.data;
}

async function getStatesInfo() {
    const url = `https://api.covidtracking.com/v1/states/info.json`;
    const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
    return response.data;
}

module.exports = {
    getHistoricUSData,
    getHistoricStatesData,
    getStatesInfo
};