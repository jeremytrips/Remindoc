import notifee from "@notifee/react-native";

export const cancelAllNotification = async () => {
    await notifee.cancelAllNotifications();
    console.log("Every notification have been canceled.");
}

export const logScheduledNotification = async () => {
    notifee.getTriggerNotificationIds().then(ids => console.log('All trigger notifications: ', ids));
}