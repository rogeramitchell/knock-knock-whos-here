({
	doInit : function(component, event, helper) {
		let recordId = component.get("v.recordId");
		let action = component.get("c.handleInit");

		action.setParams({
			recordId: recordId
		});

		action.setCallback(this, function(response) {
			let responseState = response.getState();
			if(responseState === "SUCCESS") {
				let recordViewers = response.getReturnValue();
				component.set("v.recordViewers", recordViewers);
				console.log(recordViewers);
			} else {
				console.error("There were some errors! 🔥")
				console.error(response);
				console.error(responseState);
				console.error(response.getReturnValue());
			}
		})

		$A.enqueueAction(action);
	}
})