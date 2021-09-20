import React from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react/cjs/react.development';
import {PlusCircle} from 'react-native-feather';

// TODO: save ip address array to phone storage

// TOOD: allow people to clear their storage or delete individual items

// TODO: wait for socket to reconnect before allowing access to controls route

export default function Home({IPAddress, setIPAddress, options, setOptions}) {
  const [newAddress, setNewAddress] = useState('');
  const [newName, setNewName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a robot:</Text>
      <Picker
        selectedValue={IPAddress}
        onValueChange={value => setIPAddress(value)}
        style={styles.picker}
        mode="dropdown">
        {options.map(({name, address}) => {
          return (
            <Picker.Item
              key={`${name} (${address})`}
              label={`${name} (${address})`}
              value={address}
              style={styles.pickerItem}
            />
          );
        })}
      </Picker>
      <Text style={styles.title}>Add a new robot:</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setNewName}
          value={newName}
        />
        <TextInput
          style={styles.input}
          placeholder="IP Address"
          onChangeText={setNewAddress}
          value={newAddress}
        />
        <Pressable
          android_ripple={{
            color: 'rgba(0,0,0,0.2)',
            borderless: true,
          }}
          onPress={() => {
            setOptions(opt => [...opt, {name: newName, address: newAddress}]);
            setIPAddress(newAddress);
            setNewAddress('');
            setNewName('');
          }}>
          <PlusCircle
            stroke={'white'}
            width={30}
            height={30}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 300,
    color: 'white',
    backgroundColor: 'rgb(0,80,0)',
  },
  pickerItem: {
    color: 'rgba(255,255,255,0.8)',
    backgroundColor: 'darkgreen',
  },
  title: {
    color: 'white',
    marginBottom: 10,
    marginTop: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 160,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    padding: 10,
  },
});
