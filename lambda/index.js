var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    // Un-comment for production
    // publish_key   : process.env.PUB_NUB_PUBLISH_KEY,
    publish_key   : "pub-c-5c099dc9-4fb8-41d4-a462-54224a4f47d7",
    // subscribe_key : process.env.PUB_NUB_SUBSCRIBE_KEY
    subscribe_key : "sub-c-78d941e8-d9b7-11e6-b9cf-02ee2ddab7fe"
});

// Sends out a PubNub notification to clients to control the drones with commands
function sendTheDrones(callback){
    /* ---------------------------------------------------------------------------
    Publish Messages
    --------------------------------------------------------------------------- */
    var message = { "Hello" : "World!" };
    pubnub.publish({
        // Uncomment for production
        // channel   : process.env.PUB_NUB_CHANNEL_KEY,
        channel   : 'my_channel',
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
        buildSpeechletResponse('Drones', 'okay, I\'m sending the drones', null, false));
}

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}

console.log('Hello!');

sendTheDrones(function(){
    console.log('Sending the drones!');
})
