import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {fonts} from '../../Assets/Fonts';
import {icons} from '../../Assets/Icons';

const Search = ({onSearch, darkMode}: any) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    onSearch(searchInput);
  };
  console.log('searchInput------->', searchInput);
  return (
    <View style={[styles.container, darkMode && styles.darkModeContainer]}>
      <Image
        style={[styles.searchIcon, darkMode && styles.darkModeIcon]}
        source={icons.search}></Image>
      <TextInput
        style={[styles.input, darkMode && styles.darkModeText]}
        placeholder="Search for the country..."
        placeholderTextColor="hsl(0, 0%, 70%)"
        onChangeText={text => {
          setSearchInput(text);
        }}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

export {Search};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: 'hsl(0, 0%, 52%)',
    fontFamily: fonts.Regular,
    fontWeight: '300',
  },
  darkModeContainer: {
    backgroundColor: 'hsl(209, 23%, 22%)',
  },
  darkModeText: {
    color: 'hsl(0, 0%, 100%)',
  },
  searchIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    tintColor: 'hsl(0, 0%, 70%)',
    marginRight: 10,
  },
  darkModeIcon: {
    tintColor: 'hsl(0, 0%, 100%)',
  },
});
