const express       = require('express')
const bodyParser    = require('body-parser')
const logger        = require('morgan');
const cors          = require('cors');
const cameraData    = require('./routes/cameraData');
const allCameraData = require('./routes/allCameraData');
const divisionDistrict = require('./routes/divisionDistrict');
const findPersonByDistrict = require('./routes/findPersonbyDistrict');
const findAllCamera = require('./routes/findAllCamera');
const findDetailsByCamera = require('./routes/findDetailsByCamera');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'))
app.use(cors());

app.use(cameraData);
app.use(allCameraData);
app.use(divisionDistrict);
app.use(findPersonByDistrict);
app.use(findAllCamera);
app.use(findDetailsByCamera)

app.use(function(req, res, next) {
  next(createError(404));
});


const _port = process.env.PORT || 4000;
app.listen(_port,()=>{
  console.log(`Application Listen On Port ${_port}`);
});