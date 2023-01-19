import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';
import {firebase} from './src/utils/firebase';
import {getAuth} from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getAuth(firebase).onAuthStateChanged(res => {
      setUser(res);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.backgroud}>
        {user ? <ListBirthday user={user} /> : <Auth />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  backgroud: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
