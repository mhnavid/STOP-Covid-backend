const db         = require('../utils/postgres');
const { Sequelize } = require('sequelize');
const CameraData = db.cameraData;
const Op = db.Sequelize.Op;

exports.create = async(req, res) => {
    const cameraData = {
        person: req.person,
        face: req.face,
        camera_id: req.camera_id,
        mask_status: req.mask_status,
        division: req.division,
        district: req.district,
        date_time: req.date_time
    }

    await CameraData.sync()
        .then(() => {
            CameraData.create(cameraData)
                .then(data => {
                    res
                        .status(200)
                        .json({
                            error: false,
                            message: "Data successfully saved."
                        })
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({
                            error: true,
                            message: err.message
                        })
                })
        })
}

exports.findAll = (req, res) => {
    CameraData.findAll({
        attributes:["mask_status", "date_time"]
    })
        .then(data => {
            res
                .status(200)
                .json({
                    error: false,
                    data: data
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: true,
                    message: err.message
                })
        })
}

exports.findDistrictDivision = (req, res) => {
    CameraData.findAll({
        attributes:[
            [Sequelize.fn('DISTINCT', Sequelize.col('division')) ,'division'], 
            'division',
            "district"
        ],
    })
        .then(data => {
            res
                .status(200)
                .json({
                    error: false,
                    data: data
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: true,
                    message: err.message
                })
        })
}

exports.findPersonImageByDistrict = (req, res) => {
    const district = req.body.district;
    CameraData.findAll({
        attributes:["person"],
        where: {
            district: {
                [Op.or]: [district]
            }
        }
    })
        .then(data => {
            res
                .status(200)
                .json({
                    error: false,
                    data: data
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: true,
                    message: err.message
                })
            })
}

exports.findDetailsByCamera = (req, res) => {
    const camera = req.body.camera;
    CameraData.findAll({
        attributes:["mask_status", "date_time"],
        where: {
            camera_id: {
                [Op.or]: [camera]
            }
        }
    })
        .then(data => {
            res
                .status(200)
                .json({
                    error: false,
                    data: data
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: true,
                    message: err.message
                })
            })
}

exports.findAllCamera = (req, res) => {
    CameraData.findAll({
        attributes:[[Sequelize.fn('DISTINCT', Sequelize.col("camera_id")) ,"camera_id"]]
    })
        .then(data => {
            res
                .status(200)
                .json({
                    error: false,
                    data: data
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: true,
                    message: err.message
                })
        })
}