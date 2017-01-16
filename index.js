// require('dotenv').load();
var intentHandlers  = require('./lambda/intent_handlers');
var sessionHelpers  = require('./lambda/session_helpers');
var responseHelpers = require('./lambda/response_helpers');

// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
  // TODO comment this out before production
  // function testCall(event, context, callback){
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
