import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Birthday(props) {
  const {birthday, deleteBirthday} = props;

  const pasat = birthday.days > 0 ? true : false;

  const infoDay = () => {
    if (birthday.days === 0) {
      return <Text style={{color: '#fff'}}>Es su cumpleaños</Text>;
    } else {
      const days = -birthday.days;
      return (
        <View style={styles.textCurrent}>
          <Text style={{color: '#000'}}>{days}</Text>
          <Text style={{color: '#000'}}>{days === 1 ? 'Día' : 'Días'}</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        pasat
          ? styles.pasat
          : birthday.days === 0
          ? styles.actual
          : styles.current,
      ]}
      onPress={() => deleteBirthday(birthday)}>
      <Text style={styles.userName}>
        {birthday.name} {birthday.lastname}
      </Text>
      {pasat ? <Text style={{color: '#fff'}}>Pasado</Text> : infoDay()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  pasat: {
    backgroundColor: '#820000',
  },
  current: {
    backgroundColor: '#1ae1f2',
  },
  actual: {
    backgroundColor: '#559204',
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
  textCurrent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
