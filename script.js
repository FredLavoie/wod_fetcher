/* VARIABLE DECLARATION
**************************************************************************************************/
require('dotenv').config();
const fs			= require('fs');
const request 		= require('request');
const cheerio		= require('cheerio');
const utils			= require('./utils.js');
const moment		= require('moment');
const currentDate	= moment().format('YYYY-MM-DD');

/* FUNCTIONS
**************************************************************************************************/

function fetchData(dateURLEnd, currentDate) {

	const options = {
		url: process.env.URL + dateURLEnd,
	};
	
	request(options, function(error, response, html) {
		if (error) {
			return;
		}
		if (response.statusCode !== 200) {
			return;
		}
		const $ = cheerio.load(html);
		const content = $('.entry-content');
		const formattedContent = content.text().split('\t').join('').split('\n\n\n').join('')
		.split('\n\n').join('');
		const dataToBeWriten = '### ' + dateURLEnd + '\n' + formattedContent + '\n\n';
		fs.appendFileSync(`./WODs/${currentDate}.md`, dataToBeWriten, 'utf-8', {'flags':'a+'});

	});
}

let dateArray = utils.urlDateArray();
dateArray.forEach(dateURLEnd => {
	fetchData(dateURLEnd, currentDate);
});
