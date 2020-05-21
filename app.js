//jshint esversion: 6
const express = require('Express');
const bodyParser = require('body-parser');
const request = require('request');

const https = require('https');
const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
    const firstname = req.body.firstname;
    const secondname = req.body.secondname;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: secondname
                }
            }
        ]
    };
    const url = 'https://us18.api.mailchimp.com/3.0/lists/9318876c79';
    const jsonData = JSON.stringify(data);
    const options = {
        method: 'POST',
        auth: 'gyan:06466eb69bd0e36a1a5aa4e0c602afa3d-us18',
    };
    const request = https.request(url, options, function (response) {
        response.on('data', function (data) {
            console.log(response.statusCode);
            if (response.statusCode === 200){
                res.sendFile(__dirname + '/success.html');
                } else {
                    res.sendFile(__dirname + '/failure.html');
                }
        });


    });
    request.write(jsonData);
    request.end();
  
});
app.post('/failure', function (req, res){
    res.redirect('/');
});

app.listen(3000);


// api key
// 06466eb69bd0e36a1a5aa4e0c602afa3-us18

// unique id 
// 9318876c79