/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the Redux TypeScript template
 * https://github.com/rahsheen/react-native-template-redux-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    FlatList,
    Pressable,
    Image,
    Modal,
    
} from 'react-native';

import { DateTime } from "luxon";

import notifee, { TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import { cancelAllNotification, logScheduledNotification, scheduleNotification } from './src/utils';
import { Imedicine, MedicineActions, selecteMedicine } from './src/features/medicine';
import { useDispatch, useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";
import { store } from './src/features/store';
import InfoModal from './src/modal';


const MedicineItem = (props: {medicine: Imedicine}) =>{
    const dispatch = useDispatch();

    const setTaken = () => {
        dispatch(MedicineActions.setTaken(props.medicine.id))
    }

    useEffect(()=>{
    }, [])

    return (
        <Pressable style={styles.ItemContainer} onPress={setTaken}>
            <View>
                <Text style={styles.periodTextStyle}>Période: {props.medicine.perdiod}</Text>
                <Text style={styles.lastTakenTextStyle}>
                    Dernière prise {DateTime.fromMillis(props.medicine.takenHour).toLocal().toFormat("dd LLL HH:mm")}
                </Text>
            </View>
            <Icon
                name={props.medicine.taken?"check":"times"}
                style={styles.iconStyle}
                size={33}
            />
        </Pressable>
    )
}

const App = () => {

    const medicines = useSelector(selecteMedicine);
    const state = store.getState()
    const disptach = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(()=>{
        disptach(MedicineActions.update());
    }, [])


    const test = async () => {
        const scheduled = DateTime.fromFormat("20:00", "HH:mm")
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


    return (
        <View style={styles.container}>
            <Image
                source={require("./assets/logo.png")}
                style={styles.logo}
            />
            <View style={styles.flatListStyle}>
                {
                    medicines.map((value)=>(
                        <MedicineItem medicine={value} key={value.id}/>
                    ))
                }
            </View>

            <Pressable onPress={()=>{ setModalIsOpen(true)}}>
                <Text style={styles.lastUpdateText}>
                    Last update: {DateTime.fromMillis(state.medicine.lastUpdate).toFormat("dd LLL HH:mm")}
                </Text>
            </Pressable>
            <InfoModal
                isVisible={modalIsOpen}
                close={()=>{setModalIsOpen(false)}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        height: 350,
        backgroundColor: "transparent"
    },
    container: {
        backgroundColor: "#6362a7",
        flex: 1,
        justifyContent: 'space-between'
    },
    flatListStyle: {
        paddingHorizontal: 15,
        // alignContent: "center"
    },
    periodTextStyle: {
        fontWeight: "bold",
        color: "white",
        fontSize: 18
    },
    lastTakenTextStyle: {
        // fontWeight: "bold",
        color: "white",
    },
    ItemContainer: {
        backgroundColor: "#94B0DA",
        height: 65,
        borderRadius: 25,
        marginTop: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20
    },
    iconStyle: {
        position: "absolute",
        right: 25
    },
    lastUpdateText: {
        textAlign: "center",
        color: "#545190",
        marginBottom: 15
    },
    logo:{
        alignSelf: "center"
    }
});

export default App;
