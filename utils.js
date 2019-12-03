const months				= require('./months');
const moment				= require('moment');
const currentYear		= Number(moment().format('YYYY'));
const currentMonth	= moment().format('MMMM');
const currentDay1		= moment().format('D');
const currentDay2		= moment().format('DD');
const currentDay3		= moment().format('Do');

// Return array of all dates, in order from 2017 to present
exports.allDateArray = function () {
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

// Return array of all dates, in order from Jan to Dec of the current year
exports.yearDateArray = function () {
	let resultsArray = [];
	let y = currentYear;
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
	return resultsArray;
};

// Return array of all dates, in order of the current month
exports.monthDateArray = function () {
	let resultsArray = [];
	let y = currentYear;
	let month = currentMonth.toLowerCase();
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
	return resultsArray;
};

// Return array of dates, of present day
exports.dayDateArray = function () {
	let resultsArray = [];
	let y = currentYear;
	let month = currentMonth;

	resultsArray.push(`${month}-${currentDay1}-${y}`);
	resultsArray.push(`${month}-${currentDay2}-${y}`);
	resultsArray.push(`${month}-${currentDay3}-${y}`);

	return resultsArray;
};