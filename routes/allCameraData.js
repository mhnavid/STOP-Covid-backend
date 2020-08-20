const express       = require('express');
const router        = express.Router();
const cameraData    = require('../controllers/cameraData.controller');

router.get('/api/all-camera-data', (request, response) => {
    cameraData.findAll(request, response);
})

module.exports = router;