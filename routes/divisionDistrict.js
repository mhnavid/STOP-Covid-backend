const express       = require('express');
const router        = express.Router()
const cameraData    = require('../controllers/cameraData.controller');

router.get('/api/division-district-data', (request, response) => {
    cameraData.findDistrictDivision(request, response);
})

module.exports = router;