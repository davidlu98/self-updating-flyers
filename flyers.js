// Last edited on December 30th (editing the code to work for old and new months)

$(document).ready(function(){
	// Declarations to get the current date
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; // January is 0
	var yyyy = today.getFullYear();

	// Function that gives us the number of days in the month (1-based)
	function daysInMonth(month,year) {
		return new Date(year, month, 0).getDate();
	}

	// alert(daysInMonth(2,2018)); // 28
	// alert(daysInMonth(4,2018)); // 30

	// Array of the weekdays (Sunday is 0, Saturday is 6)
	var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday',
							'Thursday', 'Friday', 'Saturday');
	// Array of the month 
	var month = new Array('January', 'February', 'March', 'April', 
							'May', 'June', 'July', 'August', 
							'September', 'October','November', 'December')
	var currMonth = month[mm-1];
	var currMonthLowerCase = currMonth.toLowerCase();
	var nextMonth = month[mm%12];
	var nextMonthLowerCase = nextMonth.toLowerCase();
	// console.log(nextMonth);
	// console.log(nextMonthLowerCase);

	var dayOfWeek = weekday[today.getDay()];

	// alert(dayOfWeek); // Wow you really get the day of the week

	formatedToday = mm + '/' + dd + '/' + yyyy;
	// alert(today); // Make sure it's working
	// alert(dd); // The date seems to be working

	var flyerHeader = document.getElementById('header');
	//alert(flyerHeader);

	flyerHeader.innerHTML = "Flyers for " + dayOfWeek + " " + currMonth + " " + dd + " " + yyyy;

	//alert(today.getDay() == 4); Test

	// Function that ouputs the number of days in a month
	function daysInMonth(month,year) {
		return new Date(year, month, 0).getDate();
	}

	// alert(daysInMonth(2,2018)); // results in 28
	// alert(daysInMonth(4,2018)); // results in 30

	var previousMonthDays = daysInMonth(mm-1,yyyy);
	var currentMonthDays = daysInMonth(mm,yyyy);

	function updateStartDate(){
		var startDate;

		// If it's January, previous month is December (12,yyyy-1)
		if(mm == 1){
			previousMonthDays = daysInMonth(12,yyyy-1);
		}
		
		if(today.getDay() == 0){ // Sunday
			startDate = dd - 2;
			if(startDate <= 0){
				startDate = (dd - 2 + previousMonthDays)%previousMonthDays;
			}
		}

		else if(today.getDay() == 1){ // Monday
			startDate = dd - 3;
			if(startDate <= 0){
				startDate = (dd - 3 + previousMonthDays)%previousMonthDays;
			}
		}

		else if(today.getDay() == 2){ // Tuesday
			startDate = dd - 4;
			if(startDate <= 0){
				startDate = (dd - 4 + previousMonthDays)%previousMonthDays;
			}
		}

		else if(today.getDay() == 3){ // Wednesday
			startDate = dd - 5;
			if(startDate <= 0){
				startDate = (dd - 5 + previousMonthDays)%previousMonthDays;
			}
		}

		else if(today.getDay() == 4){ // Thursday
			startDate = dd + 1;
			if(startDate > currentMonthDays){ // (ie if (31+1) > 31))
				startDate = startDate%currentMonthDays;
				// If today is Thursday the 31st and tomorrow is Friday the 1st..
				// The start date should be Friday the 1st (31+1)%31
			}
		}

		else if(today.getDay() == 5){ // Friday
			startDate = dd;
		}

		else if(today.getDay() == 6){ // Saturday
			startDate = dd - 1;
			if(startDate <= 0){
				startDate = (dd - 1 + previousMonthDays)%previousMonthDays;
			}
		}
		return startDate;
	}

	// Start and end date for flyers
	var startDate = updateStartDate();
	var endDate = startDate + 6;
	var checkIfNextMonth = endDate;

	if(endDate > currentMonthDays){
		endDate = endDate%currentMonthDays;
	}

	// Start and end dates as strings
	var startDateString = startDate.toString();
	var endDateString = endDate.toString();

	// Since Walmart is one day early
	var startDateWalmartString = (startDate-1).toString(); 
	var endDateWalmartString = (endDate-1).toString();	

	// Since Save-On and Price-Smart start 2 days earlier apparently..
	var startDateSaveOnAndPriceSmart = (startDate-2).toString();

	// Edit No Frills href
	var noFrills = document.getElementById("nf");
	var noFrillsLink = "https://flyers.smartcanucks.ca/canada/no-frills-west-flyer-" + 
						currMonthLowerCase + "-" + startDateString + "-to-" + endDateString;

	if(checkIfNextMonth > currentMonthDays){
		noFrillsLink = "https://flyers.smartcanucks.ca/canada/no-frills-west-flyer-" + 
				currMonthLowerCase + "-" + startDateString + "-to-" + nextMonthLowerCase +
				"-" + endDateString;
	}
	noFrills.setAttribute("href", noFrillsLink);

	// Edit Price Smart href
	var priceSmart = document.getElementById("ps");
	var priceSmartLink = "https://flyers.smartcanucks.ca/canada/pricesmart-foods-flyer-" +
						currMonthLowerCase + "-" + startDateSaveOnAndPriceSmart + "-to-" + endDateString;

	if(checkIfNextMonth > currentMonthDays){
		priceSmartLink = "https://flyers.smartcanucks.ca/canada/pricesmart-foods-flyer-" +
						currMonthLowerCase + "-" + startDateSaveOnAndPriceSmart + "-to-" 
						+ nextMonthLowerCase + "-" + endDateString;
	}
	priceSmart.setAttribute("href", priceSmartLink);

	// Edit Real Canadian href
	var realCanadian = document.getElementById("rcs");
	var realCanadianLink = "https://flyers.smartcanucks.ca/canada/real-canadian-superstore-west-flyer-" +
						currMonthLowerCase + "-" + startDateString + "-to-" + endDateString;
	if(checkIfNextMonth > currentMonthDays){
		realCanadianLink = "https://flyers.smartcanucks.ca/canada/real-canadian-superstore-west-flyer-" +
						currMonthLowerCase + "-" + startDateString + "-to-" + nextMonthLowerCase
						+ "-" + endDateString;
	}
	realCanadian.setAttribute("href", realCanadianLink);

	// Edit SafeWay href
	var safeway = document.getElementById("sw");
	var safewayLink = "https://flyers.smartcanucks.ca/canada/safeway-bc-flyer-" +
						currMonthLowerCase + "-" + startDateString + "-to-" + endDateString;
	if(checkIfNextMonth > currentMonthDays){
		safewayLink = "https://flyers.smartcanucks.ca/canada/safeway-bc-flyer-" +
						currMonthLowerCase + "-" + startDateString + "-to-" + nextMonthLowerCase +
						"-" + endDateString;
	}
	safeway.setAttribute("href", safewayLink);

	// Edit Save On href
	var saveOn = document.getElementById("sof");
	var saveOnLink = "https://flyers.smartcanucks.ca/canada/save-on-foods-bc-flyer-" +
						currMonthLowerCase + "-" + startDateSaveOnAndPriceSmart + "-to-" + endDateString;
	if(checkIfNextMonth > currentMonthDays){
		saveOnLink = "https://flyers.smartcanucks.ca/canada/save-on-foods-bc-flyer-" +
						currMonthLowerCase + "-" + startDateSaveOnAndPriceSmart + "-to-" 
						+ nextMonthLowerCase + "-" + endDateString;
	}
	saveOn.setAttribute("href", saveOnLink);

	// Edit T&T href
	var TT = document.getElementById("tt");
	var TTLink = "https://flyers.smartcanucks.ca/canada/tt-supermarket-bc-flyer-" +
						currMonthLowerCase + "-" + startDateString + "-to-" + endDateString;
	if(checkIfNextMonth > currentMonthDays){
		TTLink = "https://flyers.smartcanucks.ca/canada/tt-supermarket-bc-flyer-" +
						currMonthLowerCase + "-" + startDateString + "-to-" + nextMonthLowerCase +
						"-" + endDateString;
	}
	TT.setAttribute("href", TTLink);

	// Edit WalMart href
	var walmart = document.getElementById("wm");
	var walmartLink = "https://flyers.smartcanucks.ca/canada/walmart-west-flyer-" +
						currMonthLowerCase + "-" + startDateWalmartString + "-to-" + 
						endDateWalmartString;
	if(checkIfNextMonth > currentMonthDays){
		walmartLink = "https://flyers.smartcanucks.ca/canada/walmart-west-flyer-" +
						currMonthLowerCase + "-" + startDateWalmartString + "-to-" + 
						nextMonthLowerCase + "-" + endDateWalmartString;
	}
	walmart.setAttribute("href", walmartLink);
})