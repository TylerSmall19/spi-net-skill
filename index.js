// require('dotenv').load();
const INTENT_HANDLERS  = require('./lambda/intent_handlers');
const SESSION_HELPERS  = require('./lambda/session_helpers');
const RESPONSE_HELPERS = require('./lambda/response_helpers');

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
          SESSION_HELPERS.onSessionStarted({ requestId: event.request.requestId }, event.session);
      }

      if (event.request.type === 'LaunchRequest') {
          onLaunch(event.request,
              event.session,
              (sessionAttributes, speechletResponse) => {
                  callback(null, RESPONSE_HELPERS.buildResponse(sessionAttributes, speechletResponse));
              });
      } else if (event.request.type === 'IntentRequest') {
          console.log('Intent Requested!');
          callback(null,
            RESPONSE_HELPERS.buildResponse({},
              RESPONSE_HELPERS.buildSpeechletResponse(
                'Drone', 'output', 'repromptText', true)));

          // INTENT_HANDLERS.onIntent(event.request,
          //     event.session,
          //     (sessionAttributes, speechletResponse) => {

          //         callback(null, RESPONSE_HELPERS.buildResponse(sessionAttributes, speechletResponse));
          //     });
      } else if (event.request.type === 'SessionEndedRequest') {
          SESSION_HELPERS.onSessionEnded(event.request, event.session);
          callback();
      }
  } catch (err) {
      callback(err);
  }
}
