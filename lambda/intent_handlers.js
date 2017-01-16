var response_helpers = require('./response_helpers');
// Handlers for the commands/behaviors
function sendCommand(callback, command){
  var pubnub = require("pubnub")({
      ssl           : true,  // <- enable TLS Tunneling over TCP
      publish_key   : process.env.PUB_NUB_PUBLISH_KEY,
      subscribe_key : process.env.PUB_NUB_SUBSCRIBE_KEY
  });

  /* ---------------------------------------------------------------------------
  Publish Messages
  --------------------------------------------------------------------------- */
  console.log(process.env.PUB_NUB_SUBSCRIBE_KEY);
  var message = {
    "command" : command.command,
    "drone"   : 'Alpha'
  };
  pubnub.publish({
      channel   : process.env.PUB_NUB_CHANNEL_KEY,
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
      response_helpers.buildSpeechletResponse('Sky Net', command.message, null, false));
}

// EXPORTS //
module.exports = {
  /**
   * Called when the user specifies an intent for this skill.
   */
  onIntent: function (intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'Start'){
      console.log('Flying!');
      var command = {
        command: 'FLY',
        message: 'telling the drones to fly'
      }
    } else if (intentName === 'Left') {
      var command = {
        command: 'LEFT',
        message: 'skynet is on its way left'
      }
    } else if (intentName === 'Land'){
      var command = {
        command: 'LAND',
        message: 'skynet is going down'
      }
    } else {
      throw new Error('Invalid intent');
    }
    sendCommand(callback, command);
  }
}
