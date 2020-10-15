module.exports = (sequelize, Sequelize) => {
    return sequelize.define('location', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        zip_code: Sequelize.STRING,
        alias: Sequelize.STRING,
        state_abbr: Sequelize.STRING,
        state: Sequelize.STRING,
        latitude: Sequelize.DECIMAL(8, 6),
        longitude: Sequelize.DECIMAL(9, 6),
        default_city: Sequelize.STRING,
    })
}