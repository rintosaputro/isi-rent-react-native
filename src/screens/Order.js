import {
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Rate from '../components/Rate';
import {Box, Text, Badge} from 'native-base';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

import priceFormat from '../helper/priceFormat';
import Button from '../components/Button';

import {getDetailVehicle} from '../redux/actions/vehicles';
import {detailOrder} from '../redux/actions/transaction';
import {goToVerify} from '../redux/actions/verify';

const LocationSection = ({address, icon}) => {
  return (
    <Box style={styles.location}>
      <Badge
        my={'2'}
        colorScheme="light"
        py={'2'}
        width={'9'}
        style={styles.borderBadge}>
        <Icon name={icon} size={20} color="#49BEB7" />
      </Badge>
      <Text ml={'5'} color="gray.600">
        {address}
      </Text>
    </Box>
  );
};

const Order = ({navigation}) => {
  const [favorite, setFavorite] = useState(false);
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isStart, setIsStart] = useState(false);
  const [endDate, setEndDate] = useState(1);

  const {myOrder, detailVehicle, profile} = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'ADD_VEHICLE_CLEAR'});
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDetailVehicle(myOrder.idVehicle));
  }, [dispatch, myOrder.idVehicle]);

  const increment = () => {
    if (count < qty) {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const gotoReservation = () => {
    dispatch(detailOrder(count, date, endDate));
    navigation.navigate('PaymentForm');
    // console.log('test', count, moment(date).format('MMM DD YY'), endDate);
  };
  const handleVerify = () => {
    dispatch({type: 'AUTH_LOGOUT'});
    dispatch(goToVerify);
  };

  const {type, brand, capacity, prepayment, location, price, qty, image} =
    detailVehicle.results;

  return (
    <ScrollView>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={
            image
              ? {uri: image.replace(/localhost/g, '192.168.43.195')}
              : require('../assets/img/no-image.jpg')
          }
          alt={brand}
          style={styles.imageProduct}>
          <View style={styles.opacity}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backWrapper}>
                <Icon name="angle-left" size={45} color="white" />
              </TouchableOpacity>
              <View style={styles.rateWrapper}>
                <View style={styles.rate}>
                  <Rate rate={4.5} />
                </View>
                <TouchableOpacity
                  style={styles.favorite}
                  onPress={() => setFavorite(!favorite)}>
                  <Icon
                    name={favorite ? 'heart' : 'heart-o'}
                    size={35}
                    color={favorite ? '#49BEB7' : 'white'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <Box style={styles.topDetail}>
            <Text fontSize={'3xl'} bold>
              {brand}
            </Text>
            <TouchableOpacity>
              <Icon name="comment-o" size={35} color="#32DBC6" />
            </TouchableOpacity>
          </Box>
          <Text mb="1.5" fontSize={'3xl'} bold>
            {priceFormat(price)}/day
          </Text>
          <Text fontSize={'lg'}>Max for {capacity} person</Text>
          <Text fontSize={'lg'}>
            {prepayment ? 'Prepayment' : 'No prepayment'}
          </Text>
          {qty <= 2 ? (
            <Text mb={'3'} fontSize={'lg'} bold color="#d63031">
              {qty} bikes left
            </Text>
          ) : (
            <Text mb={'3'} fontSize={'lg'} bold color="#49BEB7">
              Available
            </Text>
          )}
          <LocationSection address={location} icon={'map-marker'} />
          <LocationSection
            address="3.2 miles from your location"
            icon="street-view"
          />
          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems="center">
            <Text fontSize={'lg'} my={'3'} bold>
              Select {type}
            </Text>
            <Box flexDirection={'row'}>
              <TouchableOpacity style={styles.counter} onPress={increment}>
                <Text fontSize={'lg'} bold>
                  +
                </Text>
              </TouchableOpacity>
              <Text fontSize={'lg'} mx={'4'} bold>
                {count}
              </Text>
              <TouchableOpacity style={styles.counter} onPress={decrement}>
                <Text fontSize={'xl'} bold>
                  -
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <Box my={'2'} justifyContent="space-between" flexDirection={'row'}>
            <TouchableOpacity style={styles.startDate}>
              <TouchableOpacity
                title={String(date)}
                onPress={() => setOpen(true)}>
                <Text style={styles.textBtn}>
                  {isStart ? moment(date).format('MMM DD YYYY') : 'Select date'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                style={styles.datePicker}
                fadeToColor="white"
                theme="dark"
                textColor="black"
                modal
                mode="date"
                open={open}
                date={date}
                minimumDate={new Date()}
                onConfirm={dateItem => {
                  setOpen(false);
                  setDate(dateItem);
                  setIsStart(true);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.endDate}>
              <Picker
                selectedValue={endDate}
                onValueChange={(itemValue, itemIndex) => setEndDate(itemValue)}>
                {[...Array(7)].map((data, index) => (
                  <Picker.Item
                    label={String(index + 1) + ' Day'}
                    value={index + 1}
                    key={index}
                  />
                ))}
              </Picker>
            </TouchableOpacity>
          </Box>
          {profile.results?.confirm === '0' ? (
            <Box>
              <Text mt="5" mb="2" bold>
                You must verify your account, before making a reservation!
              </Text>
              <Button color="primary" onPress={handleVerify}>
                Verify account
              </Button>
            </Box>
          ) : (
            <Box mt={'25'}>
              <Button color="primary" onPress={gotoReservation}>
                Reservation
              </Button>
            </Box>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageProduct: {
    height: 280,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backWrapper: {
    paddingRight: 40,
    paddingVertical: 20,
  },
  opacity: {
    backgroundColor: 'rgba(0, 0, 0,0.2)',
    height: '100%',
  },
  rateWrapper: {
    width: '19%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rate: {
    backgroundColor: 'gray',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  favorite: {
    paddingTop: 15,
    // paddingBottom: 10,
    alignItems: 'flex-end',
  },
  container: {
    padding: 20,
  },
  topDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderBadge: {
    borderRadius: 10,
  },
  counter: {
    backgroundColor: '#32DBC6',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  startDate: {
    borderRadius: 10,
    backgroundColor: 'rgba(57, 57, 57, 0.15)',
    padding: 15,
    width: '60%',
  },
  endDate: {
    width: '35%',
    borderRadius: 10,
    backgroundColor: 'rgba(57, 57, 57, 0.15)',
  },
});

export default Order;
