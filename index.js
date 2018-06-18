// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var checksum = require('./checksum');
var port = process.env.PORT || 8083;
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
  extended: true
})); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/')); // set the static files location /public/img will be /img for users
// routes ==================================================
app.get('/getPaytm', function(req, res) {
  var gratify = new Array();
  gratify = {
    "request": {
      "requestType": "walletTxnId",
      "txnType": "salestouser",
      "txnId": "1164432"
    },
    "ipAddress": "127.0.0.1",
    "platformName": "PayTM",
    "operationType": "SALES_TO_USER_CREDIT"
  };
  // Generate checksum
  var finalstr = JSON.stringify(gratify);
  let secretKey = "<secretKey>"
  checksum.genchecksumbystring(finalstr, secretKey, function(err, result){
      var date = new Date();
      const request = require('request');
      request({
        url: 'https://trust-uat.paytm.in/wallet-web/txnStatusList', //URL to hit
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mid': '<merchantGuid>',
          'checksumhash': result
        },
        time: true,
        body: finalstr //Set the body as a string
      }, function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          res.send(body);
        }
      });
    });
});
app.post('/sendToPaytm', function(req, res) {
  var gratify = new Array();
  gratify = {
    "request": {
      "requestType": "null",
      "merchantGuid": "<merchantGuid>",
      "merchantOrderId": "ORD8611868654432012",
      "salesWalletName": "",
      "salesWalletGuid": "<salesWalletGuid>",
      "payeeEmailId": "",
      "payeePhoneNumber": "7777777777",
      "payeeSsoId": "",
      "appliedToNewUsers": "N",
      "amount": "1",
      "currencyCode": "INR"
    },
    "metadata": "Testing Data",
    "ipAddress": "127.0.0.1",
    "platformName": "PayTM",
    "operationType": "SALES_TO_USER_CREDIT"
  };
  // Generate checksum
  var finalstr = JSON.stringify(gratify);
  let secretKey = "<secretKey>";
  checksum.genchecksumbystring(finalstr, secretKey, function(err, result){
      var date = new Date();
      const request = require('request');
      request({
        url: 'https://trust-uat.paytm.in/wallet-web/salesToUserCredit', //URL to hit
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mid': '<merchantGuid>',
          'checksumhash': result
        },
        time: true,
        body: finalstr //Set the body as a string
      }, function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          res.send(body);
        }
      });
    });
});
app.get('*', function(req, res) {
  res.sendfile('./index.html');
});
app.listen(port);
console.log('Paytm started on ' + port); // shoutout to the user
exports = module.exports = app; // expose app
