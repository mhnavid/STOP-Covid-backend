const express       = require('express');
const router        = express.Router();
const cameraData    = require('../controllers/cameraData.controller');

router.post('/api/person-by-district', (request, response) => {
    cameraData.findPersonImageByDistrict(request, response);
})

module.exports = router;