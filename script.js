/* VARIABLE DECLARATION
*************************************************************************/
require('dotenv').config();
const fs			= require('fs');
const request 		= require('request');
const cheerio		= require('cheerio');
const utils			= require('./utils.js');
const moment		= require('moment');
const currentDate	= moment().format('YYYY-MM-DD');
/* 
*************************************************************************/

let dateArray = utils.urlDateArray();
dateArray.forEach(dateURLEnd => {
	fetchData(dateURLEnd, currentDate);
});

/* FUNCTIONS
*************************************************************************/
function fetchData(dateURLEnd, currentDate) {

	const options = {
		url: process.env.URL + dateURLEnd,
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
		const dataToBeWriten = dateURLEnd + '\n' + content.text() + '\n';
		
		fs.writeFileSync(`./WODs/${currentDate}.txt`, dataToBeWriten);

	});
	console.log('Fetch completed successfully');
}
