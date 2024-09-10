import React, { useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Animated, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarProgress from '../Components/BarProgress';
const CompleteScreen = () => {
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
      <BarProgress progress={100}></BarProgress>
      <Animated.Text style={[styles.title, { opacity: fadeAnimTitle }]}>
      You’re all set! Get ready to master conversations
      </Animated.Text>
      <TouchableOpacity
        style={styles.startedButtonStyle}
      >
        <Text style={styles.buttonText}>Start practicing
        </Text>
        <Icon name="arrow-right" size={15} color="white" style={{ marginLeft: 10 }} />
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
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 1,
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
});

export default CompleteScreen;
