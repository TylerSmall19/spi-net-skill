require('dotenv').load();
var responseHelpers = require('./response_helpers');
var intentHandlers = require('./intent_handlers');
var sessionHelpers = require('./session_helpers');

// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
function testCall(event, context, callback){
  try {
      console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

      /**
       * Uncomment this if statement and populate with your skill's application ID to
       * prevent someone else from configuring a skill that sends requests to this function.
       */

      if (event.session.application.applicationId !== process.env.AMAZON_APP_KEY) {
          callback('Invalid Application ID');
      }


      if (event.session.new) {
          sessionHelpers.onSessionStarted({ requestId: event.request.requestId }, event.session);
      }

      if (event.request.type === 'LaunchRequest') {
          console.log('Intent Requested!');
          onLaunch(event.request,
              event.session,
              (sessionAttributes, speechletResponse) => {
                  callback(null, responseHelpers.buildResponse(sessionAttributes, speechletResponse));
              });
      } else if (event.request.type === 'IntentRequest') {
          intentHandlers.onIntent(event.request,
              event.session,
              (sessionAttributes, speechletResponse) => {
                  callback(null, responseHelpers.buildResponse(sessionAttributes, speechletResponse));
              });
      } else if (event.request.type === 'SessionEndedRequest') {
          onSessionEnded(event.request, event.session);
          callback(null, 'Thank you for flying with SkyNet');
      }
  } catch (err) {
      callback(err);
  }
}

var event = {
  "session": {
    "sessionId": "SessionId.6fa59c36-5660-4cba-83f1-89d33abbcd50",
    "application": {
      "applicationId": "amzn1.ask.skill.c7a33919-96a2-496e-8730-5a795285f0d6"
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
      "name": "Fly",
      "slots": {}
    }
  },
  "version": "1.0"
}

var context = {}

var hollaBaq = function(err){ console.log(err); };

testCall(event, context, hollaBaq);
