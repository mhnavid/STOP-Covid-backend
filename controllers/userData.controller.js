const db         = require('../utils/postgres');
const UserData   = db.userData;
const Op         = db.Sequelize.Op;

exports.createUser = (req, res) => {
    const userData = {
        username: req.body.user,
        password: req.body.pass
    }

    UserData.sync()
        .then(() => {
            UserData.create(userData)
                .then(data => {
                    res
                        .status(200)
                        .json({
                            error: false,
                            message: "User successfully created."
                        })
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({
                            error: true,
                            message: err.message
                        })
                })
        })
}

exports.getAllUsers = (req, res) => {
    UserData.findAll()
        .then(data => {
            res
                .status(200)
                .json({
                    error: false,
                    data: data
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: true,
                    message: err.message
                })
        })
}

exports.deleteUser = (req, res) => {
    const id = req.body.id;
    UserData.destroy({
        where: { id: id }
    })
        .then(data => {
            if(data == 1)  {
                res
                    .status(200)
                    .json({
                        error: false,
                        message: "User successfully deleted."
                    })
            } else {
                res
                    .status(200)
                    .json({
                        error: false,
                        message: "User not found."
                    })
            }
            
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: true,
                    message: err.message
                })
        })

}

exports.findUser = (req, res) => {
    const username = req.body.user;
    const password = req.body.pass;

    UserData.findAll({
        where: {
            username: username,
            password: password
        }
    })
        .then(data => {
            if(data.length === 0)  {  
                res
                    .status(200)
                    .json({
                        error: false,
                        user : false
                    })
            } else {
                res
                    .status(200)
                    .json({
                        error: false,
                        user : true
                    })
            }
            
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: true,
                    message: err.message
                })
        })
}