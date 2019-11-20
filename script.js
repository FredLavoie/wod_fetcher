/* VARIABLE DECLARATION
*************************************************************************/
require('dotenv').config();
const fs			= require('fs');
const request 		= require('request');
const cheerio		= require('cheerio');
// const months		= require('./months');
// const moment		= require('moment');
const utils			=require('./utils.js');
const monthParam	= process.argv[2];
const yearParam		= process.argv[3];

// const currentDay	= moment().format('DD');
// const currentMonth	= moment().format('MM');
// const currentYear	= Number(moment().format('YYYY'));

/* 
*************************************************************************/

if(!yearParam || !monthParam) {
	console.log('Input parameter(s) missing');
} else if(yearParam === 'all' || monthParam === 'all') {
	let dateArray = utils.urlDateArray(monthParam, yearParam);
	console.log(dateArray);
	
} else if(!!monthParam || !!yearParam) {
	let dateArray = utils.urlDateArray(monthParam, yearParam);
	console.log(dateArray);
}

/* FUNCTIONS
*************************************************************************/
function fetchData(dateVariable) {

	const options = {
		url: process.env.URL + dateVariable,
	};
	
	request(options, function(error, response, html) {
		if (error) {
			console.log('error: ', error);
			console.log('statusCode: ');
			console.log(response && response.statusCode);
			return;
		}
		if (response.statusCode !== 200) {
			console.log(response.statusCode);
			return;
		}
		const $ = cheerio.load(html);
		const content = $('.entry-content');
		console.log(content.text());

		// need to return data each time or send to fs manipulation function

	});

}
