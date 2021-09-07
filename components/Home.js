import React from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react/cjs/react.development';
import {PlusCircle} from 'react-native-feather';

export default function Home({IPAddress, setIPAddress}) {
  const [newAddress, setNewAddress] = useState('');
  const [newName, setNewName] = useState('');
  const [options, setOptions] = useState([
    {
      name: 'Phineas',
      address: '192.168.1.10',
    },
    {
      name: 'Passable',
      address: '10.1.1.10',
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your robot:</Text>
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
            setNewAddress('');
            setNewName('');
            setIPAddress(newAddress);
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
    flex: 1,
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
    marginTop: 20,
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
