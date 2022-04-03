import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import VehicleList from '../components/VehicleList';
import {useSelector} from 'react-redux';
import Button from '../components/Button';

const DetailCategory = ({navigation}) => {
  const {detailCategory} = useSelector(state => state);
  const dataState = useSelector(state => state);

  const type = detailCategory.nameCategory;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {dataState[`${type}`].results.map((data, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Order')}>
            <VehicleList
              image={
                data.image
                  ? {uri: data.image.replace(/localhost/g, '192.168.43.195')}
                  : require('../assets/img/no-image.jpg')
              }
              name={data.brand}
              seet={data.capacity}
              stock={data.qty}
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
