const Sequelize = require('sequelize');
const LocationModel = require('./models/location.model');
const UserModel = require('./models/user.model');

const sequelize = new Sequelize(process.env.DATABASE_URL);
const Location = LocationModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

// Relations / Associations
User.hasMany(Location);
// Will add userId to Location
Location.belongsTo(User);

sequelize.sync().then(() => {
    console.log('Created database tables');
});

module.exports = {
    Location,
    User,
}