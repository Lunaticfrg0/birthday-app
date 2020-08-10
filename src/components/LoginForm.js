import React, {useState, useEffect}from 'react';
import {StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput} from 'react-native';
    import { validateEmail } from "../utils/validation";
    import firebase from "../utils/firebase";

export default function LoginForm(props){

    const {changeForm} = props;
    const [formData, setFormData] = useState(defaultValue);
    const [formErrors, setFormErrors] = useState({});

    const login = () =>{
        let error = {};

        if(!formData.email || !formData.password){
            if (!formData.email) error.email = true;
            if (!formData.password) error.password = true;
        }
        else if (!validateEmail(formData.email)){
            error.email = true;
        }
        else{
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .catch(() =>{
                setFormErrors({
                    email: true,
                    password: true
                })
            });
        }
        //setFormErrors cambiara el estado de formErrors con los valores de los errores en errors
        setFormErrors(error);
    }
    //Metodo que cada vez que hay un cambio en el TextInput lo guarda en formData
    const onChange = (e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text});
    }

    return(
        <>
            <TextInput 
                style = {[styles.input, formErrors.email && styles.inputError]}
                placeholder = "Correo electronico"
                placeholderTextColor = "#969696"
                onChange = {(e) => onChange(e, "email")}
            />
            <TextInput 
                style = {[styles.input, formErrors.password && styles.inputError]}
                placeholder = "Contraseña"
                placeholderTextColor = "#969696"
                secureTextEntry = {true}
                onChange = {(e) => onChange(e, "password")}

            />

            <TouchableOpacity onPress = {login}>
            <Text style={styles.btnText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <View style = {styles.registerbtn}>
            <TouchableOpacity onPress = {changeForm}>
            <Text style={styles.btnText} >Registrarse</Text>
            </TouchableOpacity> 
            </View>
            
        </>
    );
}
function defaultValue(){
        return{
            email: "",
            password: "",
        }
};
const styles = StyleSheet.create({
    btnText:{
        color: "#fff",
        fontSize: 18,
    },
    input:{
        height: 50,
        color: "#fff",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040",
    },
    registerbtn:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 25,
    },
    inputError:{
        borderColor:"#940c0c"
    }
})