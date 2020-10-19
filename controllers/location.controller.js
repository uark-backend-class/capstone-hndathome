const { Location } = require('../db');
const smartyStreets = require('../smartystreets.api')

exports.getAll = async (req, res) => {
    const locations = await req.user.getLocations({ raw: true });
    res.render('list', { locations: locations, isAuth: true });
};

exports.add = async (req, res) => {
    const locations = await req.user.getLocations({ raw: true });
    res.render('add-edit', { locations: locations, isAuth: true })
}

exports.update = async (req, res) => {
    const locations = await req.user.getLocations({ raw: true });
    //valid format
    if (req.body.zip_code && /^\d{5}$/.test(req.body.zip_code)) {
        let useSmartyStreets = false;

        //does location already exists
        let location = await req.user.getLocations({ where: { zip_code: req.body.zip_code }, raw: true });
        if (location.length > 0) {
            //location exists
            if (!req.body.id) {
                // in "add" mode, location already exists in the database
                location = { ...req.body, validationError: "ERROR: Zip code already exists in your list." };
                return res.render('add-edit', { location: location, locations: locations, isAuth: true });
            }
            else {
                // in "edit" mode
                if (req.body.id != location[0].id) {
                    //editing a zip code to a zip code that already exists in the database
                    location = { ...req.body, validationError: "ERROR: Zip code already exists in your list." };
                    return res.render('add-edit', { location: location, locations: locations, isAuth: true });
                }
                else {
                    //if zip code has changed to a new zip code call smarty streets
                    if (req.body.zip_code !== req.body.pg_zip_code) {
                        useSmartyStreets = true;
                    }
                }
            }
        }
        else {
            useSmartyStreets = true;
        }

        let zipCode;
        if (useSmartyStreets) {
            zipCode = await smartyStreets.lookupZipCode(req.body.zip_code);

            if (zipCode.zipcodes === undefined) {
                //invalid zip
                location = { ...req.body, validationError: "ERROR: Invalid zip code." };
                return res.render('add-edit', { location: location, locations: locations, isAuth: true });
            }
            else {
                req.body.state_abbr = zipCode.zipcodes[0].state_abbreviation;
                req.body.state = zipCode.zipcodes[0].state;
                req.body.latitude = zipCode.zipcodes[0].latitude;
                req.body.longitude = zipCode.zipcodes[0].longitude;
                req.body.default_city = zipCode.zipcodes[0].default_city;
            }
        }

        req.body.userId = req.user.id;
        await Location.upsert(req.body);
        return res.redirect('/list');
    }
    else {
        location = { ...req.body, validationError: "ERROR: Zip code is not a 5 digit number." };
        return res.render('add-edit', { location: location, locations: locations, isAuth: true });
    }
};

exports.editView = async (req, res) => {
    const locations = await req.user.getLocations({ raw: true });
    let location = await Location.findByPk(req.params.id, { raw: true });
    res.render('add-edit', { location: location, locations: locations, isAuth: true });
};

exports.delete = async (req, res) => {
    await Location.destroy({ where: { id: req.params.id } });
    // or
    // let location = await Location.findByPk(req.params.id, { raw: true });
    // await location.destroy();
    res.redirect('/list');
}