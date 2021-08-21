import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';

const Button = ({
  label, command, description, variant, runCommand, cancelCommand,
}) => (
  <Pressable 
    onPressIn={() => runCommand(command)}
    onPressOut={() => cancelCommand && runCommand(cancelCommand)}
  >
    <Text
      key={label}
      title={description}
      style={{
        marginBottom: 5,
        padding: 5,
        backgroundColor: 'aqua',
        marginBottom: 5,
        borderRadius: 5,
      }}
    >
      {label}
    </Text>
  </Pressable>
);

export default function ButtonSet({
  defaultSpeed, buttons, sendMessage, sendJsonMessage,
}) {
  const [speed, setSpeed] = useState(defaultSpeed);

  function runCommand(command) {
    if (typeof command === 'string') {
      console.log('sendMessage: ', typeof sendMessage);
      sendMessage(command);
    }
    if (typeof command === 'object') {
      sendJsonMessage(command);
    }
  }

  return (
    <View>
      {buttons.map(({
        name, set, disabled,
      }) => {
        // Do not render disabled controls (see apiButtons.js)
        if (disabled) { return null; }

        return (
          <View mb={3} key={name}>
            <Text mb={2} sx={{ display: 'block' }}>{name}</Text>
            {set?.map(({
              type, min, max, ...button
            }) => (
              type === 'range' ? (
                  <Text key={button.command}>
                    {
                      // eslint-disable-next-line prefer-template
                      button.label + ' ' + speed + '%'
                    }
                    {/* <Slider
                    defaultValue={defaultSpeed}
                    min={min}
                    max={max}
                    onChange={(e) => {
                      // TODO: add error handling here
                      // eslint-disable-next-line prefer-template
                      sendMessage(button.command + ' ' + e.target.value);
                      setSpeed(e.target.value);
                    }}
                  /> */}
                  </Text>                  
              ) : (
                <Button
                  key={button.command}
                  runCommand={runCommand}
                  variant="go"
                  {...button}
                />
              )
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    display: 'flex', 
    marginBottom: 40,
    padding: 10,
    borderRadius: 3    
  },
});
