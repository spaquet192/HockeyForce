({
	doInit : function(component, event, helper) {
		var hoursArray = new Array(23);
        var AmPm = "am";
        for (var hour=0; hour<24; hour++) {
            if (hour < 12) { AmPm = "am"; } else { AmPm = "pm"; }
            var hourEntry = hour == 0 && AmPm == "am" ? "12"+AmPm : hour+AmPm;
            hoursArray.push(hourEntry);
        }
        component.set('v.hoursArray',hoursArray);
	},
    
    handleDateChange : function(component, event, helper) {
        var day = event.getParam('day');
        var date = event.getParam('date');
        var month = event.getParam('month');
        var year = event.getParam('year');
        component.set('v.day',day+', '+month+' '+date + (date == 1 ? 'st' : date == 2 ? 'nd' : date == 3 ? 'rd' : 'th') +' '+year);
    },
    
    handleCreateEvent : function(component, event, helper) {
        
    }
})