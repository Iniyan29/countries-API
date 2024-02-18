import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DropDown, Search} from '../../Components';
import axios from 'axios';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {fonts} from '../../Assets/Fonts';
import {Header} from '../../Components/Header';

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
  flags: {
    png: string;
  };
  cca3: string;
}

const Home = () => {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [error, setError] = useState(null);
  const [uniqueRegions, setUniqueRegions] = useState<string[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    fetchImageInfo();
  }, []);

  const fetchImageInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountryList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching image info:', error);
      setLoading(false);
    }
  };

  const handleSearch = async (country: string) => {
    console.log('handleSearch------->', country);
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`,
      );
      setSearchResults(response.data);
      setError(null);
      console.log('response.data+++++', response.data);
    } catch (error: any) {
      console.error('Error searching:', error);
      setSearchResults(null);
      setError(error.message);
      console.log('error--------+++++', error);
    }
  };

  useEffect(() => {
    if (countryList) {
      console.log('searchResults-----', countryList);
      const regions = countryList.map((item: any) => item.region);
      const uniqueRegions = [...new Set(regions)];
      setUniqueRegions(uniqueRegions);
    }
  }, [countryList]);
  console.log('uniqueRegions=====++++', uniqueRegions);

  const handleSelectRegion = (region: any) => {
    setFilteredCountries(region);
  };

  const handleOnPress = (selectedCountry: Country) => {
    console.log('selectedCountryselectedCountry', selectedCountry);
    navigation.navigate('Detail', {
      selected: selectedCountry,
      countryList: countryList,
    });
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={[styles.imageContainer, isDarkMode && styles.darkImageContainer]}
      onPress={() => {
        handleOnPress(item);
      }}>
      <Image
        source={{uri: item.flags.png}}
        style={{width: '100%', height: '50%', borderRadius: 5}}
        resizeMode="stretch"
      />
      <View style={{padding: 30}}>
        <Text style={[styles.country, isDarkMode && styles.darkModeText]}>
          {item.name.common}
        </Text>
        <Text style={[styles.title, isDarkMode && styles.darkModeText]}>
          Population: {item.population}
        </Text>
        <Text style={[styles.title, isDarkMode && styles.darkModeText]}>
          Region: {item.region}
        </Text>
        <Text style={[styles.title, isDarkMode && styles.darkModeText]}>
          Capital: {item.capital}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Header
        onChangeDarkMode={el => {
          setIsDarkMode(el);
        }}></Header>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <Search darkMode={isDarkMode} onSearch={handleSearch}></Search>
        <DropDown
          onRegionSelect={handleSelectRegion}
          data={uniqueRegions}
          darkMode={isDarkMode}></DropDown>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="hsl(200, 15%, 8%)"
            style={{marginTop: 20}}
          />
        ) : (
          <View style={{marginTop: 40, flex: 1}}>
            {searchResults ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={item => item.cca3}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={
                  filteredCountries.length > 0 ? filteredCountries : countryList
                }
                renderItem={renderItem}
                keyExtractor={item => item.cca3}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export {Home};

const styles = StyleSheet.create({
  imageContainer: {
    height: 400,
    marginHorizontal: 40,
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    // alignItems: 'center',
    // position: 'absolute'
  },
  country: {
    fontWeight: '800',
    fontSize: 14,
    color: 'hsl(200, 15%, 8%)',
    marginBottom: 10,
    fontFamily: fonts.Bold,
  },
  title: {
    fontWeight: '300',
    fontSize: 14,
    color: 'hsl(200, 15%, 8%)',
    marginVertical: 5,
    fontFamily: fonts.Regular,
  },
  darkImageContainer: {
    backgroundColor: 'hsl(209, 23%, 22%)',
  },
  darkModeText: {
    color: 'hsl(0, 0%, 100%)',
  },
  container: {
    flex: 1,
    backgroundColor: 'hsl(0, 0%, 98%)',
  },
  darkContainer: {
    backgroundColor: ' hsl(207, 26%, 17%)',
  },
});
