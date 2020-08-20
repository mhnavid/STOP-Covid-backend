const express       = require('express');
const router        = express.Router()
const userData      = require('../controllers/userData.controller');

router.post('/api/create-user', (request, response) => {
    userData.createUser(request, response);
})

router.get('/api/all-users', (request, response) => {
    userData.getAllUsers(request, response);
})

router.post('/api/delete-user', (request, response) => {
    userData.deleteUser(request, response);
})

router.post('/api/find-user', (request, response) => {
    userData.findUser(request, response);
})

module.exports = router;