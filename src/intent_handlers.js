'use strict';

var responseHelpers = require('./response_helpers');
var sessionHelpers  = require('./session_helpers');

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
    if (intentName === 'Fly'){
      // console.log('Flying!');
      command = {
        command: 'FLY',
        message: 'skynet is taking flight.',
        drone: 'Alpha'
      }
    } else if (intentName === 'Left') {
      command = {
        command: 'LEFT',
        message: 'skynet is on its way left',
        drone: 'Alpha'
      }
    } else if (intentName === 'Land'){
      command = {
        command: 'LAND',
        message: 'skynet is on its way going down',
        drone: 'Alpha'
      }
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        sessionHelpers.handleSessionEndRequest(callback);
        command = {
          command: 'LAND',
          message: 'Drones are landing. Thank you for flying with Skynet.'
        }
    } else if (intentName === 'Right') {
      command = {
        command: 'RIGHT',
        message: 'skynet is going right',
        drone: 'Alpha'
      }
    } else if (intentName === 'Up') {
      command = {
        command: 'UP',
        message: 'skynet is going up',
        drone: 'Alpha'
      }
    } else if (intentName === 'Down') {
      command = {
        command: 'DOWN',
        message: 'skynet is going down',
        drone: 'Alpha'
      }
    } else if (intentName === 'Forward') {
      command = {
        command: 'FORWARD',
        message: 'skynet is moving forward',
        drone: 'Alpha'
      }
    } else if (intentName === 'Back') {
      command = {
        command: 'BACK',
        message: 'skynet is moving backward',
        drone: 'Alpha'
      }
    } else if (intentName === 'TurnLeft') {
      command = {
        command: 'TURNLEFT',
        message: 'skynet is turning left',
        drone: 'Alpha'
      }
    } else if (intentName === 'TurnRight') {
      command = {
        command: 'TURNRIGHT',
        message: 'skynet is turning right',
        drone: 'Alpha'
      }
    } else if (intentName === 'FrontFlip') {
      command = {
        command: 'FRONTFLIP',
        message: 'skynet is doing a front flip',
        drone: 'Alpha'
      }
    } else if (intentName === 'BackFlip') {
      command = {
        command: 'BACKFLIP',
        message: 'skynet is doing a back flip',
        drone: 'Alpha'
      }
    } else if (intentName === 'Patrol') {
      command = {
        command: 'PATROL',
        message: 'skynet is patrolling',
        drone: 'Alpha'
      }
    } else {
        throw new Error('Invalid intent');
    }
    this.sendCommand(callback, command);
  },

  // Handlers for the commands/behaviors
  sendCommand: function (alexaHandler, command, callback) {
    var pubnub = require("pubnub")({
        ssl           : true,  // <- enable TLS Tunneling over TCP
        publish_key   : process.env.PUB_NUB_PUBLISH_KEY,
        subscribe_key : process.env.PUB_NUB_SUBSCRIBE_KEY
    });

    var eventType = ':tell';

    if (command.reprompt){
      eventType = ':ask';
    }

    // Emits :ask or :tell, with reMessage being the reprompt message
    alexaHandler.emit(eventType, command.message, command.reMessage);

    var message = {
      "command" : command.command,
      "drone"   : command.drone
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
  }
}
