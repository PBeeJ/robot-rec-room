import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const Button = ({label, command, runCommand, cancelCommand}) => (
  <Pressable
    onPressIn={() => {
      console.log('onPressIn');
      runCommand(command);
    }}
    onPressOut={() => {
      console.log('onPressIn');
      cancelCommand && runCommand(cancelCommand);
    }}>
    <Text style={styles.button}>{label}</Text>
  </Pressable>
);

export default function ButtonSet({
  defaultSpeed,
  buttons,
  sendMessage,
  // sendJsonMessage,
  children,
}) {
  const [speed] = useState(defaultSpeed);

  function runCommand(command) {
    if (typeof command === 'string' && typeof sendMessage === 'function') {
      sendMessage(command);
    }
    // NOTE: We don't use this quite yet
    // if (typeof command === 'object' && typeof sendJsonMessage === 'function') {
    //   sendJsonMessage(command);
    // }
  }

  return (
    <View style={styles.container}>
      {buttons.map(({name, set, disabled}) => {
        // Do not render disabled controls (see apiButtons.js)
        if (disabled) {
          return null;
        }

        return (
          <View key={name}>
            <Text sx={{display: 'block', paddingLeft: 15}}>{name}</Text>
            {set?.map(({type, min, max, ...button}) =>
              type === 'range' ? (
                <Text key={button.command}>
                  {button.label + ' ' + speed + '%'}
                </Text>
              ) : (
                <Button
                  key={button.command}
                  runCommand={runCommand}
                  variant="go"
                  {...button}
                />
              ),
            )}
          </View>
        );
      })}
      <>{children}</>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    right: 0,
    left: 0,
    bottom: 0,
    padding: 10,
  },
  button: {
    backgroundColor: 'purple',
    padding: 8,
    marginBottom: 5,
    marginLeft: 10,
    borderRadius: 3,
    color: 'white',
    fontSize: 10,
  },
});
