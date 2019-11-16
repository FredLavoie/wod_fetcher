require('dotenv').config();
const fs		= require('fs');
const request = require('request');

let test = 'january-12-2019/';

const options = {
	url: process.env.URL,
  }

  request(options, function(error, response, body) {
    if (error) {
      console.log('error: ', error);
      console.log('statusCode: ', response && response.statusCode);
    }

	console.log(response.statusCode);

    console.log('Download complete');
    
  });
