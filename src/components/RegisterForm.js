import React, {useState, useEffect}from 'react';
import {StyleSheet, 
     Text, 
     TouchableOpacity, 
     TextInput, 
     View} from 'react-native';
     import firebase from "../utils/firebase";
     import { validateEmail } from "../utils/validation";

export default function RegisterForm(props){

    //pase de informacion desde Auth
    const {changeForm} = props;
    //Estado que guarda y cambia los valores de los inputs
    const [formData, setFormData] = useState(defaultValue());
    //Estado que guarda y cambia los valores de los errores
    const [formError, setFromError] = useState({});

    const registering = () =>{
        //nos permite llevar constancia de que inputs les falta valor
        let error = {} ;
        //si uno de los campos esta vacio === null
        //Ira asignando como true a error.x para asignarle el color de error al input
        if (!formData.email || !formData.password || !formData.repeatedpassword){
            if (!formData.email) error.email = true;
            if (!formData.password) error.password = true;
            if (!formData.repeatedpassword) error.repeatedpassword = true;
        }
        //Valida si el email esta correcto ex: emilio@hotmail.com === true
        else if (!validateEmail(formData.email)){
            error.email = true;
        } 
        else if (formData.password !== formData.repeatedpassword){
            error.password = true;
            error.repeatedpassword = true;
        }
        else if (formData.password.length <= 6){
            error.password = true;
            error.repeatedpassword = true;
        } else{
            firebase.auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(()=>{
                console.log("Cuenta creada");
            }).catch(() =>{
                setFromError({
                    email: true,
                    password: true,
                    repeatedpassword: true,
                });
            });
        }
    }

    return(
        <>
            <TextInput
                // Si formError.email === true se aplica el styles.error
                style ={[styles.input, formError.email && styles.errorInput]}
                placeholder= "Correo Electronico"
                placeholderTextColor = "#969696"
                //Una vez que cambie el input activara el cambio de estado
                //setFormData hara que cambie cada propiedad del objeto formData
                onChange = {(e) => setFormData({...formData, email: e.nativeEvent.text})}
            />
            <TextInput
                style ={[styles.input, formError.password && styles.errorInput]}
                placeholder= "Contraseña"
                placeholderTextColor = "#969696"
                secureTextEntry = {true}
                onChange = {(e) => setFormData({...formData, password: e.nativeEvent.text})}

            />
            <TextInput
                style ={[styles.input, formError.repeatedpassword && styles.errorInput]}
                placeholder= "Repetir contraseña"
                placeholderTextColor = "#969696"
                secureTextEntry = {true}
                onChange = {(e) => setFormData({...formData, repeatedpassword: e.nativeEvent.text})}

            />
            <TouchableOpacity>
            <Text style={styles.btnText} onPress = {registering}>Registrarse</Text>
            </TouchableOpacity>
            
            <View style ={styles.loginbtn}>
            <TouchableOpacity>
            <Text style={styles.btnText} onPress = {changeForm}>Iniciar sesion</Text>
            </TouchableOpacity>
            </View>
           
        </>
    );
}
function defaultValue(){
    return {
        email: '',
        password: '',
        repeatedpassword: ''
    }
   
}
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
    loginbtn:{
        flex: 1,
        marginBottom: 25,
        justifyContent: "flex-end",
    },
    errorInput:{
        borderColor: '#940c0c',
    },
})