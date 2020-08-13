const express       = require('express');
const router        = express.Router();
const cameraData    = require('../controllers/cameraData.controller');

router.post('/api/details-by-camera', (request, response) => {
    cameraData.findDetailsByCamera(request, response);
})

module.exports = router;