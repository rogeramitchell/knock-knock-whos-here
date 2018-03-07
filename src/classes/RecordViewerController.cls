public class RecordViewerController
{
	@AuraEnabled
	public static List<User> handleInit(Id recordId)
	{
		// insert a record into Record Viewer object for current user
		insertRecordViewer(recordId);

		// get collection of Record Viewers for this object
		List<User> records = getRecordViewers(recordId);

		return records;
	}

	@AuraEnabled
	public static void deleteRecordViewer(Id recordId)
	{
		List<Record_Viewer__c> records = [SELECT Id FROM Record_Viewer__c WHERE Record_ID__c = :recordId AND OwnerId = :UserInfo.getUserId()];

		delete records;
	}
	
	private static List<User> getRecordViewers(Id recordId)
	{
		Set<Id> userIds = new Set<Id>();

		for(Record_Viewer__c record : [SELECT Id, OwnerId FROM Record_Viewer__c WHERE Record_ID__c = :recordId])
		{
			userIds.add(record.OwnerId);
		}

		List<User> users = [SELECT Id, Name, SmallPhotoUrl FROM User WHERE Id = :userIds ORDER BY Name ASC];

		return users;
	}

	private static void insertRecordViewer(Id recordId)
	{
		Record_Viewer__c record = new Record_Viewer__c();
		record.Record_ID__c = recordId;
		insert record;
	}
}