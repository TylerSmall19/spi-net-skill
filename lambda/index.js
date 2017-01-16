var helpers = require('./response_helpers');
var intentHandlers = require('./intent_handlers');

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : process.env.PUB_NUB_PUBLISH_KEY,
    subscribe_key : process.env.PUB_NUB_SUBSCRIBE_KEY
});

// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

        if (event.session.application.applicationId !== process.env.AMAZON_APP_KEY) {
             callback('Invalid Application ID');
        }


        // if (event.session.new) {
        //     onSessionStarted({ requestId: event.request.requestId }, event.session);
        // }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, helpers.buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            intent_handlers.onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, helpers.buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback(null, 'Thank you for flying with SkyNet');
        }
    } catch (err) {
        callback(err);
    }
};
