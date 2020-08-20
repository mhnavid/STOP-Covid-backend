const express = require('express');
const AWS     = require('aws-sdk');
const s3Config = require('../config/s3.config');
const { v4: uuidv4 } = require('uuid');
const cameraData   = require('./cameraData.controller');

AWS.config.update({
    accessKeyId: s3Config.iam_access_key_id,
    secretAccessKey: s3Config.iam_secret_access_key,
    region: s3Config.iam_region
});
// AWS.config.update({region: s3Config.iam_region});
s3 = new AWS.S3({apiVersion: '2012-10-17'});

exports.aws = (req, res) => {
    s3.listBuckets(function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Buckets);
        }
      });
}

exports.uploadImageToS3 = (req, res) => {
  const data = {
    person: req.person,
    division: req.division,
    district: req.district
  }

  let uploadParams = {
    Bucket: "mask-analytics",
    Key: uuidv4()+".jpg",
    Body: Buffer.from(data.person.replace(/^data:image\/\w+;base64,/, ""),'base64'),
    ContentEncoding: 'base64',
    ContentType: 'image/jpg',
    ACL: 'public-read'
  }

  s3.headBucket({Bucket:"mask-analytics"},function(err,data){
    if(err){
      s3.createBucket({Bucket:"mask-analytics"},function(err,data){
        if(err){ throw err; }
      });
    }
    s3.upload (uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } if (data) {
        console.log(data.Location)
        cameraData.create(req, res, data.Location);
      }
    });
  });
}
