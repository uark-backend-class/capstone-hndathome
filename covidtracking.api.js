//`https://api.covidtracking.com/v1/us/daily.json` historic us
//`https://api.covidtracking.com/v1/states/daily.json` all states historic
//`https://api.covidtracking.com/v1/states/info.json` all states info

//https://api.covidtracking.com/v1/states/ca/daily.json
const axios = require('axios');

let historicUSData;
let historicStatesData;
let StatesInfo;
let lastGetHistoricUSData;
let lastGetHistoricStatesData;
let lastGetStatesInfo;

async function getHistoricUSData() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let todayString = today.toString();
    try {
        if (!historicUSData || lastGetHistoricUSData === undefined || todayString != lastGetHistoricUSData) {
            const url = `https://api.covidtracking.com/v1/us/daily.json`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            historicUSData = response.data;
        }
    } catch (error) {
        console.error(error);
    }
    lastGetHistoricUSData = todayString;
    return historicUSData;
}

async function getHistoricStatesData() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let todayString = today.toString();
    try {
        if (!historicStatesData || lastGetHistoricStatesData === undefined || todayString != lastGetHistoricStatesData) {
            const url = `https://api.covidtracking.com/v1/states/daily.json`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            historicStatesData = response.data;
        }
    } catch (error) {
        console.error(error);
    }
    lastGetHistoricStatesData = todayString;
    return historicStatesData;
}

async function getStatesInfo() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let todayString = today.toString();
    try {
        if (!StatesInfo || lastGetStatesInfo === undefined || todayString != lastGetStatesInfo) {
            const url = `https://api.covidtracking.com/v1/states/info.json`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            StatesInfo = response.data;
        }
    } catch (error) {
        console.error(error);
    }
    lastGetStatesInfo = todayString;
    return StatesInfo;
}

module.exports = {
    getHistoricUSData,
    getHistoricStatesData,
    getStatesInfo
};