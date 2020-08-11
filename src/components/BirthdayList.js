import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert
} from 'react-native';
import ActionBar from './ActionBar';
import moment from 'moment';
import AddBirthday from './AddBirthday';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import Birthday from './Birthday';
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function BirthdayList(props) {
  const {user} = props;
  const [showList, setShowList] = useState(true);
  const [birthday, setBirthday] = useState([]);
  const [pastBirthday, setPastBirthday] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    setBirthday([]);
    setPastBirthday([]);
    db.collection(user.uid)
      .orderBy('dateBirth', 'asc')
      .get()
      .then((response) => {
        const itemArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemArray.push(data);
        });
        formatBirthdayList(itemArray);
      });
    setReloadData(false);
  }, [reloadData]);

  const formatBirthdayList = (items) => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const tempArrayData = [];
    const tempPastArrayData = [];

    items.forEach((item) => {
      const dateBorn = new Date(item.dateBirth.seconds * 1000);
      const dateBirthday = moment(dateBorn);
      const currentYear = moment().get('year');
      dateBirthday.set({year: currentYear});

      const diffDate = currentDate.diff(dateBirthday, 'days');
      const itemTemp = item;
      itemTemp.dateBirth = dateBirthday;
      itemTemp.days = diffDate;

      if (diffDate <= 0) {
        tempArrayData.push(itemTemp);
      } else {
        tempPastArrayData.push(itemTemp);
      }
    });
    setBirthday(tempArrayData);
    setPastBirthday(tempPastArrayData);
  };

  const deleteBirthday =(birthday) =>{
    Alert.alert(
      "Eliminar cumpleaños"
      , `Estas a punto de eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}, quieres continuar?`
      , [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Eliminar",
            onPress: ()=>{
              db.collection(user.uid)
              .doc(birthday.id)
              .delete()
              .then(()=>{
                setReloadData();
              })
            }
          }
        ],
        {cancelable : false}
    )
  }

  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.scrollView}>
          {birthday.map((item, index) => (
            <Birthday key={index} birthday={item} deleteBirthday = {deleteBirthday}/>
          ))}
          {pastBirthday.map((item, index) => (
            <Birthday key={index} birthday={item} deleteBirthday = {deleteBirthday}/>
          ))}
        </ScrollView>
      ) : (
        <AddBirthday
          user={user}
          setShowList={setShowList}
          setReloadData={setReloadData}
        />
      )}

      <ActionBar showList={showList} setShowList={setShowList} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  scrollView: {
    marginBottom: 50,
    width: '100%',
  },
});
