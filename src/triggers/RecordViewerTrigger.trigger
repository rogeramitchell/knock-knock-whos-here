trigger RecordViewerTrigger on Record_Viewer__c (after insert, after delete)
{
	if(Trigger.isAfter && Trigger.isInsert)
	{
		RecordViewerTriggerHandler.handleAfterInsert(Trigger.newMap);
	}
	else if(Trigger.isAfter && Trigger.isDelete)
	{
		RecordViewerTriggerHandler.handleAfterDelete(Trigger.oldMap);
	}
}