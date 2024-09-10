import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarProgress from '../Components/BarProgress';
export default function VoiceScreen({ completeScreenGo }) {
  const conversationModes = [
    { name: 'Casual', icon: 'smile-o' },
    { name: 'Professional', icon: 'briefcase' },
    { name: 'Romantic', icon: 'heart' },
    { name: 'Friendly', icon: 'handshake-o' },
    { name: 'Formal', icon: 'handshake-o' },
    { name: 'Supportive', icon: 'thumbs-up' },
    { name: 'Inspirational', icon: 'lightbulb-o' },
    { name: 'Persuasive', icon: 'bullhorn' },
    { name: 'Informative', icon: 'info-circle' },
    { name: 'Motivational', icon: 'star' }
  ];

  const [selectedModes, setSelectedModes] = useState([]);
  const animations = useRef(conversationModes.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(100, 
      conversationModes.map((_, i) => 
        Animated.timing(animations[i], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          delay: i * 100
        })
      )
    ).start();
  }, []);

  const toggleMode = (mode) => {
    setSelectedModes((prevSelected) => {
      if (prevSelected.includes(mode)) {
        return prevSelected.filter((item) => item !== mode);
      } else {
        return [...prevSelected, mode];
      }
    });
  };

  const getButtonAnimation = (index) => {
    const isLeft = index % 2 === 0;
    const direction = isLeft ? 1 : -1;

    return {
      transform: [
        {
          translateX: animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [direction * 100, 0],
          }),
        },
      ],
      opacity: animations[index], 
    };
  };

  const handleVoice = async () => {
    try {
      const response = await axios.post('http://localhost:3000/voice-post', {
        selectedModes: selectedModes
      });
      if (response.status === 200) {
        completeScreenGo()
      }
    } catch (error) {
      completeScreenGo()
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BarProgress progress={80}></BarProgress>
      <Text style={styles.title}>Select Your Conversation Modes:</Text>
      <View style={styles.grid}>
        {conversationModes.map(({ name, icon }, index) => (
          <Animated.View key={name} style={[styles.buttonContainer, getButtonAnimation(index)]}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedModes.includes(name) && styles.buttonSelected
              ]}
              onPress={() => toggleMode(name)}
            >
              <Icon name={icon} size={30} color={selectedModes.includes(name) ? '#fff' : '#f8f8f8'} />
              <Text
                style={[
                  styles.buttonText,
                  selectedModes.includes(name) && styles.buttonTextSelected
                ]}
              >
                {name}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <TouchableOpacity style={styles.buttonD} onPress={handleVoice}>
        <Text style={styles.textD}>Done</Text>
      </TouchableOpacity>
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedTitle}>Selected Modes:</Text>
        {selectedModes.length > 0 ? (
          selectedModes.map((mode) => (
            <Text key={mode} style={styles.selectedText}>
              {mode}
            </Text>
          ))
        ) : (
          <Text style={styles.selectedText}>No modes selected</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  buttonD: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  textD: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '48%',
  },
  button: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff3d00',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonSelected: {
    backgroundColor: '#1c1b22',
    borderColor: 'rgba(0,0,0,.1)',
  },
  buttonText: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
    color: '#fff',
  },
  buttonTextSelected: {
    color: '#fff',
  },
  selectedContainer: {
    marginTop: 20,
  },
  selectedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'ivory',
  },
  selectedText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#666',
  },
});
