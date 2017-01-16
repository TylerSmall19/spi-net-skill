var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    // Un-comment for production
    // publish_key   : process.env.PUB_NUB_PUBLISH_KEY,
    publish_key   : "pub-c-5c099dc9-4fb8-41d4-a462-54224a4f47d7",
    // subscribe_key : process.env.PUB_NUB_SUBSCRIBE_KEY
    subscribe_key : "sub-c-78d941e8-d9b7-11e6-b9cf-02ee2ddab7fe"
});
var helpers = require('./response_helpers');

// Handlers for the commands/behaviors
function sendTheDrones(callback){
    /* ---------------------------------------------------------------------------
    Publish Messages
    --------------------------------------------------------------------------- */
    var message = { "Command" : "fly" };
    pubnub.publish({
        // Uncomment for production
        // channel   : process.env.PUB_NUB_CHANNEL_KEY,
        channel   : 'drone_control',
        message   : message,
        callback  : function(e) {
            console.log( "SUCCESS!", e);
        },
        error     : function(e) {
            console.log( "FAILED! RETRY PUBLISH!", e );
        }
    });

    const sessionAttributes = {};

    callback(sessionAttributes,
        helpers.buildSpeechletResponse('Drones', 'okay, I\'m sending the drones', null, false));
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'Start'){
        sendTheDrones(callback);
    }else {
        throw new Error('Invalid intent');
    }
}

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
            onIntent(event.request,
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
