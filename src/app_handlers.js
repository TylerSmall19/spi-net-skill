'use strict';
var sessionHelpers = require('./session_helpers');
var intentHandlers = require('./intent_handlers');

module.exports = {
  onLaunch: function (launchRequest, session, callback) {
    // console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);
    var command = {
      command: '',
      message: 'Welcome to the Skynet Drone interface. The drones are at your command.',
      drone: 'Alpha'
    }
    intentHandlers.sendCommand(callback, command);
  }
}
