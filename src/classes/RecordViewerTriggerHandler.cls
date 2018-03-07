public class RecordViewerTriggerHandler
{
	public static void handleAfterInsert(Map<Id, Record_Viewer__c> newMap)
	{
		dispatchRecordViewEvents(newMap, 'NEW_VIEW');
	}

	public static void handleAfterDelete(Map<Id, Record_Viewer__c> oldMap)
	{
		dispatchRecordViewEvents(oldMap, 'DELETE');
	}

	private static void dispatchRecordViewEvents(Map<Id, Record_Viewer__c> records, String viewType)
	{
		// create collection of platform events, will dispatch later
		List<Record_View__e> events = new List<Record_View__e>();

		// iterate over records, build events, add to collection
		for(Record_Viewer__c record : records.values())
		{
			Record_View__e event = createEvent(record, viewType);
			events.add(event);
		}

		// dispatch these events
		EventBus.publish(events);
	}

	private static Record_View__e createEvent(Record_Viewer__c record, String viewType)
	{
		Record_View__e event = new Record_View__e();
		event.Record_ID__c = record.Id;
		event.User_ID__c = record.OwnerId;
		event.Type__c = viewType;
		return event;
	}
}