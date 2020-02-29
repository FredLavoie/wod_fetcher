/* VARIABLE DECLARATION
**************************************************************************************************/
require('dotenv').config();
const fs						= require('fs');
const rp						= require('request-promise-native');
const cheerio				= require('cheerio');
const moment				= require('moment');
const currentDate		= moment().format('YYYY-MM-DD_hh_mm');
const utils					= require('./utils.js');
const inputParam		= process.argv[2];
let dateArray				= [];

/* FUNCTIONS
**************************************************************************************************/
async function loppThroughArray() {
  let startTime = Date.now();
  for (const date of dateArray) {
    const options = {
      url: process.env.URL + date
    };
    await asyncRequest(options, date);
  }

  let endTimeMin = ((Date.now() - startTime) / (1000 * 60)).toFixed(2);
  let endTimeSec = ((Date.now() - startTime) / (1000)).toFixed(2);
  if(endTimeMin < 1) {
    console.log(`Fetching completed in: ${endTimeSec} seconds`);
  } else {
    console.log(`Fetching completed in: ${endTimeMin} minutes`);
  }

}

async function asyncRequest(options, date) {
  await rp(options)
    .then(function(html){
      console.log('Writing: ', date);
      const $ = cheerio.load(html);
      const content = $('.entry-content');
      const formattedContent = content.text()
      .split('\t').join('')
      .split('\n\n\n').join('')
      .split('\n\n').join('');
      const dataToBeWritten = '### ' + date + '\n' + formattedContent + '\n\n';
      fs.appendFileSync(`./WODs/${currentDate}.md`, dataToBeWritten, 'utf-8', {'flags':'a+'});
      fs.appendFileSync(`./WODs/${currentDate}.txt`, dataToBeWritten, 'utf-8', {'flags':'a+'});
    })
    .catch(function(){
      return;
    });
}

switch (inputParam) {
  case 'all':
    console.log('Fetching all WODs since 2017');
    dateArray = utils.allDateArray();
    loppThroughArray();
    break;
  case 'year':
    console.log('Fetching all WODs this year');
    dateArray = utils.yearDateArray();
    loppThroughArray();
    break;
  case 'month':
    console.log('Fetching all WODs this month');
    dateArray = utils.monthDateArray();
    loppThroughArray();
    break;
  case 'day':
    console.log('Fetching today\'s WOD');
    dateArray = utils.dayDateArray();
    loppThroughArray();
    break;
  default:
    console.log('Wrong input parameters');
    break;
}
