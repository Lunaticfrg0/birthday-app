import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity
} from 'react-native';

export default function Birthday(props){
    const {birthday, deleteBirthday} = props;
    const past = birthday.days > 0 ? true : false;
    const empty = " ";

    const infoDay = ()=>{
        if (birthday.days === 0) {
            return (
                <Text style = {{color: "#fff"}}>Es su cumpleaños!</Text>
            )
        }
        else{
            const days = -birthday.days;
            return(
                <View style = {styles.txtCurrent}>
                    <Text>{days}</Text>
                    <Text>{days === 1 ? "Dia" : "Dias"}</Text>
                </View>
            )
        }
    }

    return(
        <TouchableOpacity 
        style = {[styles.card, past ? styles.past :birthday.days === 0 ? styles.actual: styles.current]}
        onPress = {() => deleteBirthday(birthday)}
        >
            <Text style = {styles.name}>
            {birthday.name}{empty}{birthday.lastname}
            </Text>
            {past ? <Text style = {{color: "#fff"}} >Pasado</Text> : infoDay()}
        </TouchableOpacity>
            
    );
}
const styles = StyleSheet.create({
    card:{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15,
    },
    past:{
        backgroundColor: "#820000"
    },
    current:{
        backgroundColor: "#1ae1f2"
    },
    actual:{
        backgroundColor: "#559204"
    },
    name:{
        color: "#fff",
        fontSize: 16
    },
    txtCurrent:{
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 50,
        alignItems: "center",
        justifyContent: "center",

    }
});