import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  View,
  Button,
} from 'react-native';
import Auth from './src/components/Auth';

import firebase from './src/utils/firebase';
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
        {user ? <Logout /> : <Auth />}
      </SafeAreaView>
    </>
  );
}

function Logout() {
  const logout = () => {
    getAuth(firebase).signOut();
  };

  return (
    <View>
      <Text>Estas logeado</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroud: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
