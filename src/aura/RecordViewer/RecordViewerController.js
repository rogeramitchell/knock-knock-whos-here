({
	doInit : function(component) {
		let recordId = component.get("v.recordId");
		let action = component.get("c.handleInit");

		action.setParams({
			recordId: recordId
		});

		action.setCallback(this, function(response) {
			let responseState = response.getState();
			if(responseState === "SUCCESS") {
				let responseValue = response.getReturnValue();
				component.set("v.recordViewers", responseValue.recordViewers);
				component.set("v.sessionId", responseValue.sessionId);
			} else {
				console.error("There were some errors! 🔥")
				console.error(response);
				console.error(responseState);
				console.error(response.getReturnValue());
			}
		})

		$A.enqueueAction(action);
	},
	onCometDLoaded : function(component) {
		let cometdUrl = window.location.protocol + '//' + window.location.hostname + '/cometd/41.0/';
		let cometd = component.get("v.cometd");
		cometd.configure({
      url: cometdUrl,
      requestHeaders: { Authorization: 'OAuth ' + component.get('v.sessionId')},
      appendMessageTypeToURL : false
    });
    cometd.websocketEnabled = false;
	}
})