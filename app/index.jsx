import React, { useEffect, useRef, useState } from 'react';
import {View,Animated} from 'react-native';
import BackgroundWrapper from '../Components/BackgroundWrap'; 
import StartScreen from '../Screens/StartScreen';
import ProfileSetupScreen from '../Screens/ProfileScreen';
import FocusScreen from '../Screens/FocusScreen';
import VoiceScreen from '../Screens/VoiceScreen';
import CompleteScreen from '../Screens/CompleteScreen';
const Page = () => {
  const [firstScreen, setFirstScreen] = useState(true);
  const [profileScreen, setProfileScreen] = useState(false);
  const [focusAreasScreen, setFocusScreen] = useState(false);
  const [voiceScreen, setVoiceScreen ] = useState(false)
  const [completeScreen, setCompleteScreen ] = useState(false)
  
  const profilePageGo = () => {
    setFirstScreen(prev => !prev)
    setProfileScreen(prev => !prev)
  }

  const focusPageGo = () => {
    setProfileScreen(prev => !prev)
    setFocusScreen(prev => !prev)
  }
  const voiceScreenGo = () => {
    setFocusScreen(prev => !prev)
    setVoiceScreen(prev => !prev)
  }
  const completeScreenGo = () => {
    setVoiceScreen(prev => !prev)
    setCompleteScreen(prev => !prev)
  }
  

  return (
    <BackgroundWrapper>
      {(() => {
        switch (true) {
          case firstScreen:
            return <StartScreen profilePageGo={profilePageGo}></StartScreen>
          case profileScreen:
            return <ProfileSetupScreen focusPageGo={focusPageGo}/>;
          case focusAreasScreen:
            return <FocusScreen voiceScreenGo={voiceScreenGo}/>;
          case voiceScreen:
            return <VoiceScreen completeScreenGo={completeScreenGo}></VoiceScreen>
          case completeScreen:
            return <CompleteScreen></CompleteScreen>
          default:
            return <StartScreen/>; 
        }
      })()}
    </BackgroundWrapper>
  );
}


export default Page;
