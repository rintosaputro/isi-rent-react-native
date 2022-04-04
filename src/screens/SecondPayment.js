import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Text} from 'native-base';
import Stepper from '../components/Stepper';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Rate from '../components/Rate';
import priceFormat from '../helper/priceFormat';
import Button from '../components/Button';
import {getDetailVehicle} from '../redux/actions/vehicles';
import moment from 'moment';
import {transactionCode} from '../redux/actions/transaction';

const SecondPayment = ({navigation}) => {
  const [paymentCode, setPaymentCode] = useState();
  const [bookingCode, setBookingCode] = useState();
  const {detailOrder, paymentForm, myOrder, detailVehicle} = useSelector(
    state => state,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailVehicle(myOrder.idVehicle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPaymentCode(
      `${Math.round(Math.random() * (99999999 - 10000000) + 10000000)}`,
    );
    if (detailVehicle.results.brand) {
      const brand = detailVehicle.results.brand;
      const startCode = `${brand[0]}${brand[1]}${brand[2]}`;
      setBookingCode(
        `${startCode.toUpperCase()}${Math.round(
          Math.random() * (9999 - 1000) + 1000,
        )}`,
      );
    }
  }, [detailVehicle.results]);

  const handleSubmit = () => {
    dispatch(transactionCode(paymentCode, bookingCode));
    navigation.navigate('ThirdPayment');
    console.log('test', paymentCode, bookingCode);
  };

  const endDate = moment(
    moment(detailOrder.startDate).add(detailOrder.totalDay, 'days'),
  ).format('MMM DD YYYY');

  return (
    <Box p="5">
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <EntypoIcon name="chevron-left" color="black" size={35} />
        <Text fontSize={'2xl'} pl="2" bold>
          Payment
        </Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box py={'10'}>
          <Stepper currentlyActive={2} />
        </Box>
        <Box style={styles.imgWrapper}>
          <Image
            source={
              detailVehicle.results.image
                ? {
                    uri: detailVehicle.results.image.replace(
                      /localhost/g,
                      '192.168.43.195',
                    ),
                  }
                : require('../assets/img/no-image.jpg')
            }
            style={styles.imageBg}
            alt="photo vehicle"
          />
          <Box>
            <Rate rate={4} right={30} top={-60} />
          </Box>
        </Box>
        <Box py={'10'}>
          <Text py={'1'}>
            {detailOrder.qty} {detailVehicle.results.brand}
          </Text>
          <Text py={'1'}>{paymentForm.payment}</Text>
          <Text py={'1'}>
            {detailOrder.totalDay} {detailOrder.totalDay === 1 ? 'day' : 'days'}
          </Text>
          <Text py={'1'}>
            {moment(detailOrder.startDate).format('MMM DD YYYY')} to {endDate}
          </Text>
        </Box>
        <View style={styles.borderBtm} />
        <Box py="10" flexDirection={'row'} justifyContent="space-between">
          <Text fontSize={'3xl'} bold>
            {priceFormat(
              detailVehicle.results.price *
                detailOrder.totalDay *
                detailOrder.qty,
            )}
          </Text>
          <TouchableOpacity>
            <EntypoIcon name="info-with-circle" size={40} color="#d2dae2" />
          </TouchableOpacity>
        </Box>
        <Box py={'5'}>
          <Button color="primary" onPress={handleSubmit}>
            Get Payment Code
          </Button>
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
