import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';
import Birthday from './Birthday';
import {
  collection,
  initializeFirestore,
  orderBy,
  getDocs,
  query,
  doc,
  deleteDoc,
  documentId,
  getDoc,
  getDocFromServer,
} from 'firebase/firestore';
import moment from 'moment';
import {firebase} from '../utils/firebase';

const db = initializeFirestore(firebase, {
  experimentalAutoDetectLongPolling: true,
});

export default function ListBirthday(props) {
  const {user} = props;
  const [showList, setShowList] = useState(true);
  const [birthday, setBirthday] = useState([]);
  const [pasatBirthday, setPasatBirthday] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    setBirthday([]);
    setPasatBirthday([]);
    const consulta = query(
      collection(db, user.uid),
      orderBy('dateBirth', 'asc'),
    );
    getDocs(consulta).then(res => {
      const itemsArray = [];
      res.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        itemsArray.push(data);
      });
      formatData(itemsArray);
    });
    setReloadData(false);
  }, [reloadData]);

  const formatData = items => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const birthdayTempArray = [];
    const pasatBirthdayTempArray = [];

    items.forEach(item => {
      const dateBirth = new Date(item.dateBirth.seconds * 1000);
      const dateBirthday = moment(dateBirth);
      const currentYear = moment().get('year');
      dateBirthday.set({year: currentYear});

      const diffDate = currentDate.diff(dateBirthday, 'days');
      const itemTemp = item;
      itemTemp.dateBirth = dateBirthday;
      itemTemp.days = diffDate;

      if (diffDate <= 0) {
        birthdayTempArray.push(itemTemp);
      } else {
        pasatBirthdayTempArray.push(itemTemp);
      }
    });
    setBirthday(birthdayTempArray);
    setPasatBirthday(pasatBirthdayTempArray);
  };

  const deleteBirthday = birthday => {
    Alert.alert(
      'Eliminar cumpleaños',
      `¿Estas seguro de eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          onPress: () => {
            deleteDoc(doc(db, user.uid, birthday.id)).then(() => {
              setReloadData(true);
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.scrollView}>
          {birthday.map((item, index) => (
            <Birthday
              key={index}
              birthday={item}
              deleteBirthday={deleteBirthday}
            />
          ))}
          {pasatBirthday.map((item, index) => (
            <Birthday
              key={index}
              birthday={item}
              deleteBirthday={deleteBirthday}
            />
          ))}
        </ScrollView>
      ) : (
        <AddBirthday
          user={user}
          setReloadData={setReloadData}
          setShowList={setShowList}
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
