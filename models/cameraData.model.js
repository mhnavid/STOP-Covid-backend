module.exports = (sequelize, Sequelize) => {
    const CameraData = sequelize.define("camera_data", {
        person: {
            type: Sequelize.STRING ,          
        },
        camera_id: {
            type: Sequelize.STRING
        },
        mask_status: {
            type: Sequelize.STRING
        },
        division: {
            type: Sequelize.STRING
        },
        district: {
            type: Sequelize.STRING
        },
        date_time: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
    });

    return CameraData;
}