require('aws-sdk/dist/aws-sdk');
const AWS = window.AWS;

module.exports = (accessKeyId, secretAccessKey)=>{
  return new AWS.S3({
    accessKeyId,
    secretAccessKey
  });
}
