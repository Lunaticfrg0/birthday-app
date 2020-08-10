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
import Auth from './src/components/Auth';
import firebase from "./src/utils/firebase";
import "firebase/auth";


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
      {user ? <Logout/> : <Auth/>}
      </SafeAreaView>
    </>
  );
};

function Logout(){
  const logout = () =>{
    firebase.auth().signOut();
  }
  return(
    <View>
      <Text>Estas logueado</Text>
      <Button title = "Cerrar sesion" onPress = {logout}/>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor:"#15212b",
    height: "100%",
  },
});

