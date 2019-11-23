/* VARIABLE DECLARATION
**************************************************************************************************/
require('dotenv').config();
const fs			= require('fs');
const request 		= require('request');
const cheerio		= require('cheerio');
const utils			= require('./utils.js');
const moment		= require('moment');
const currentDate	= moment().format('YYYY-MM-DD');

/* 
**************************************************************************************************/

let dateArray = utils.urlDateArray();
dateArray.forEach(dateURLEnd => {
	fetchData(dateURLEnd, currentDate);
});
console.log('Fetch completed successfully');

/* FUNCTIONS
**************************************************************************************************/
function fetchData(dateURLEnd, currentDate) {

	const options = {
		url: process.env.URL + dateURLEnd,
	};
	
	request(options, function(error, response, html) {
		if (error) {
			console.log('statusCode: ', response.statusCode);
			return;
		}
		const $ = cheerio.load(html);
		const content = $('.entry-content');

		if (content.text().includes('nothing was found')) {
			return;
		} else {
			const dataToBeWriten = '### ' + dateURLEnd + content.text() + '\n';
			fs.appendFileSync(`./WODs/${currentDate}.md`, dataToBeWriten, 'utf-8', {'flags':'a+'});
		}

	});
}
