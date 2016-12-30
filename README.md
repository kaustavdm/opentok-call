OpenTok PWA
================

A simple one-to-one call progressive web application (PWA) based on OpenTok.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/kaustavdm/opentok-call) [Demo](https://opentok-call.kaustavdm.in)

## Requirements

- NodeJS v6.9+
- TokBox Account (API Key and Secret)

## Install

- Copy `config.sample.js` to `config.js` and edit configuration.
- Install dependencies: `npm install`
- Start the application with: `npm start`

### SSL requirements

You will need SSL to use this demo on latest browsers. You can either set up a proxy through nginx or apache and run this application without SSL, or you can run have `node` serve it directly on SSL when you run `npm start`.

If you want `node` to serve this application using SSL, you will need to edit `config.js` and change `ssl.enabled` to `true`. Change the values in the `ssl` section to point to your key and certificate pair.

**Self-signed certificate**: If you have `openssl` installed and on `PATH`, you can run `npm run certs` to generate a self-signed certificate. This command will create `key.pem` and `cert.pem` in the project root, which are also the default value for the `ssl` configuration.

If you are deploying to Heroku, you do not need to worry about the SSL config.
## Credits

- Icon source - [Communication Icons](https://www.iconfinder.com/icons/1518229/baloom_cellphone_communication_talk_text_texting_icon) by Thalita Torres.
