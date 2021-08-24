import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// TODO: start the controls when you touch the screen, and reset/cancel when not touching

function Arrow({arrow}) {
  return <Icon name={arrow} size={60} color="#900" />;
}

export default function Arrows({arrows, zeroPoint}) {
  if (!zeroPoint) {
    return null;
  }

  return (
    <View mb={3} height={140} width={140} sx={styles.container}>
      <View style={styles.upDownArrows}>
        <Arrow
          arrow={
            arrows?.y === 'left'
              ? 'arrow-left-thick'
              : 'arrow-left-bold-outline'
          }
        />
        <Arrow
          arrow={
            arrows?.y === 'right'
              ? 'arrow-right-thick'
              : 'arrow-right-bold-outline'
          }
        />
      </View>
      <View style={styles.leftRightArrows}>
        <Arrow
          arrow={
            arrows?.z === 'forward' ? 'arrow-up-thick' : 'arrow-up-bold-outline'
          }
        />
        <Arrow
          arrow={
            arrows?.z === 'backward'
              ? 'arrow-down-thick'
              : 'arrow-down-bold-outline'
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  upDownArrows: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftRightArrows: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
