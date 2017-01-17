# Rolling Spider Network Initiative (SpiNet)
#### Voice Controlled Drone Interface
-------------------------------
### Set Up (Prerequisites)
1. Set up the required [AWS](https://aws.amazon.com/account/) and [PubNub](https://admin.pubnub.com/#/register?pi_visitorid=219166828&psc=WC-Tracking&pt=wc-tracking) accounts.
2. Ensure you have a current version of [Node.js](https://nodejs.org/en/download/) installed. You can check versions with `node -v`.
3. Set up a [PubNub channel](https://admin.pubnub.com/#/register?pi_visitorid=219166828&psc=WC-Tracking&pt=wc-tracking) and keep the Pub/Sub keys given for later reference. (You should have been prompted to create an app when you set up the account)

This portion of the set up will be the most involved, but you should have an app fully functional within 10 minutes or earlier, depending on the familiarity you have with AWS (Amazon Web Services) Lambda, Pub Nub, and the Alexa Skills interface.

This readme assumes basic familiarity with getting an Alexa Skill configured. If you're new to Alexa entirely, consider following [Amazon's guide](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/alexa-skill-tutorial) before diving in.
### Getting Started
#### Enabling the ability to test a service with `npm test`
1. Clone the repo and cd into `src/`: `git clone https://github.com/TylerSmall19/spi-net-skill && cd spi-net-skill/src/`
2. Install the required Dependencies: `npm install`
3. Create a .env in `src/` and populate it:
```
PUB_NUB_CHANNEL_KEY=sky_net
PUB_NUB_PUBLISH_KEY=pub-[YOUR_PUB_KEY]
PUB_NUB_SUBSCRIBE_KEY=sub-[YOUR_SUB_KEY]
AMAZON_APP_KEY=amzn1.ask.skill.[YOUR_SKILL_ID]
```
4. If everything is configured correctly, your [Spi Net](https://github.com/TylerSmall19/spi-net) client should be receiving a command issued from the terminal.
