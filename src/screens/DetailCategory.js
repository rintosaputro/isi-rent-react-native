import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import VehicleList from '../components/VehicleList';

const DetailCategory = ({navigation}) => {
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
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {listVehicles.map((data, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Order')}>
            <VehicleList
              image={data.image}
              name={data.name}
              seet={data.seet}
              stock={data.stock}
              price={data.price}
            />
          </TouchableOpacity>
        );
      })}
      <View style={styles.bottom} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  listVehicles: {
    flexDirection: 'row',
    marginVertical: 18,
  },
  left: {
    position: 'relative',
    width: '40%',
  },
  image: {},
  rate: {
    flexDirection: 'row',
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 20,
    position: 'absolute',
    right: -18,
    top: -10,
  },
  iconRate: {
    marginLeft: 8,
  },
  right: {
    marginLeft: 35,
    justifyContent: 'space-between',
  },
  bottom: {
    paddingBottom: 40,
  },
});

export default DetailCategory;
