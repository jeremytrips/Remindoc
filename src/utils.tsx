import notifee, {TimestampTrigger, TriggerType} from "@notifee/react-native";
import { DateTime } from "luxon";

export const cancelAllNotification = async () => {
    await notifee.cancelAllNotifications();
    console.log("Every notification have been canceled.");
}

export const logScheduledNotification = async () => {
    notifee.getTriggerNotificationIds().then(ids => console.log('All trigger notifications: ', ids));
}

export const scheduleNotification = async (hour: string) => {
    const temp = DateTime.fromFormat(hour, "HH:mm");
    const scheduled =  temp.plus({day: 1})
    console.log("Notification scheduled at "+scheduled.toString());
    
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    
    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: scheduled.toMillis(), // fire at 11:10am (10 minutes before meeting)
    };
    await notifee.createTriggerNotification(
        {
            title: "You need to take your medicine",
            body: "You idiot",
            android: {
                channelId: 'default',
            },
        },
        trigger,
    );        
  
}

export const boostrapNotifications = async ()=>{
    const notifications = await notifee.getTriggerNotifications()
    if (notifications.length !== 2){
        const morning = DateTime.fromFormat("08:00", "HH:mm");
        const evening = DateTime.fromFormat("20:00", "HH:mm");
        var morningScheduled;
        if(DateTime.now().toMillis()<morning.toMillis()){
            console.log("create morning today");
            morningScheduled = morning;
            
        } else {
            console.log("create morning tomorow");
            morningScheduled = morning.plus({day: 1});

        }
        var eveningScheduled;
        if (DateTime.now().toMillis()<evening.toMillis()){
            console.log("create evening");
            eveningScheduled = evening;
            
        } else {
            console.log("create evening tomorow");
            eveningScheduled = evening.plus({day: 1})
            
        }
        
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });
    
        
        const morningTrigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: morningScheduled.toMillis(), // fire at 11:10am (10 minutes before meeting)
        };
        await notifee.createTriggerNotification(
            {
                title: "You need to take your medicine",
                body: "You idiot",
                android: {
                    channelId: 'default',
                },
            },
            morningTrigger,
        );
        
        const eveningTrigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: eveningScheduled.toMillis(), // fire at 11:10am (10 minutes before meeting)
        };
        await notifee.createTriggerNotification(
            {
                title: "You need to take your medicine",
                body: "You idiot",
                android: {
                    channelId: 'default',
                },
            },
            eveningTrigger,
        );
    }

}