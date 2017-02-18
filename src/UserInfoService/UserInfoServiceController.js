({
	doInit : function(component, event, helper) {
		helper.callServer(component,"c.getUserData",function(response){
            var record = JSON.parse(response);
            component.set("v.userName", record.userName); 
            component.set("v.userId", record.userId);
            component.set("v.userEmail", record.userEmail);
        }, {
        });
	}
})