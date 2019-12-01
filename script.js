/* VARIABLE DECLARATION
**************************************************************************************************/
require('dotenv').config();
const fs			= require('fs');
const rp		= require('request-promise-native');
const cheerio		= require('cheerio');
const moment		= require('moment');
const currentDate	= moment().format('YYYY-MM-DD');
const utils			= require('./utils.js');
const dateArray 	= utils.urlDateArray();

/* FUNCTIONS
**************************************************************************************************/

async function loppThroughArray() {
	for (const date of dateArray) {
		const options = {
			url: process.env.URL + date
		};
		await asyncRequest(options, date);
	}
}

async function asyncRequest(options, date) {
	await rp(options)
		.then(function(html){
			const $ = cheerio.load(html);
			const content = $('.entry-content');
			const formattedContent = content.text()
			.split('\t').join('')
			.split('\n\n\n').join('')
			.split('\n\n').join('');
			const dataToBeWritten = '### ' + date + '\n' + formattedContent + '\n\n';
			fs.appendFileSync(`./WODs/${currentDate}.md`, dataToBeWritten, 'utf-8', {'flags':'a+'});
			fs.appendFileSync(`./WODs/${currentDate}.txt`, dataToBeWritten, 'utf-8', {'flags':'a+'});
		});
}

loppThroughArray();
