import React, { useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Animated, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StartScreen = ({ profilePageGo }) => {
  const fadeAnimTitle = useRef(new Animated.Value(0)).current;
  const fadeAnimSubtitle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimTitle, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnimSubtitle, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimTitle, fadeAnimSubtitle]);

  return (
    <View style={styles.main}>
      <Image
        source={require('../assets/log2.png')}
        style={{ width: 200, height: 150, tintColor: 'ivory' }}
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnimTitle }]}>
        Welcome to Conversify.
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnimSubtitle }]}>
        Level up your conversation skills in just minutes
      </Animated.Text>
      
      <TouchableOpacity
        style={styles.startedButtonStyle}
        onPress={profilePageGo}
      >
        <View style={styles.buttonCover}>
        <Text style={styles.buttonText}>Get Started</Text>
        <Icon name="arrow-right" size={15} color="white" style={{ marginLeft: 10 }} />
        </View>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: 'ivory',
    margin: 20,
  },
  startedButtonStyle: {
    borderRadius: 50,
    borderColor: 'red',
    borderStyle: "dashed",
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonCover: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "grey",
  }
});

export default StartScreen;
