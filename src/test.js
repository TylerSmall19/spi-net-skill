require('dotenv').load();

var event = {
  "session": {
    "sessionId": "SessionId.6fa59c36-5660-4cba-83f1-89d33abbcd50",
    "application": {
      "applicationId": process.env.AMAZON_APP_KEY
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AEOBPRYUMYCVV6I4OUWBEPUGGYTMPDL4OTJLPH33CM3DHG2LKGP4GP3J7OTX67LZQP5NLUPTBYVPEX2NKH35QLQXLZCQTRMKFMEZ7NFPRNGMCDYB4NKSC6MPWEIPFH3JZKI6RKSG4KIGFKZFICFKJ4DYC2UWHE652J5OTRAVMSZGQV3N6COLO6OWIIM46OHOPQ4LPD72SFTHB4Q"
    },
    "new": false
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.6c0242e1-272d-431a-a8d8-8199d6d96ced",
    "locale": "en-US",
    "timestamp": "2017-01-16T18:13:43Z",
    "intent": {
      "name": "Back",
      "slots": {}
    }
  },
  "version": "1.0"
}

var context = {}

// Callback function upon request (Customize as needed for debugging application)
var hollaBaq = function(err, response){ console.log(err, response); };

// Calls the main application handler
require('./index').handler(event, context, hollaBaq);
