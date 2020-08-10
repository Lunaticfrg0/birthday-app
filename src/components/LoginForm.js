import React, {useState, useEffect}from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function LoginForm(props){

    const {changeForm} = props;

    return(
        <View>
            <Text>LoginForm</Text>
            <TouchableOpacity>
            <Text style={styles.btnText} onPress = {changeForm}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    btnText:{
        color: "#fff",
        fontSize: 18,
    }
})