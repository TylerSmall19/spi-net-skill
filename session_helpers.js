'use strict';

module.exports = {
  onSessionStarted: function (sessionStartedRequest, session){
    console.log(`session-request: ${sessionStartedRequest} ---- session: ${session}`);
  },

  handleSessionEndRequest: function (callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you for flying with Spy Net.';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, RESPONSE_HELPERS.buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
  }
}
