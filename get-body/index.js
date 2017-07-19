var request = require('request');
var AWS = require('aws-sdk');

var sns = new AWS.SNS({
  region: 'us-east-1'
});


exports.handler = function(event, context, callback) {
// console.log('Received event:', JSON.stringify(event, null, 4));
 
    var url = event.Records[0].Sns.Message;

    request(url, (error, response, body) => {
        if (error) {
          console.log(`URL ${page.url} couldnt be crawled: ${error}`)
        } else {
          var messageinfo = {
            "url": url,
            "body": body,
            "host": response.req._headers.host
          }
          var params = {
            Message: JSON.stringify(messageinfo), /* required */
            Subject: 'STRING_VALUE',
            TopicArn: ''
          };
          sns.publish(params, (err, data) => {
              if(err) console.log(err, err.stack);
          });
        }
    })
   
    console.log('Message received from SNS:', url); 
    callback(null, "Success");  
};