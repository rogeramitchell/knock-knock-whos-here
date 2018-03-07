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
	doDestroy : function(component) {
		console.log('hi')
		let recordId = component.get("v.recordId");
		let action = component.get("c.deleteRecordViewer");

		action.setParams({
			recordId: recordId
		});

		action.setCallback(this, function(response) {
			let responseState = response.getState();
			if(responseState === "SUCCESS") {
				console.log("Success ✅");
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

    console.log(cometd);

    cometd.handshake(function(handshakeReply) {
      if (handshakeReply.successful) {
      	console.log('cometd handshake')
        var newSubscription = cometd.subscribe('/event/Record_View__e',
          function(platformEvent) {
            console.log('Platform event received: '+ JSON.stringify(platformEvent));
            // helper.onReceiveNotification(component, platformEvent);
          }
        );
        // Save subscription for later
        var subscriptions = component.get('v.cometdSubscriptions');
        subscriptions.push(newSubscription);
        component.set('v.cometdSubscriptions', subscriptions);
      }
      else
        console.error('Failed to connected to CometD.');
    });
	}
})