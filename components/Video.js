import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default function Video({url, width, height}) {
  function formatHtml() {
    return (
      '<html style="pointer-events:none"><body style="pointer-events:none"><img src="' +
      url +
      '" width="100%" style="pointer-events:none; min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>'
    );
  }

  return (
    <WebView
      style={styles.container}
      automaticallyAdjustContentInsets={true}
      scalesPageToFit={true}
      startInLoadingState={false}
      contentInset={{top: 0, right: 0, left: 0, bottom: 0}}
      scrollEnabled={false}
      source={{html: formatHtml(), baseUrl: '/'}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    opacity: 0.4,
    left: '20%',
    width: 200,
    height: 100,
    zIndex: 1,
    backgroundColor: 'green',
  },
});
