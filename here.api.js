//`https://discover.search.hereapi.com/v1/discover?apikey={{apiKey}}&q=Covid&at=${gps}&limit=10` covid-19 testing locations
const axios = require('axios');
let lastGPS;
let hereData;
let lastDay;

const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
}

async function getCovid19TestingLocations(gps) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        if (gps != lastGPS || hereData === undefined || lastDay === undefined || today != lastDay) {
            const url = `https://discover.search.hereapi.com/v1/discover?apikey=${process.env.HERE_API_KEY}&q=Covid&at=${gps}&limit=10`;
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });

            const { items } = response.data;
            const dataMarkers = items.filter(current => current.title.startsWith("Covid-19 Testing Site")).reduce((accumulator, current) => {
                return [...accumulator, { markerText: current.title.slice(23), latitude: current.position.lat, longitude: current.position.lng, phone: current.contacts[0].phone[0].value, formatPhone: formatPhoneNumber(current.contacts[0].phone[0].value), address: current.address }]
            }, []);
            hereData = dataMarkers;
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