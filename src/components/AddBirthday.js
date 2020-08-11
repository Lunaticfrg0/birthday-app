import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ActionBar from './ActionBar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/es';
import firebase from '../utils/firebase';
import 'firebase/firestore';
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function AddBirthday() {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };
  const handleConfirm = (date) => {
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setFormData({...formData, dateBirth});
    hideDatePicker();
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };
  const onSubmit = () => {
    let error = {};
    if (!formData.name || !formData.lastname || !formData.dateBirth) {
      if (!formData.name) error.name = true;
      if (!formData.lastname) error.lastname = true;
      if (!formData.dateBirth) error.dateBirth = true;
    } else {
      const data = formData;
      data.dateBirth.setYear(0);
      db.collection('cumples')
        .add(data)
        .then(() => {
          console.log('ok');
        })
        .catch(() => {
          setFormError({name: true, lastname: true, dateBirth: true});
        });
    }
    setFormErrors(error);
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formErrors.name && {borderColor: '#940c0c'}]}
          placeholder="Nombre"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'name')}
        />
        <TextInput
          style={[
            styles.input,
            formErrors.lastname && {borderColor: '#940c0c'},
          ]}
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'lastname')}
        />
        <View
          style={[
            styles.input,
            styles.datePicker,
            formErrors.dateBirth && {borderColor: '#940c0c'},
          ]}>
          <Text
            style={{
              color: formData.dateBirth ? '#fff' : '#969696',
              fontSize: 18,
            }}
            onPress={showDatePicker}>
            {formData.dateBirth
              ? moment(formData.dateBirth).format('LL')
              : 'Fecha de nacimiento'}
          </Text>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.addBirthday}>Crear cumpleaños</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#1e3040',
  },
  datePicker: {
    justifyContent: 'center',
  },
  addBirthday: {
    fontSize: 18,
    color: '#fff',
  },
});
