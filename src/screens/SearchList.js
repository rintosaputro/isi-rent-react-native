import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Text} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import VehicleList from '../components/VehicleList';
import Button from '../components/Button';

const SearchList = () => {
  const listVehicles = [
    {
      name: 'Vespa Matic',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/motor.jpg'),
      rating: 4,
    },
    {
      name: 'Jupiter',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/scoter.jpg'),
      rating: 4,
    },
    {
      name: 'Honda Supra',
      seet: 2,
      stock: 2,
      price: 20000,
      image: require('../assets/imgDummy/motor.jpg'),
      rating: 4,
    },
    {
      name: 'Ymah KLX',
      seet: 2,
      stock: 1,
      price: 20000,
      image: require('../assets/imgDummy/car.jpg'),
      rating: 4,
    },
    {
      name: 'Monkey',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/scoter.jpg'),
      rating: 4,
    },
    {
      name: 'Vespa',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/motor.jpg'),
      rating: 4,
    },
    {
      name: 'Matic',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/motor.jpg'),
      rating: 4,
    },
    {
      name: 'Matic',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/car.jpg'),
      rating: 4,
    },
    {
      name: 'Vespa Matic',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/scoter.jpg'),
      rating: 4,
    },
  ];

  const [filter, setFilter] = useState(true);

  const showFilter = () => {
    setFilter(!filter);
  };

  return (
    <View>
      <View style={styles.search}>
        <TextInput
          placeholder="Motorbike-Sleman-January"
          placeholderTextColor="black"
          style={styles.input}
        />
        <Icon name="caretdown" size={15} />
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.filter} onPress={showFilter}>
          <Icon name="filter" size={20} />
          <Text>Filter Search</Text>
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {listVehicles.map((data, index) => (
            <VehicleList
              image={data.image}
              name={data.name}
              seet={data.seet}
              stock={data.stock}
              price={data.price}
              key={index}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 50,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 19,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default SearchList;
