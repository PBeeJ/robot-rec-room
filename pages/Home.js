import React, { useEffect } from 'react';
import {StyleSheet, Text, View, TextInput, Pressable, Animated, Easing} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {PlusCircle, Umbrella} from 'react-native-feather';

// TODO: wait for socket to reconnect before allowing access to controls route

export default function Home({IPAddress,
  setIPAddress,
  options,
  setOptions,
  isConnected,
  setIsConnected,
  isOnline
}) {
  const spinValue = new Animated.Value(0);
  const [newAddress, setNewAddress] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear, // Easing is an additional import from react-native
          useNativeDriver: true  // To make use of native driver for performance
        }
      ),
      {
        iterations: 10
      }
    ).start()
  }, [spinValue])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  function addNewAddress() {
    setOptions(opt => [...opt, {name: newName, address: newAddress}]);
    setNewAddress('');
    setNewName('');
    setIPAddress(newAddress);
  }

  function removeAddress(address) {
    setOptions(opt => opt.filter(o => o.address !== address));
    if (address === IPAddress) {
      setIPAddress(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a robot</Text>
      <View style={styles.buttonWrapper}>
        {options?.map(({name, address}) => {
          return (
              <Pressable
                style={[
                  styles.buttonItem,
                  IPAddress === address && styles.buttonItemActive                  
                ]}
                onPressIn={() => {
                  isOnline && setIsConnected(false)
                }}
                onPressOut={() => {
                  setIPAddress(address === IPAddress ? null : address)
                }}
                key={`${name} (${address})`}           
              >
                <Text style={[
                  styles.buttonTitle,
                  IPAddress === address && isConnected && styles.titleConnected
                ]}>{name}</Text>
                <Text style={styles.buttonSubtitle}>{address}</Text>
                <Pressable 
                  style={styles.closeContainer}
                  hitSlop={10}
                  onPressOut={() => removeAddress(address)}
                >
                  <Text style={styles.closeText}>x</Text>
                </Pressable>
              </Pressable>
          );
        })}
      </View>
      <Text style={styles.title}>Add a new robot</Text>
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
          onPressOut={addNewAddress}>
          <PlusCircle
            stroke={'white'}
            width={30}
            height={30}
            style={styles.icon}
          />
        </Pressable>
      </View>
      {isConnected === null && (
        <View style={styles.loading}>
          <Animated.View style={{transform: [{rotate: spin}] }}>
            <Umbrella
              stroke={'white'}
              width={100}
              height={100}
              style={styles.icon}
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
  },
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 100,
    height: 80,
    borderRadius: 3,
    marginRight: 20,
  },
  buttonItemActive: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  closeContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  closeText: {
    color: 'white',
    lineHeight: 16,
    fontWeight: '700',
    fontSize: 16
  },
  buttonTitle: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 2
  },
  buttonSubtitle: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 10,
    fontWeight: '800'
  },
  title: {
    color: 'white',
    marginBottom: 10,
    marginTop: 30,
  },
  titleConnected: {
    color: 'green',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 160,
    height: 40,
    marginRight: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    padding: 10,
  },
  loading: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:  'rgba(0,0,0,0.5)',
    zIndex: 3
  }
});
