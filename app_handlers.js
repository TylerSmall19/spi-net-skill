'use strict';

module.exports = {
  onLaunch: function (launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);
  }
}