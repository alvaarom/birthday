import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {firebase} from '../utils/firebase';
import {collection, initializeFirestore, addDoc} from 'firebase/firestore';

const db = initializeFirestore(firebase, {
  experimentalAutoDetectLongPolling: true,
});

export default function AddBirthday(props) {
  const {user, setShowList, setReloadData} = props;
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});

  const hideDatePicker = () => {
    setisDatePickerVisible(false);
  };

  const handlerConfirm = date => {
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setFormData({...formData, dateBirth: dateBirth});
    hideDatePicker();
  };

  const showDatePicker = () => {
    setisDatePickerVisible(true);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const onSubmit = () => {
    let errors = {};
    if (!formData.name || !formData.lastname || !formData.dateBirth) {
      if (!formData.name) errors.name = true;
      if (!formData.lastname) errors.lastname = true;
      if (!formData.dateBirth) errors.dateBirth = true;
    } else {
      const date = formData;
      date.dateBirth.setYear(0);

      const colRef = collection(db, user.uid);
      addDoc(colRef, date)
        .then(() => {
          setReloadData(true);
          setShowList(true);
        })
        .catch(e => {
          setFormError({
            name: true,
            lastname: true,
            dateBirth: true,
          });
        });
    }
    setFormError(errors);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder="Nombre"
          placeholderTextColor={'#969696'}
          style={[styles.input, formError.name && styles.error]}
          onChange={e => {
            onChange(e, 'name');
          }}
        />
        <TextInput
          placeholder="Apellido"
          placeholderTextColor={'#969696'}
          style={[styles.input, formError.lastname && styles.error]}
          onChange={e => {
            onChange(e, 'lastname');
          }}
        />
        <View
          style={[
            styles.input,
            styles.datePicker,
            formError.dateBirth && styles.error,
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
          <Text style={styles.addButton}>Crear Cumpleaños</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={'date'}
        onConfirm={handlerConfirm}
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
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  datePicker: {
    justifyContent: 'center',
  },
  addButton: {
    fontSize: 18,
    color: '#fff',
  },
  error: {
    borderColor: '#940c0c',
  },
});
