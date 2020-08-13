const express       = require('express');
const router        = express.Router();
const cameraData    = require('../controllers/cameraData.controller');


router.get('/api/find-all-camera', (request, response) => {
    cameraData.findAllCamera(request, response);
})

module.exports = router;