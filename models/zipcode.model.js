//zip code
//alias for zip code
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('zipcode', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        zipcode: sequelize.STRING,
        alias: Sequelize.STRING
    })
}