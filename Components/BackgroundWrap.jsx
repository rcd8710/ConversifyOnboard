import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const BackgroundWrap = ({ children }) => (
  <ImageBackground
    source={require('../assets/imageData.png')} 
    style={styles.background}
  >
    {children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
});

export default BackgroundWrap;
