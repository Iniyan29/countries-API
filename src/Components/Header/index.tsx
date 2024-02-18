import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {fonts} from '../../Assets/Fonts';
import { icons } from '../../Assets/Icons';

const Header = ({onChangeDarkMode}: any) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        onChangeDarkMode(newMode);
      };
  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
     
      <Text style={[styles.heading, isDarkMode && styles.darkModeText]}>Where in the world?</Text>
     
      <TouchableOpacity
        style={styles.darkModeButton}
        onPress={handleDarkMode}>
        <Image source={icons.darkMode} style={[styles.icon, isDarkMode&& styles.darkIcon]}></Image>
        <Text style={[styles.text, isDarkMode && styles.darkModeText]}>Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
};

export {Header};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
  },
  darkModeContainer:{
backgroundColor: 'hsl(209, 23%, 22%)'
  },

  heading: {
    // fontWeight: '800',
    fontSize: 16,
    color: 'hsl(200, 15%, 8%)',
   
    fontFamily: fonts.Bold,
   
  },
  darkModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:10
  },
  text: {
    // fontWeight: '600',
    fontSize: 16,
    color: 'hsl(200, 15%, 8%)',
    fontFamily: fonts.light,
    marginLeft: 8,
  },
  darkModeText:{
color: ' hsl(0, 0%, 100%)'
  },
  icon: {
    height:15,
    width: 20,
    tintColor: 'hsl(200, 15%, 8%)',
    resizeMode: 'contain'
  },
  darkIcon:{
    tintColor:'hsl(0, 0%, 100%)'
  }
});
