const { Location } = require('../db');

exports.getAll = async (req, res) => {
    const locations = await req.user.getLocations({ raw: true });
    res.render('list', { locations });
};

exports.update = async (req, res) => {
    //add or edit?
    //zip code doesn't already exists, smarty street validation, add smarty street fields to req.body
    req.body.userId = req.user.id;
    await Location.upsert(req.body);
    res.redirect('/');
};

exports.editView = async (req, res) => {
    let location = await Location.findByPk(req.params.id, { raw: true });
    res.render('add-edit', { location });
};

exports.delete = async (req, res) => {
    await Location.destroy({ where: { id: req.params.id } });
    // or
    // let zipCode = await ZipCode.findByPk(req.params.id, { raw: true });
    // await zipCode.destroy();
    res.redirect('/');
}