import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BarProgress({ progress }) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 2000,
      useNativeDriver: false, 
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'], 
              }),
            },
          ]}
        >
          <LinearGradient
            colors={['#7A1A1A', '#A72B2B', '#D83C3C', '#B82E1F']}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 0 }} 
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      </View>
      <View style={styles.textBack}>
        <Text style={styles.text}>{`${progress}%`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 30,
    backgroundColor: 'ivory',
    borderRadius: 30,
    overflow: 'hidden', 
    borderColor: "#696969",
    borderWidth: 3,
  },
  progressBar: {
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center', 
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    color: 'ivory', 
    fontWeight: 'bold',
    padding: 10,
    borderColor: "ivory",
  },
  textBack: {
    backgroundColor: "black",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "red",
    margin: 10,
  },
});
