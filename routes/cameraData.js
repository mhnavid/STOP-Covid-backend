const express       = require('express');
const router        = express.Router();
// const cameraData    = require('../controllers/cameraData.controller');
const s3Controller  = require('../controllers/s3.controller');


router.post('/api/camera-data', (request, response) => {
    if(Object.keys(request.body).length !== 0){
        for(let i = 0; i<request.body.length; i++){
            // cameraData.create(request.body[i], response);
            s3Controller.uploadImageToS3(request.body[i], response);
        }
    } else {
        return response
            .status(400)
            .json({
                error: true,
                message:"ERROR"
            })
    }
})

module.exports = router;