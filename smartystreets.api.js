//`https://us-zipcode.api.smartystreets.com/lookup?auth-id=YOUR+AUTH-ID+HERE&auth-token=YOUR+AUTH-TOKEN+HERE&zipcode=${zipCode}` zip code validation
const axios = require('axios');

async function lookupZipCode(zipCode) {
    const url = `https://us-zipcode.api.smartystreets.com/lookup?auth-id=YOUR+AUTH-ID+HERE&auth-token=YOUR+AUTH-TOKEN+HERE&zipcode=${zipCode}`;
    const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
    return response.data;
}

module.exports = {
    lookupZipCode,
};