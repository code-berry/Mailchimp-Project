const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req,res){
	var firstName = req.body.fName;
	var lastName = req.body.lName;
	var email = req.body.email;
	var fullName = firstName + ' ' + lastName;
	console.log(email, fullName);

	var data = {
		members: [
			{
			 email_address: email,
			 status: "subscribed"
			}
		]
	};

	var jsonData = JSON.stringify(data);

	var options = {
		url: "https://us20.api.mailchimp.com/3.0/lists/70d27a38e9",
		method: "POST",
		headers: {
			"Authorization": "matt e0820458ed60b09f8e9c22101d87ebad-us20"
		},
		body: jsonData
	};

	request(options, function(error, response, body) {
		if (error) {
			app.post('/', function(req,res) {
				res.sendFile(__dirname + "/failure.html");
			});
		} else {
			app.post('/', function(req,res) {
				res.sendFile(__dirname + "/success.html");
			});
		}
	});
});



app.listen(3000, function() {
	console.log('Server is running on port 3000');
});



// 70d27a38e9
// e0820458ed60b09f8e9c22101d87ebad-us20