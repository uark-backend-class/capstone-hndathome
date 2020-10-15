//`https://us-zipcode.api.smartystreets.com/lookup?auth-id=YOUR+AUTH-ID+HERE&auth-token=YOUR+AUTH-TOKEN+HERE&zipcode=${zipCode}` zip code validation
const axios = require('axios');
let lastZipCode;
let zipCodeData;
async function lookupZipCode(zipCode) {
    if (zipCode != lastZipCode) {
        const url = `https://us-zipcode.api.smartystreets.com/lookup?auth-id=${process.env.SS_AUTH_ID}&auth-token=${process.env.SS_AUTH_TOKEN}&zipcode=${zipCode}`;
        const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
        zipCodeData = response.data;
        lastZipCode = zipCodeData;
    }
    return zipCodeData;
}

module.exports = {
    lookupZipCode,
};