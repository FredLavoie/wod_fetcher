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
		for (const month in months) {
			// console.log('month: ', month);
			// console.log('months[month]: ', month.name);
			// console.log('months[month].days: ', month.days);
			
			for (let d = 1; d <= months[month].days; d++) {
				let dateVariable1 = `${month}-${d}-${y}/`;
				console.log(dateVariable1);
				// fetchData(dateVariable1);
				if(d < 10) {
					let dateVariable2 = `${month}-0${d}-${y}/`;
					console.log(dateVariable2);
					// fetchData(dateVariable1);
				}
				let dateVariable3 = '';
				switch (d) {
					case 1:
					case 21:
					case 31:
						dateVariable3 = `${month}-${d}st-${y}/`;
						break;
					case 2:
					case 22:
							dateVariable3 = `${month}-${d}nd-${y}/`;
						break;
					case 3:
					case 23:
							dateVariable3 = `${month}-${d}rd-${y}/`;
						break;		
					default:
							dateVariable3 = `${month}-${d}th-${y}/`;
						break;
				}
				console.log(dateVariable3);
				// fetchData(dateVariable1);
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

		// need to return data each time or send to fs manipulation function

	});

}
