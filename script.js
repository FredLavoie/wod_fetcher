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
const currentYear	= Number(moment().format('YYYY'));

/* 
*************************************************************************/

if(!yearParam || !monthParam) {
	console.log('Input parameter(s) missing');
} else {
	for (let y = yearParam; y <= currentYear; y++) {
		for (const month of months) {
			console.log('month: ', month);
			console.log('months[month]: ', month[month]);  // <-- problem here
			console.log('months[month].days: ', month[month].days);
			
			for (let d = 1; d <= months[month].days; d++) {
				let dateVariable = `${month}-${d}-${y}/`;
				console.log(dateVariable);
				// fetchData(dateVariable);
			}
		}
	}	
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
	});

}
