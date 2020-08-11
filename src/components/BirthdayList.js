import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import ActionBar from "./ActionBar";
import AddBirthday from "./AddBirthday";

export default function BirthdayList(){
    const [showList, setShowList] = useState(true);
    return(
        <View style = {styles.container}>
            {showList ? (
            <>
            <Text> Hola Mundo!</Text>
            <Text> Hola Mundo!</Text>
            <Text> Hola Mundo!</Text>
            <Text> Hola Mundo!</Text>
            <Text> Hola Mundo!</Text>
            <Text> Hola Mundo!</Text>
            </>
            ): <AddBirthday/>
            }

            <ActionBar showList = {showList} setShowList = {setShowList}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        height: '100%'
    }
});