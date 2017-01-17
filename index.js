// --------------- Main handler -----------------------
'use strict';

var intentHandlers  = require('./intent_handlers');
var sessionHelpers  = require('./session_helpers');
var responseHelpers = require('./response_helpers');
var appHandlers     = require('./app_handlers');

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
  try {
      // console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

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
          appHandlers.onLaunch(event.request,
              event.session,
              (sessionAttributes, speechletResponse) => {
                  callback(null, responseHelpers.buildResponse(sessionAttributes, speechletResponse));
              });
      } else if (event.request.type === 'IntentRequest') {
          intentHandlers.onIntent(event.request,
              event.session,
              function(sessionAttributes, speechletResponse) {
                  callback(null, responseHelpers.buildResponse(sessionAttributes, speechletResponse));
              });
      } else if (event.request.type === 'SessionEndedRequest') {
          sessionHelpers.onSessionEnded(event.request, event.session);

          var command = {
            command: 'LAND',
            message: 'skynet is ending its flight. Thank you for flying with us.'
          }

          intentHandlers.sendMessage(callback, command);

          callback();
      }
  } catch (err) {
      callback(err);
  }
}
