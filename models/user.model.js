module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        google_id: Sequelize.STRING,
        display_name: Sequelize.STRING,
    })
}