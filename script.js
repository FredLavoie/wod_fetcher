require('dotenv').config();
const fs			= require('fs');
const request 		= require('request');
const cherio		= require('cherio');

let test = 'january-15-2018/';

const options = {
	url: process.env.URL + test,
};

request(options, function(error, response, html) {
    if (error) {
		console.log('error: ', error);
		console.log('statusCode: ', response && response.statusCode);
		return;
	}
	if (response.statusCode !== 200) {
		console.log();
		
	}



});

