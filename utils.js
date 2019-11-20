const months		= require('./months');
const moment		= require('moment');

const currentDay	= moment().format('DD');
const currentMonth	= Number(moment().format('MM'));
const currentYear	= Number(moment().format('YYYY'));

function urlDateArray(month, year) {
	let resultsArray = [];

	for (let y = year; y <= currentYear; y++) {
		for (const month in months) {
			// if(currentMonth >= month.number && currentYear >= y) {
				for (let d = 1; d <= months[month].days; d++) {

					let dateVariable1 = `${month}-${d}-${y}/`;
					resultsArray.push(dateVariable1);
					// fetchData(dateVariable1);
					if(d < 10) {
						let dateVariable2 = `${month}-0${d}-${y}/`;
						// console.log(dateVariable2);
						// fetchData(dateVariable2);
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
					// console.log(dateVariable3);
					// fetchData(dateVariable3);
					
				}
			// }
		}
	}
	return resultsArray;
}

exports.urlDateArray = urlDateArray; 