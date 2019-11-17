require('dotenv').config();
const fs			= require('fs');
const request 		= require('request');
const htmlparser	= require('htmlparser2');

let test = 'january-15-2018/';

const parser = new htmlparser.Parser(
	{
		onprocessinginstruction(name, data) {
			if (name === 'p') {
				console.log('This worked!');
				console.log(data);
			}
		},
		ontext(text) {
			console.log(text);
		} 
	},
	{ decodeEntities: true }
);

const options = {
	url: process.env.URL + test,
};

request(options, function(error, response, body) {
    if (error) {
		console.log('error: ', error);
		console.log('statusCode: ', response && response.statusCode);
		return;
	}

	parser.write(body);
	parser.end();
});

