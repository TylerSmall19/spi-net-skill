module.exports = {
  onSessionStart: function(sessionStartedRequest, session){
    console.log(`session-request: ${sessionStartedRequest} ---- session: ${session}`);
  }
}
