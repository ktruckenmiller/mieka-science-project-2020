'use strict';
const AWS = require('aws-sdk')
const Hapi = require('@hapi/hapi');



const init = async () => {

    const server = Hapi.server({
        port: 3020,
        host: '0.0.0.0',
        routes:{
            cors: true
        }
    });

    server.route({
        method: 'POST',
        path: '/',
        handler: async (request, h) => {
          console.log(request)
          let params = {
            OutputFormat: 'mp3',
            Text: request.payload.text,
            TextType: "text",
            VoiceId: request.payload.voice
          }
          let polly = new AWS.Polly({
              signatureVersion: 'v4',
              region: 'us-west-2'
          });
          let signer = new AWS.Polly.Presigner({
              params: params,
              service: polly
          })
          let speech = new Promise((resolve, reject) => {
            signer.getSynthesizeSpeechUrl(params, 3600, (err, url) => {
              if (err) {
                return reject(err)
              }
              return resolve(url)
            })
          })
          return await speech
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
