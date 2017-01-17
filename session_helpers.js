'use strict';
var responseHelpers = require('./response_helpers');

module.exports = {
  onSessionStarted: function (sessionStartedRequest, session){
    console.log(`session-request: ${sessionStartedRequest} ---- session: ${session}`);
  },

  handleSessionEndRequest: function (callback) {
    const cardTitle = 'Skynet Descends...';
    const speechOutput = 'Thank you for flying with Spy Net.';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, responseHelpers.buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
  }
}
