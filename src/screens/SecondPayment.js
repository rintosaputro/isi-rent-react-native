import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {Box, Text} from 'native-base';
import Stepper from '../components/Stepper';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Rate from '../components/Rate';
import priceFormat from '../helper/priceFormat';
import Button from '../components/Button';

const SecondPayment = ({navigation}) => {
  const vehicle = {
    name: 'Vespa Matic',
    seet: 2,
    stock: 3,
    price: 20000,
    image: require('../assets/imgDummy/scoter.jpg'),
    rating: 4,
    qty: 2,
    days: 4,
    startDate: 'April 7 2022',
    endDate: 'April 11 2022',
  };

  return (
    <Box p="5">
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <EntypoIcon name="chevron-left" color="black" size={35} />
        <Text fontSize={'2xl'} pl="2" bold>
          Payment
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <Box py={'10'}>
          <Stepper currentlyActive={2} />
        </Box>
        <Box style={styles.imgWrapper}>
          <Image
            source={vehicle.image}
            style={styles.imageBg}
            alt="photo vehicle"
          />
          <Box>
            <Rate rate={4} right={30} top={-60} />
          </Box>
        </Box>
        <Box py={'10'}>
          <Text py={'1'}>
            {vehicle.qty} {vehicle.name}
          </Text>
          <Text py={'1'}>Prepayment (no tax)</Text>
          <Text py={'1'}>
            {vehicle.days} {vehicle.days === 1 ? 'day' : 'days'}
          </Text>
          <Text py={'1'}>
            {vehicle.startDate} to {vehicle.endDate}
          </Text>
        </Box>
        <View style={styles.borderBtm} />
        <Box py="10" flexDirection={'row'} justifyContent="space-between">
          <Text fontSize={'3xl'} bold>
            {priceFormat(vehicle.price * vehicle.days * vehicle.qty)}
          </Text>
          <TouchableOpacity>
            <EntypoIcon name="info-with-circle" size={40} color="#d2dae2" />
          </TouchableOpacity>
        </Box>
        <Box py={'5'}>
          <Button color="primary">Get Payment Code</Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgWrapper: {
    backgroundColor: 'rgba(30, 39, 46,1.0)',
    borderRadius: 20,
  },
  imageBg: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    resizeMode: 'cover',
    backgroundColor: 'gray',
  },
  borderBtm: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default SecondPayment;
