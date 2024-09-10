import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, TextInput, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarProgress from '../Components/BarProgress';
import axios from 'axios';

export default function ProfileSetupScreen({ focusPageGo }) {
  const [image, setImage] = useState(null); 

  const fadeAnimTitle = useRef(new Animated.Value(0)).current;
  const fadeAnimSubtitle = useRef(new Animated.Value(0)).current;
  const slideAnimProfile = useRef(new Animated.Value(-500)).current; 
  const fadeAnimInputs = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnimTitle, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimSubtitle, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnimProfile, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimInputs, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnimTitle, fadeAnimSubtitle, slideAnimProfile, fadeAnimInputs]);

  const generateAgeOptions = () => {
    const startAge = 12;
    const endAge = 100;
    const options = [];
    for (let i = startAge; i <= endAge; i++) {
      options.push({ label: i.toString(), value: i.toString() });
    }
    return options;
  };

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required.');
      return false;
    }
    if (!age) {
      Alert.alert('Validation Error', 'Age is required.');
      return false;
    }
    if (!gender) {
      Alert.alert('Validation Error', 'Gender is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Proceed with form submission or other actions
      focusPageGo();
    }
  };

  const handleProfile = async () => {
    try {
      const response = await axios.post('http://localhost:3000/profile-post', {
        name: name,
        age: age,
        gender: gender,
        image: image, // Include image data in the request
      });
      if (response.status === 200) {
        handleSubmit();
      }
    } catch (error) {
      handleSubmit();
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri); 
      } else {
        Alert.alert('No image selected', 'Please select an image.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the image.');
      console.error(error);
    }
  };
  

  return (
    <View style={profileStyles.main}>
      <BarProgress progress={40}></BarProgress>
      <Animated.Text style={[profileStyles.title, { opacity: fadeAnimTitle }]}>
        Profile Setup
      </Animated.Text>
      <Animated.Text style={[profileStyles.subtitle, { opacity: fadeAnimSubtitle }]}>
        Let's get to know you better
      </Animated.Text>
      <TouchableOpacity onPress={pickImage}>
        <Animated.View style={[profileStyles.profilecontainer, { transform: [{ translateY: slideAnimProfile }] }]}>
          {image ? (
            <Image source={{ uri: image }} style={profileStyles.profileImage} />
          ) : (
            <>
            <Icon name="user" size={50} color="white" />
            </>
          )}
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={{ opacity: fadeAnimInputs }}>
        <View style={profileStyles.pickerContainer}>
          <Text style={profileStyles.label}>Please add your Name:</Text>
          <TextInput
            style={profileStyles.profileInputs}
            placeholder="Name"
            placeholderTextColor="lightgrey"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={profileStyles.pickerContainer}>
          <Text style={profileStyles.label}>Select your Age:</Text>
          <RNPickerSelect
            onValueChange={(value) => setAge(value)}
            items={generateAgeOptions()}
            placeholder={{ label: 'Select your age...' }}
            style={{
              inputIOS: profileStyles.profileInputs,
              inputAndroid: profileStyles.profileInputs,
            }}
          />
        </View>
        <View style={profileStyles.pickerContainer}>
          <Text style={profileStyles.label}>Select your gender:</Text>
          <RNPickerSelect
            onValueChange={(value) => setGender(value)}
            items={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
              { label: 'Other', value: 'Other' },
            ]}
            placeholder={{ label: 'Select your gender...' }}
            style={{
              inputIOS: profileStyles.profileInputs,
              inputAndroid: profileStyles.profileInputs,
            }}
          />
        </View>
        <TouchableOpacity style={profileStyles.buttonD} onPress={handleProfile}>
          <Text style={profileStyles.textD}>Done</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const profileStyles = StyleSheet.create({
  main: {
    alignItems: 'center',
    padding: 20,
  },
  profileInputs: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 10,
    color: "white",
    width: 300,
    height: 50,
  },
  profilecontainer: {
    width: 325,
    height: 200,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 15,
  },
  textD: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    color: 'ivory',
  },
  profileImage: {
    width: '50%',
    height: '80%',
    borderRadius: 100,
    resizeMode: 'cover', // Ensures the image covers the container without stretching
  },
});
