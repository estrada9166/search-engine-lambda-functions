var AWS = require('aws-sdk');
var request = require('request')

var sns = new AWS.SNS({
  region: 'us-east-1'
});

exports.handler = function(event, context, callback) {
// console.log('Received event:', JSON.stringify(event, null, 4));
 
    var message = event.Records[0].Sns.Message;
    var newMessage = JSON.parse(message)

    request({
      method: 'POST',
      uri: 'http://34.228.32.168:9200/pages/indexed',
      body: {
        'url': newMessage.url,
        'body': newMessage.body,
        'host': newMessage.host
      },
      json: true
    }, function(err) {
      if(err) console.log(err)
        var params = {
        Message: message, /* required */
        Subject: 'STRING_VALUE',
        TopicArn: ''
      };
      sns.publish(params, (err, data) => {
          if(err) console.log(err, err.stack);
      });
      console.log('Message received from SNS:', message); 
      callback(null, "Success");
    });
};