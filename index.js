'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

var mongoose = require('mongoose');
var config = require('./config');
var options = require(__dirname + '/routes/option')();
var fbMessenger = require('./modules/fbMessenger');
global.__base = __dirname + '/';

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())
app.use(express.static('WebContent'));


// Connect to database
mongoose.connect(config.database.mlabs);


//Router calls
app.use('/option', options);



// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    let text = event.message.text
		    sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
	    } else if(event.message && event.message.attachments){
	    	//Create the attachment
      		let attachment = event.message.attachments

      // Here we access the JSON as object
      		let object1 = attachment[0];

      //Here we access the payload property 
      		let payload = object1.payload;

      // Finally we access the URL
      		let url = payload.url;

      		console.log(url)
	    }
	     else if (event.message) {
            fbMessenger.receivedMessage(event);
        }
    }
    res.sendStatus(200)
})

const token = "EAAR7gFHrhVABAMFZCkE5gRbECV5G00eQfJobfMYJZAGqfcII2N7NqBRPStWaPZApJFel4yYqLSuGJvcjw6og9wzY50gzR5jhGTSeP8ErFolG9uy7ZBf9yE9wnTP5BguI8zKzVkEDgrEQ0IsQRgLk5Ebe5ywZAaKmRjZCZAV2vfeZBwZDZD";

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    } else{
	    	console.log(response.body);
	    }
    })
}