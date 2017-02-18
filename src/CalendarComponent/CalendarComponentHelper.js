({
	getDaysInMonth : function(month,year) {
    	return new Date(year, month+1, 0).getDate();	
	},
    
    getDayOfWeek : function(month,day,year) {
        var d = new Date();
        d.setDate(day);
        d.setMonth(month);
        d.setFullYear(year);
        return d.getDay();    
	},
    
    getDayOfWeekString : function(dayOfWeek,fullStr) {
        var weekday = new Array(7);
        weekday[0] = fullStr == true ? "Sunday" : "Sun";
        weekday[1] = fullStr == true ? "Monday" : "Mon";
        weekday[2] = fullStr == true ? "Tuesday": "Tue";
        weekday[3] = fullStr == true ? "Wednesday" :"Wed";
        weekday[4] = fullStr == true ? "Thursday" : "Thu";
        weekday[5] = fullStr == true ? "Friday" : "Fri";
        weekday[6] = fullStr == true ? "Saturday" : "Sat"; 
        return weekday[dayOfWeek];
    },
    
    getMonthString : function(monthNumber) {
        var month = new Array(11);
        month[0] ="January";
        month[1] ="February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[monthNumber];        
    },
    
    getMonthNumber : function(monthName) {
        var month = new Array(11);
        month["January"] =  0;
        month["February"] =  1;
        month["March"] =  2;
        month["April"] =  3;
        month["May"] =  4;
        month["June"] =  5;
        month["July"] =  6;
        month["August"] =  7;
        month["September"] =  8;
        month["October"] =  9;
        month["November"] =  10;
        month["December"] = 11;
        return month[monthName];
    },    
    
    getMonthArray : function(month,year) {
        // Month array has 6 weeks
        var monthArray = new Array(41);
        // Get the day of week for the 1st of the month
        var firstDay = this.getDayOfWeek(month,1,year);
        // Get last month's number of days
        var lastMonthLastDay = this.getDaysInMonth(month == 0 ? 11 : month-1, year);
        // Get this month's last day
        var thisMonthLastDay = this.getDaysInMonth(month,year);
        // See how many days for first Sunday
        var firstSunday = 0 - firstDay;
        // Build week arrays
        var startingDay = firstSunday < 0 ? lastMonthLastDay + firstSunday : 0;
        var currentDay = startingDay;
        var inCurrentMonth = startingDay == 0 ? true : false;
        for (var w = 1; w < 42; w++) {
            if ((inCurrentMonth && currentDay == thisMonthLastDay) || 
                (!inCurrentMonth && currentDay == lastMonthLastDay)) {
                    currentDay = 1
                    inCurrentMonth = !inCurrentMonth;
                } else { 
                    currentDay++; 
                }
            monthArray.push({day:currentDay,enabled:inCurrentMonth});
        } 
        return monthArray;
    },
    
    selectToday : function(component) {
        var today = new Date();
        component.set('v.currentMonth',this.getMonthString(today.getMonth()));
        component.set('v.currentDay',today.getDate());
        component.set('v.currentYear',today.getFullYear());        
    },
    
    refreshCalendar : function(component,month,day,year) {
        var monthArray = this.getMonthArray(this.getMonthNumber(month),year);
        var weekCounter = 1;
        var indexCounter = 0;
        var weekArray = new Array(7);
        for (var index in monthArray) {   
            if (indexCounter != 0 && indexCounter % 6 == 0) {
                weekArray.push({day:monthArray[index].day,
                                class:monthArray[index].day == day && monthArray[index].enabled ? 'slds-is-selected' : monthArray[index].enabled ? '' : 'slds-disabled-text',
                                aria:monthArray[index].enabled  ? 'true' : 'false'});
                component.set('v.weekArray'+weekCounter,weekArray);
                weekCounter++;                
                weekArray = new Array(7);
                indexCounter = 0;
            } else {
                weekArray.push({day:monthArray[index].day,
                                class:monthArray[index].day == day && monthArray[index].enabled ? 'slds-is-selected' : monthArray[index].enabled ? '' : 'slds-disabled-text',
                                aria:monthArray[index].enabled  ? 'true' : 'false',
                                selected:monthArray[index].day == day });
                indexCounter++;
            }
        }        
    },
    
    fireDateChangeEvent : function (month,day,year) {
        // Fire DateChangeEvent
        var dateChangeEvent = $A.get('e.c:CalendarDateChange');
        dateChangeEvent.setParams({
            month: month,
            day: this.getDayOfWeekString(this.getDayOfWeek(this.getMonthNumber(month),day,year),true),
            date: day,
            year: year
        });
        dateChangeEvent.fire();     
    }
})