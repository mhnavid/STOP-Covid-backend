const express           = require('express');
const router            = express.Router();
const publicCameraData  = require('../../controllers/public.cameraData.controller');

router.post('/api/mask-data-by-camera', (request, response) => {
    publicCameraData.maskDataByCamera(request, response);
})

module.exports = router;