module.exports = (sequelize, Sequelize) => {
    const UserData = sequelize.define("user_data", {
        username: {
            type: Sequelize.STRING ,          
        },
        password: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
    });

    return UserData;
}