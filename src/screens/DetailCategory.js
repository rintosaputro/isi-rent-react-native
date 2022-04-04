import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import VehicleList from '../components/VehicleList';
import {useSelector, useDispatch} from 'react-redux';
import Button from '../components/Button';
import {getDetailCategory} from '../redux/actions/detailCategory';
import {myOrder} from '../redux/actions/transaction';

const DetailCategory = ({navigation}) => {
  const {detailCategory} = useSelector(state => state);
  const dataState = useSelector(state => state);

  const type = detailCategory.nameCategory;

  const dispatch = useDispatch();

  const handleOrder = id => {
    dispatch(myOrder(id));
    navigation.navigate('Order');
  };

  const nextPage = () => {
    // dispatch(
    //   getDetailCategory(
    //     type.toUpperCase(),
    //     dataState[`${type}`].pageInfo.currentPage + 1,
    //   ),
    // );
    console.log(
      'testinngggg',
      dataState[`${type}`].results.length,
      dataState[`${type}`].pageInfo.currentPage + 1,
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {dataState[`${type}`].results.map((data, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleOrder(data.idVehicle)}>
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
      {dataState[`${type}`].pageInfo && dataState[`${type}`].pageInfo.next ? (
        <Button color="primary" onPress={nextPage}>
          Next
        </Button>
      ) : (
        <></>
      )}
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
