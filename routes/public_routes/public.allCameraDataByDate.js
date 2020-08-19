const express           = require('express');
const router            = express.Router();
const publicCameraData  = require('../../controllers/public.cameraData.controller');

router.post('/api/camera-data-by-date', (request, response) => {
    publicCameraData.allCameraDataByDate(request, response);
})

module.exports = router;