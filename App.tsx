/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the Redux TypeScript template
 * https://github.com/rahsheen/react-native-template-redux-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    
} from 'react-native';

import { DateTime } from "luxon";

import notifee, { TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import { cancelAllNotification, logScheduledNotification } from './src/utils';

const App = () => {

    const createNotif = async () => {
        const now = DateTime.now()
        const scheduled = now.plus({minute: 1})
        console.log("Notification scheduled at "+scheduled.toString());
        
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: scheduled.toMillis(), // fire at 11:10am (10 minutes before meeting)
            repeatFrequency: RepeatFrequency.DAILY
        };
        const temp = await notifee.createTriggerNotification(
            {
                title: 'Meeting with Jane',
                body: scheduled.toString(),
                android: {
                    channelId: 'default',
                },
            },
            trigger,
        );        
      
    }
    
    useEffect(()=>{        
        console.log(DateTime.now().toMillis());
        notifee.getTriggerNotificationIds().then(ids => console.log('All trigger notifications: ', ids));
    }, [])

    return (
        <View>
            <Text>Bite</Text>
            <Button
                title="Click"
                onPress={createNotif}
            />
            <Button
                title="Cancel notifications"
                onPress={cancelAllNotification}
            />
            <Button 
                title="Log scheduled notification"
                onPress={logScheduledNotification}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  
});

export default App;
