import React, { useState, useEffect } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import ReactNativeModal from "react-native-modal"
import { useDispatch } from "react-redux"
import { MedicineActions } from "./features/medicine"
import { boostrapNotifications, cancelAllNotification, logScheduledNotification } from "./utils"
import notifee from "@notifee/react-native"
import { DateTime } from "luxon"
import { store } from "./features/store"


const Button = (props: {onPress: ()=>void, style: any, title: string}) => {

    return (
        <Pressable onPress={props.onPress} style={props.style}>
            <Text style={styles.textStyle}>{props.title}</Text>
        </Pressable>
    )
}


type props = {
    isVisible: boolean;
    close: ()=>void;

}


const InfoModal = (props: props) => {

    const disptach = useDispatch();
    const [text, setText] = useState("");

    useEffect(()=>{
        showScheduled()
    }, [])

    const cancelScheduled = async () => {
        await cancelAllNotification()
        showScheduled()
    }

    const resetState = () => {
        disptach(MedicineActions.reset())
    }

    const logStore = () => {
        setText(JSON.stringify(store.getState()))
    };
    

    const showScheduled = async () => {
        var data = "";
        const ids = await notifee.getTriggerNotifications();
        ids.forEach((notification, index)=>{
            data += `${index}: ${notification.notification.id}\nScheduled for: ${DateTime.fromMillis(notification.trigger.timestamp).toString()}\n\n`;
        })        
        setText(data)
    }

    return(
        <ReactNativeModal
            isVisible={props.isVisible}
            onBackButtonPress={props.close}
            style={{
                margin: 0
            }}
            onModalShow={showScheduled}
        >
            <View style={styles.container}>
                <View style={styles.buttonView}>
                    <Button
                        title="cancel scheduled"
                        onPress={cancelScheduled}
                        style={styles.buttonStyle}
                    />
                    <Button 
                        title="Reset state"
                        onPress={resetState}
                        style={styles.buttonStyle}
                    />
                    <Button 
                        title="logStore  "
                        onPress={logStore}
                        style={styles.buttonStyle}
                    />
                    
                </View>
                <Text style={styles.infoText}>
                    {text}
                </Text>
                <Button 
                        title="bootstrap notifications"
                        onPress={async()=>{
                            await boostrapNotifications()
                            showScheduled()
                        }}
                        style={styles.bootstrapStyle}
                    />
            </View>
        </ReactNativeModal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "75%",
        backgroundColor: "white",
        position: "absolute",
        left: 0,
        right: 0, 
        bottom: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: "space-around"
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
    },
    buttonStyle: {
        borderWidth: 2,
        borderRadius: 25,
        paddingHorizontal: 5
    },
    textStyle: {
        textAlign: "center",
        textAlignVertical: "center"
    },
    infoText: {
        backgroundColor: "lightgrey",
        height: "65%",
        marginHorizontal: 25,
        borderRadius: 25,
        padding: 10
    },
    bootstrapStyle: {
        marginHorizontal:35,
        borderRadius: 35,
        borderWidth: 2,
        height: 35
    }
})

export default InfoModal;