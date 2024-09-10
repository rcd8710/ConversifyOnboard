import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarProgress from '../Components/BarProgress';
const focusAreas = [
  { name: 'Social', icon: 'users' },
  { name: 'Academic', icon: 'graduation-cap' },
  { name: 'Professional', icon: 'briefcase' },
  { name: 'Public Speaking', icon: 'bullhorn' },
  { name: 'Personal Development', icon: 'user-circle' },
  { name: 'Negotiation', icon: 'handshake-o' },
  { name: 'Teamwork', icon: 'users' },
  { name: 'Creativity', icon: 'paint-brush' }
];

export default function FocusScreen({ voiceScreenGo }) {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const animations = useRef(focusAreas.map(() => new Animated.Value(0))).current; 
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

  useEffect(() => {
    const animationsIn = focusAreas.map((_, index) =>
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay: index * 100, 
      })
    );

    Animated.stagger(100, animationsIn).start(); 
  }, []);

  const toggleFocusArea = (area) => {
    setSelectedAreas((prevSelected) => {
      if (prevSelected.includes(area)) {
        return prevSelected.filter((item) => item !== area);
      } else {
        return [...prevSelected, area];
      }
    });
  };

  const handleFocus = async () => {
   try {
      const response = await axios.post('http://localhost:3000/focus-post', {
        focusAreas: selectedAreas
      });
      if (response.status === 200) {
        voiceScreenGo()
      }
    } catch (error) {
      voiceScreenGo()
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BarProgress progress={60}></BarProgress>
      <Animated.Text style={[styles.title, { opacity: fadeAnimTitle }]}>Select Your Focus Areas:</Animated.Text>
      <View style={styles.grid}>
        {focusAreas.map(({ name, icon }, index) => {
          const isLeft = index % 2 === 0;
          const translateX = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [isLeft ? -300 : 300, 0], 
          });

          return (
            <Animated.View key={name} style={{ transform: [{ translateX }], width: '48%', marginBottom: 10 }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedAreas.includes(name) && styles.buttonSelected
                ]}
                onPress={() => toggleFocusArea(name)}
              >
                <Icon name={icon} size={30} color='#fff' />
                <Text
                  style={[
                    styles.buttonText,
                    selectedAreas.includes(name) && styles.buttonTextSelected
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
      <View style={styles.selectedContainer}>
        <TouchableOpacity style={styles.buttonD} onPress={handleFocus}>
          <Animated.Text style={[styles.buttonTextD, {opacity:fadeAnimSubtitle}]}>Done</Animated.Text>
        </TouchableOpacity>
        <Animated.Text style={[styles.selectedTitle, {opacity:fadeAnimSubtitle}]}>Selected areas:</Animated.Text>
        {selectedAreas.length > 0 ? (
          selectedAreas.map((area) => (
            <Text key={area} style={styles.selectedText}>
              {area}
            </Text>
          ))
        ) : (
          <Text style={styles.selectedText}>No areas selected</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    shadowOffset: { width: 5, height: 2 }, 
    shadowOpacity: 2,        
  },
  buttonTextD: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff3d00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonSelected: {
    backgroundColor: '#1c1b22',
    borderColor: 'rgba(0,0,0,.1)',
  },
  buttonText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    color: 'white',
  },
  buttonTextSelected: {
    color: '#fff',
  },
  selectedContainer: {
    marginTop: 20,
  },
  selectedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'ivory',
  },
  selectedText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#666',
  },
});
