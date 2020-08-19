const db            = require('../utils/postgres');
const { Sequelize } = require('sequelize');
const CameraData    = db.cameraData;
const Op            = db.Sequelize.Op;
const moment        = require('moment');

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function getDatesBetweenDates(startDate, endDate) {
    let dates = []
    //to avoid modifying the original date
    const theDate = new Date(startDate)
    while (theDate < endDate) {
        
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1)
    }
    return dates;
}

exports.maskDataByCamera = (req, res) => {
    const cameraId = req.body.cameraId;
    CameraData.findAll({
        attributes:["mask_status", "date_time"],
        where: {
            camera_id: {
                [Op.or]: [cameraId.toString()]
            }
        }
    })
        .then(result => {
            let allDates  = [];
            let maskedStatus = [];
            for(let i = 0; i < result.length; i++) {
                allDates.push(result[i].dataValues.date_time.split(" ")[0].trim());
            }

            if( allDates.length === 0){
                maskedStatus.push({"date": "", "masked": 0, "non_masked": 0});
            } else {
                let uniqueDates = allDates.filter( onlyUnique );

                for(let i = 0; i < uniqueDates.length; i++) {
                    let masked    = 0;
                    let nonMasked = 0;
                    for(let j = 0; j < result.length; j++) {
                        if(uniqueDates[i] === result[j].dataValues.date_time.split(" ")[0].trim()) {
                            
                            if (result[j].dataValues.mask_status === "masked") {
                                masked++;
                            } 
                            else if (result[j].dataValues.mask_status === "clear") {
                                nonMasked++;
                            }
                        }
                    }
                    maskedStatus.push({"date": uniqueDates[i], "masked": masked, "non_masked": nonMasked});
                }
            }

            res
                .status(200)
                .json({
                    error: false,
                    data: maskedStatus
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

exports.maskDataByDate = (req, res) => {
    const cameraId = req.body.cameraId;
    const fromDate = new Date(req.body.fromDate);
    const toDate   = new Date(req.body.toDate);

    let dates = getDatesBetweenDates(fromDate, toDate);

    CameraData.findAll({
        attributes:["mask_status", "date_time"],
        where: {
            camera_id: {
                [Op.or]: [cameraId.toString()]
            }
        }
    })
        .then(result => {
            let maskedCount = 0;
            let nonMaskedCount = 0;

            for(let i = 0; i<dates.length; i++) {
                for(let j = 0; j < result.length; j++) {
                    if(moment(dates[i]).format("YYYY-MM-DD") === moment(result[j].dataValues.date_time.split(" ")[0].trim()).format("YYYY-MM-DD")) {
                        if (result[j].dataValues.mask_status === "masked") {
                            maskedCount++;
                        } 
                        else if (result[j].dataValues.mask_status === "clear") {
                            nonMaskedCount++;
                        }
                    }
                }
            }

            let maskedStatus = {"cameraId": cameraId, "masked": maskedCount, "nonMasked": nonMaskedCount};

            res
                .status(200)
                .json({
                    error: false,
                    data: maskedStatus
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

exports.allCameraDataByDate = (req, res) => {
    const date = req.body.date;

    CameraData.findAll({
        attributes:["camera_id", "mask_status", "date_time"] 
    })
        .then(result => {
            let allCameras = [];
            let maskedStatus = [];

            for(let i = 0; i < result.length; i++) {
                if(moment(result[i].dataValues.date_time.split(" ")[0].trim()).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")) {
                    allCameras.push(result[i].dataValues.camera_id);
                }    
            }

            if(allCameras.length === 0) {
                maskedStatus.push({"cameraId": "", "masked": 0, "non_masked": 0});
            } else {
                let uniqueCameras = allCameras.filter( onlyUnique ).sort();
                for(let i = 0; i < uniqueCameras.length; i++) {
                    let masked    = 0;
                    let nonMasked = 0;
                    for(let j = 0; j < result.length; j++) {
                        if(uniqueCameras[i] === result[j].dataValues.camera_id
                            && moment(result[j].dataValues.date_time.split(" ")[0].trim()).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")) {                            
                            if (result[j].dataValues.mask_status === "masked") {
                                masked++;
                            } 
                            else if (result[j].dataValues.mask_status === "clear") {
                                nonMasked++;
                            }
                        }
                    }
                    maskedStatus.push({"cameraId": uniqueCameras[i], "masked": masked, "non_masked": nonMasked});
                }
            }

            res
                .status(200)
                .json({
                    error: false,
                    data: maskedStatus
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