'use strict';

var responseHelpers = require('./response_helpers');
// Handlers for the commands/behaviors

function sendCommand (callback, command){
    var pubnub = require("pubnub")({
        ssl           : true,  // <- enable TLS Tunneling over TCP
        publish_key   : process.env.PUB_NUB_PUBLISH_KEY,
        subscribe_key : process.env.PUB_NUB_SUBSCRIBE_KEY
    });

    /* ---------------------------------------------------------------------------
    Publish Messages
    --------------------------------------------------------------------------- */
    var message = {
      "command" : command.command,
      "drone"   : 'Alpha'
    };

    pubnub.publish({
        channel   : process.env.PUB_NUB_CHANNEL_KEY,
        message   : message,
        callback  : function(e) {
          console.log('Message Sent! Goodbye, cruel world...');
          pubnub.shutdown();
        },
        error     : function(e) {
            console.log( "FAILED! RETRY PUBLISH!", e );
        }
    });

    var sessionAttributes = {};

    callback(sessionAttributes,
        responseHelpers.buildSpeechletResponse('Sky Net', command.message, 'I\'m sorry. I didn\' catch that.', false));
  }

// EXPORTS //
module.exports = {
  /**
   * Called when the user specifies an intent for this skill.
   */
  onIntent: function (intentRequest, session, callback) {
    // console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;
    var command = {};

    // Dispatch to your skill's intent handlers
    if (intentName === 'Start'){
      // console.log('Flying!');
      command = {
        command: 'FLY',
        message: 'telling the drones to fly'
      }
    } else if (intentName === 'Left') {
      command = {
        command: 'LEFT',
        message: 'skynet is on its way left'
      }
    } else if (intentName === 'Land'){
      command = {
        command: 'LAND',
        message: 'skynet is on its way going down'
      }
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        SESSION_HELPERS.handleSessionEndRequest(callback);
        command = {
          command: 'LAND',
          message: 'Drones are landing. Thank you for flying with Skynet.'
        }
    } else {
        throw new Error('Invalid intent');
    }
    sendCommand(callback, command);
  }
}