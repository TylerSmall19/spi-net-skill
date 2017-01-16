var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : process.env.PUB_NUB_PUBLISH_KEY,
    subscribe_key : process.env.PUB_NUB_SUBSCRIBE_KEY
});

// console.log(pubnub);

// Sends out a PubNub notification to clients to control the drones with commands
function sendTheDrones(callback){

    /* ---------------------------------------------------------------------------
    Publish Messages
    --------------------------------------------------------------------------- */
    var message = { "Hello" : "World!" };
    pubnub.publish({
        channel   : channelId,
        message   : message,
        callback  : function(e) {
            console.log( "SUCCESS!", e );
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
