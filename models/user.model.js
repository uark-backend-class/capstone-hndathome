module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        googleId: Sequelize.STRING,
        displayName: Sequelize.STRING,
    })
}