const months		= require('./months');
const moment		= require('moment');
const currentYear	= Number(moment().format('YYYY'));

exports.urlDateArray = function () {
	let resultsArray = [];
	let yearFrom = 2017;

	for (let y = yearFrom; y <= currentYear; y++) {
		for (const month in months) {
			for (let d = 1; d <= months[month].days; d++) {

				let dateVariable1 = `${month}-${d}-${y}`;
				resultsArray.push(dateVariable1);
				if(d < 10) {
					let dateVariable2 = `${month}-0${d}-${y}`;
					resultsArray.push(dateVariable2);
				}
				let dateVariable3 = '';
				switch (d) {
					case 1:
					case 21:
					case 31:
						dateVariable3 = `${month}-${d}st-${y}`;
						break;
					case 2:
					case 22:
							dateVariable3 = `${month}-${d}nd-${y}`;
						break;
					case 3:
					case 23:
							dateVariable3 = `${month}-${d}rd-${y}`;
						break;		
					default:
							dateVariable3 = `${month}-${d}th-${y}`;
						break;
				}
				resultsArray.push(dateVariable3);
			}
		}
	}
	return resultsArray;
};
