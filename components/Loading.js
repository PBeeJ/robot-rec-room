import React from 'react';
import {StyleSheet, Text, ActivityIndicator} from 'react-native';

export default function Loading({message}) {
  return (
    <>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.text}>{message}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
});
