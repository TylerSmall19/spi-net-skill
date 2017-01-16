// --------------- Helpers that build all of the responses -------------------- //
module.exports = {
    buildSpeechletResponse: function (title, output, repromptText, shouldEndSession) {
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
    },

    buildResponse: function (sessionAttributes, speechletResponse) {
        return {
            version: '1.0',
            sessionAttributes,
            response: speechletResponse,
        };
    }
}
