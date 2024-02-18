import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {fonts} from '../../../android/app/build/intermediates/assets/debug/custom';
import {icons} from '../../Assets/Icons';


const DropDown = ({
  data,
  onRegionSelect,
  darkMode,
}: {
  data: string[];
  onRegionSelect: (region: any) => void;
  darkMode: boolean;
}) => {
  console.log('data========', data);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredRegion, setFilteredRegion] = useState(null);
  const [error, setError] = useState(null);
  const [isTriggered, setIsTriggered]=useState(false)

  const handleOptionSelect = async (continent: any) => {
    setSelectedOption(continent);
    setIsVisible(false);
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/region/${continent}`,
      );
      setFilteredRegion(response.data);
      onRegionSelect(response.data);
      setError(null);
      console.log('response.data+++++', response.data);
    } catch (error: any) {
      console.error('Error searching:', error);
      setFilteredRegion(null);
      setError(error.message);
      console.log('error--------+++++', error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(!isVisible);
          setIsTriggered(!isTriggered)
        }}
        style={[styles.trigger, darkMode && styles.darkContainer]}>
        <Text style={[styles.selectedOption, darkMode && styles.darkModeText]}>
          {selectedOption || 'Filter by Region'}
        </Text>
<Image source={ isTriggered ?icons.upArroW:icons.downArroW} style={[styles.icon, darkMode&&styles.darkIcon]}></Image>
      </TouchableOpacity>
      {isVisible && (
        <View
          style={[styles.optionsContainer, darkMode && styles.darkContainer]}>
          {data.map(el => (
            <TouchableOpacity
              onPress={() => handleOptionSelect(el)}
              style={styles.option}>
              <Text style={[styles.text, darkMode && styles.darkModeText]}>
                {el}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export {DropDown};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    marginTop: 40,
  },
  trigger: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  selectedOption: {
    flex: 1,
    marginRight: 10,
    color: 'hsl(200, 15%, 8%)',
    fontSize: 14,
  },
  arrow: {
    marginLeft: 10,
  },
  optionsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 5,
    position: 'absolute',
    top: 50,
    right: 0,
    zIndex: 1,
    padding: 15,
  },
  option: {
    paddingBottom: 8,
    // paddingVertical: 8,
    paddingHorizontal: 10,
  },
  text: {
    color: 'hsl(200, 15%, 8%)',
    fontSize: 14,
    fontFamily: fonts.Regular,
    fontWeight: '300',
  },
  darkContainer: {
    backgroundColor: 'hsl(209, 23%, 22%)',
  },
  darkModeText: {
    color: 'hsl(0, 0%, 100%)',
  },
  icon:{
    height:10, 
width:10,
alignItems: 'center',
alignContent: 'center',
resizeMode: 'contain',
tintColor:' hsl(200, 15%, 8%)'
  },
  darkIcon:{
    tintColor:'hsl(0, 0%, 100%)'
  }
});
