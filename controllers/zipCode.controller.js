const { ZipCode } = require('../db');

exports.getAll = async (req, res) => {
    // Get all of our zipCodes
    const zipCodes = await ZipCode.findAll({ raw: true, where: { userId: req.user.id } });
    // render our list view
    res.render('list', { numZipCodes, zipCodes, total });
};

exports.update = async (req, res) => {
    // req.user.id
    req.body.userId = req.user.id;
    await ZipCode.upsert(req.body);
    res.redirect('/');
};

exports.editView = async (req, res) => {
    let zipCode = await ZipCode.findByPk(req.params.id, { raw: true });
    res.render('add-edit', { zipCode });
};

exports.delete = async (req, res) => {
    await ZipCode.destroy({ where: { id: req.params.id } });
    // or
    // let zipCode = await ZipCode.findByPk(req.params.id, { raw: true });
    // await zipCode.destroy();
    res.redirect('/');
}