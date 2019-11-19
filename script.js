/* VARIABLE DECLARATION
*************************************************************************/
require('dotenv').config();
const fs			= require('fs');
const request 		= require('request');
const cheerio		= require('cheerio');
const months		= require('./months');
const moment		= require('moment');
const monthParam	= process.argv[2];
const yearParam		= process.argv[3];

const currentDay	= moment().format('Do');
const currentDay2	= moment().format('DD');
const currentMonth	= moment().format('MMM');
const currentMonth2	= moment().format('MMMM');
const currentYear	= moment().format('YYYY');

/* 
*************************************************************************/
console.log('currentDay: ', currentDay);
console.log('currentDay2: ', currentDay2);
console.log('currentMonth: ', currentMonth);
console.log('currentMonth2: ', currentMonth2);
console.log('currentDay: ', currentYear);

if(!yearParam || !monthParam) {
	console.log('Input parameter(s) missing');
} else if(!months.includes(monthParam)) {
	console.log('Invalid month parameter');
} else {
	for (const month of months) {
		for (let i = 1; i < months[month].days; i++) {
			let dateVariable = `${month}-${}-${yearParam}`;

		}
	}
}

let test = 'january-15-2018/';

/* FUNCTIONS
*************************************************************************/
function fetchData(month, year) {

	const options = {
		url: process.env.URL + test,
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
	});

}
