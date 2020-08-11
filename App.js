import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  YellowBox
} from 'react-native';
import {decode, encode} from 'base-64';
import Auth from './src/components/Auth';
import BirthdayList from "./src/components/BirthdayList";
import firebase from "./src/utils/firebase";
import "firebase/auth";

if(!global.btoa)global.btoa = encode;
if (!global.atob)global.atob= decode;
YellowBox.ignoreWarnings(["Setting a timer for a long period of time"]);

export default function App(){
  //Hook de estado para saber si el estado esta logeado
  const[user, setUser] = useState(undefined);

  //Hook de efecto que actualiza segun los cambios en el estado del user
  useEffect(() => {
    firebase.auth().onAuthStateChanged((response)=> {
      setUser(response);
    });
  }, [])

  if( user === undefined ) return null;
  return (
    <>
      <StatusBar barStyle = 'ligth-content'/>
      <SafeAreaView style = {styles.background}>
      {user ? <BirthdayList user = {user} /> : <Auth/>}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor:"#15212b",
    height: "100%",
  },
});

