({
	doInit : function(component, event, helper) {
        helper.selectToday(component);
        var month = component.get('v.currentMonth');
        var year = component.get('v.currentYear');
        var day = component.get('v.currentDay');      
		helper.refreshCalendar(component,month,day,year);
        helper.fireDateChangeEvent(month,day,year);        
	},
    
    handleNextMonth : function(component, event, helper) {
        var currentMonth = component.get('v.currentMonth');
        var currentDay = component.get('v.currentDay');
        var currentYear = component.get('v.currentYear');
        var currentMonthNumber = helper.getMonthNumber(currentMonth);
        var monthToGet = currentMonthNumber == 11 ? 0 : currentMonthNumber+1;
        component.set('v.currentMonth',helper.getMonthString(monthToGet));
        helper.refreshCalendar(component,helper.getMonthString(monthToGet),currentDay,currentYear);
        helper.fireDateChangeEvent(helper.getMonthString(monthToGet),currentDay,currentYear);
    },
    
    handlePreviousMonth: function(component, event, helper) {
        var currentMonth = component.get('v.currentMonth');
        var currentDay = component.get('v.currentDay');
        var currentYear = component.get('v.currentYear');        
        var currentMonthNumber = helper.getMonthNumber(currentMonth);
        var monthToGet = currentMonthNumber == 0 ? 11 : currentMonthNumber-1;
        component.set('v.currentMonth',helper.getMonthString(monthToGet));  
        helper.refreshCalendar(component,helper.getMonthString(monthToGet),currentDay,currentYear);
        helper.fireDateChangeEvent(helper.getMonthString(monthToGet),currentDay,currentYear);        
    },
    
    handleYearSelect: function(component, event, helper) {
        var currentMonth = component.get('v.currentMonth');
        var currentDay = component.get('v.currentDay');
        var currentYear = event.target.options[event.target.selectedIndex].value;
        component.set('v.currentYear',currentYear);    
        helper.refreshCalendar(component,currentMonth,currentDay,currentYear);
        helper.fireDateChangeEvent(currentMonth,currentDay,currentYear);      
    },    
    
    handleSelectToday : function(component, event, helper) {
		helper.selectToday(component);
        var currentMonth = component.get('v.currentMonth');
        var currentDay = component.get('v.currentDay');
        var currentYear = component.get('v.currentYear'); 
        helper.refreshCalendar(component,currentMonth,currentDay,currentYear);
        helper.fireDateChangeEvent(currentMonth,currentDay,currentYear);       
    },
    
    handleDayClick : function(component, event, helper) {
        if (event.target.parentElement.className != 'slds-disabled-text') {
            var currentDay = event.target.textContent;
            component.set('v.currentDay',currentDay);
            var currentMonth = component.get('v.currentMonth');
            var currentYear = component.get('v.currentYear');
            helper.refreshCalendar(component,currentMonth,currentDay,currentYear); 
        	helper.fireDateChangeEvent(currentMonth,currentDay,currentYear);
        }
	}
})