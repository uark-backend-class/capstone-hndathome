const Sequelize = require('sequelize');
const ZipCodeModel = require('./models/zipcode.model');
const UserModel = require('./models/user.model');

const sequelize = new Sequelize('where_covid19_matters', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

const ZipCode = ZipCodeModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

// Relations / Associations
User.hasMany(ZipCode);
// Will add user id to zipcode
ZipCode.belongsTo(User);

sequelize.sync().then(() => {
    console.log('Created database tables');
});

module.exports = {
    ZipCode,
    User,
}