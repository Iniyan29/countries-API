import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../../Assets/Fonts';
import {Header} from '../../Components/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {icons} from '../../Assets/Icons';

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

const Detail = ({route, navigation}: any) => {
  const {selected, countryList} = route.params;

  // const navigation = useNavigation
  const [selectedCountry, setSelectedCountry] = useState<Country>(selected);
  const [borderCountries, setBorderCountries] = useState<any>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // useEffect(() => {
  //   setSelectedCountry(selected);
  // }, [selected]);

  const extractValues = (item: any) => {
    if (!item) {
      return '';
    }
    const values = Object.values(item).join(' , ');
    JSON.stringify(values);
    console.log('values========', JSON.stringify(values));
    return values;
  };

  function getOfficialValues(data: any, key: 'common' | 'name') {
    const officialValues = [];
    for (let lang in data) {
      if (data.hasOwnProperty(lang)) {
        officialValues.push(data[lang][key]);
      }
    }
    return officialValues.join(' , ');
  }

  const borderFilters = () => {
    let matchedBorders: any[] = [];
    countryList &&
      countryList?.map((item: any) => {
        selectedCountry &&
          selectedCountry?.borders?.map((borders: any) => {
            if (item?.cca3 === borders) {
              matchedBorders = [...matchedBorders, item];
            }
          });
      });
    return matchedBorders;
  };

  useEffect(() => {
    const filteredBorder = borderFilters();
    setBorderCountries(filteredBorder);
  }, [countryList, selectedCountry]);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  console.log(
    '===============filteredBorder====>',
    borderCountries && borderCountries.length && borderCountries,
  );

  console.log('selectedCountry=========', selectedCountry && selectedCountry);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[styles.container, isDarkMode && styles.darkBackground]}>
        <Header
          onChangeDarkMode={el => {
            setIsDarkMode(el);
          }}></Header>
        <View style={{padding: 30,}}>
          <TouchableOpacity
            style={[styles.backButton, isDarkMode && styles.darkContainer]}
            onPress={handleGoBack}>
            <Image
              source={icons.back}
              style={[styles.icon, isDarkMode && styles.darkModeIcon]}></Image>

            <Text style={[styles.text, isDarkMode && styles.darkModeText]}>
              {'Back'}
            </Text>
          </TouchableOpacity>
          <View style={styles.image}>
            <Image
              style={{flex: 1}}
              source={{uri: selectedCountry && selectedCountry.flags.png}}
              resizeMode="stretch"></Image>
          </View>
          
          <Text
            style={[styles.selectedCountry, isDarkMode && styles.darkModeText]}>
            {selectedCountry && selectedCountry?.name?.common}
          </Text>
          <Text
            style={[
              styles.title,
              isDarkMode && styles.darkModeText,
            ]}>{`Native Name: ${getOfficialValues(
            selectedCountry && selectedCountry?.name?.nativeName,
            'common',
          )}`}</Text>
          <Text
            style={[
              styles.title,
              isDarkMode && styles.darkModeText,
            ]}>{`Population: ${
            selectedCountry && selectedCountry?.population
          }`}</Text>
          <Text
            style={[
              styles.title,
              isDarkMode && styles.darkModeText,
            ]}>{`Region: ${selectedCountry && selectedCountry?.region}`}</Text>
          <Text
            style={[
              styles.title,
              isDarkMode && styles.darkModeText,
            ]}>{`Sub Region: ${
            selectedCountry && selectedCountry.subregion
          }`}</Text>
          <Text
            style={[
              styles.title,
              isDarkMode && styles.darkModeText,
            ]}>{`Capital: ${
            selectedCountry && selectedCountry?.capital
          }`}</Text>
          <View style={{marginVertical: 25,paddingBottom:20}}>
            <Text
              style={[
                styles.title,
                isDarkMode && styles.darkModeText,
              ]}>{`Currencies: ${getOfficialValues(
              selectedCountry && selectedCountry.currencies,
              'name',
            )}`}</Text>
            <Text
              style={[
                styles.title,
                isDarkMode && styles.darkModeText,
              ]}>{`Languages: ${extractValues(
              selectedCountry && selectedCountry?.languages,
            )}`}</Text>
          </View>
          <View>
            {borderCountries && borderCountries?.length > 0 && (
              <>
                <Text
                  style={[
                    styles.selectedCountry,
                    isDarkMode && styles.darkModeText,
                  ]}>
                  {'Border Countries'}
                </Text>
                <View style={styles.borderContainer}>
                  {borderCountries?.map((el: Country) => {
                    return (
                      <TouchableOpacity
                        key={el.cca3}
                        style={[
                          styles.backButton,
                          isDarkMode && styles.darkContainer,
                        ]}
                        onPress={() => {
                          handleSelectCountry(el);
                        }}>
                        <Text
                          style={[
                            styles.text,
                            isDarkMode && styles.darkModeText,
                          ]}>
                          {el && el?.name?.common}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            )}
          </View>
        </View>
      
      </View>
    </ScrollView>
  );
};

export {Detail};

const styles = StyleSheet.create({
  backButton: {
    height: 40,
    width: 110,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'hsl(200, 15%, 8%)',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    height: 250,
    width: '100%',
    marginTop: 40,
    marginBottom: 10,
  },
  selectedCountry: {
    fontWeight: '800',
    fontSize: 16,
    color: 'hsl(200, 15%, 8%)',
    marginVertical: 10,
  },
  title: {
    fontWeight: '300',
    fontSize: 16,
    color: 'hsl(200, 15%, 8%)',
    marginVertical: 5,
    fontFamily: fonts.Regular,
  },
  borderContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  darkContainer: {
    backgroundColor: 'hsl(209, 23%, 22%)',
  },
  darkModeText: {
    color: 'hsl(0, 0%, 100%)',
  },
  container: {
    flex: 1,
    backgroundColor: 'hsl(0, 0%, 98%)',
  },
  darkBackground: {
    backgroundColor: ' hsl(207, 26%, 17%)',
  },
  icon: {
    height: 10,
    width: 15,
    tintColor: ' hsl(200, 15%, 8%)',
    marginRight: 15,
  },
  darkModeIcon: {
    tintColor: 'hsl(0, 0%, 100%)',
  },
});
