// --------------- Main handler -----------------------
'use strict';

var intentHandlers  = require('./intent_handlers');
var sessionHelpers  = require('./session_helpers');
var responseHelpers = require('./response_helpers');
var appHandlers     = require('./app_handlers');

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
    console.log('Executing');
    var alexa = Alexa.handler(event, context);
    alexa.appId = process.env.AMAZON_APP_KEY;

    alexa.registerHandlers(handlers);

    alexa.execute();
};

var handlers = {
  "Fly": buildHandler({
    command : 'FLY',
    message : 'skynet is taking flight.',
    drone   : 'Alpha',
    reprompt: true
  }),
  "Back": buildHandler({
    command : 'BACK',
    message : 'skynet is flying back',
    drone   : 'Alpha',
    reprompt: true
  }),
  "Unhandled": unhandledIntent
}

function unhandledIntent () {
  this.emit(
    ':ask',
    'I did not understand your request.',
    'Please give a flight command for SkyNet.'
  )
}

// Intent Builder Helpers
function buildHandler(command) {
  return function(event, context) {
    intentHandlers.sendCommand(this, command); //keep an eye on "this"
  }
}
