const express           = require('express');
const router            = express.Router();
const publicCameraData  = require('../../controllers/public.cameraData.controller');

router.post('/api/mask-data-by-date', (request, response) => {
    publicCameraData.maskDataByDate(request, response);
})

module.exports = router;