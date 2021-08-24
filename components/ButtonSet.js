import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';

const Button = ({label, command, description, runCommand, cancelCommand}) => (
  <Pressable
    onPressIn={() => runCommand(command)}
    onPressOut={() => cancelCommand && runCommand(cancelCommand)}>
    <Text key={label} title={description} style={styles.button}>
      {label}
    </Text>
  </Pressable>
);

export default function ButtonSet({
  defaultSpeed,
  buttons,
  sendMessage,
  sendJsonMessage,
}) {
  const [speed] = useState(defaultSpeed);

  function runCommand(command) {
    if (typeof command === 'string') {
      sendMessage(command);
    }
    if (typeof command === 'object') {
      sendJsonMessage(command);
    }
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexWrap: 'wrap',
    right: 0,
    top: 0,
    bottom: 0,
    padding: 10,
  },
  button: {
    marginBottom: 5,
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'aqua',
    borderRadius: 5,
  },
});
