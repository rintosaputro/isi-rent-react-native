import {View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Text} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Stepper from '../components/Stepper';
import Button from '../components/Button';
import priceFormat from '../helper/priceFormat';
import timer from '../helper/timer';
import moment from 'moment';
import {addHistory} from '../redux/actions/history';
import PushNotification from 'react-native-push-notification';

const ThirdPayment = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    transactionCode,
    detailOrder,
    addHistory: addHistoryState,
    auth,
    detailVehicle,
    profile,
  } = useSelector(state => state);
  const endDate = moment(
    moment(detailOrder.startDate).add(detailOrder.totalDay, 'days'),
  ).format('MMM DD YYYY');
  const rendEndDate = moment(
    moment(detailOrder.startDate).add(detailOrder.totalDay, 'days'),
  ).format('YYYY-MM-DD');
  // eslint-disable-next-line prettier/prettier
  const totalPrice = detailVehicle.results.price * detailOrder.totalDay * detailOrder.qty;

  useEffect(() => {
    dispatch({
      type: 'CLEAR_ADD_HISTORY',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (addHistoryState.isSuccess) {
      navigation.navigate('FinishedPayment');
      PushNotification.localNotification({
        channelId: 'transaction',
        message: `Yeay! payment success for ${detailVehicle.results.brand}`,
        title: 'Payment Suceess!',
        soundName: 'default',
        vibrate: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addHistoryState.isSuccess, detailVehicle.results.brand, navigation]);

  const handleSubmit = () => {
    dispatch(
      addHistory(
        profile.results.idUser,
        detailVehicle.results.idVehicle,
        moment(detailOrder.startDate).format('YYYY-MM-DD'),
        rendEndDate,
        totalPrice,
        auth.token,
      ),
    );
  };

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
          <Stepper currentlyActive={3} />
        </Box>
        <Box
          justifyContent={'center'}
          flexDirection="column"
          alignItems={'center'}>
          <Text fontSize="lg" bold>
            Payment Code:
          </Text>
          <Text py="4" fontSize={'4xl'} bold>
            {transactionCode.paymentCode}
          </Text>
          <Text>Insert your payment code while you transfer booking order</Text>
          <Text>Pay before:</Text>
          <Text fontSize={'2xl'} py="5" color="red.700" bold>
            23:59:50
          </Text>
          <Text fontSize="md" color="gray.500" bold>
            Bank account information:
          </Text>
          <Text fontSize={'2xl'} py="5" bold>
            0290-9023-342-9
          </Text>
          <Text fontSize="md" color="gray.500" bold>
            {detailVehicle.results.brand} Rental{' '}
            {detailVehicle.results.location}
          </Text>
          <Box py="5" style={styles.borderBtm} />
          <Text fontSize={'md'} pt="5" bold>
            Boking code:{' '}
            <Text color="success.700" fontSize="lg">
              {transactionCode.bookingCode}
            </Text>
          </Text>
          <Text>
            Use your booking code to pick your {detailVehicle.results.brand}
          </Text>
          <Box py="5">
            <Button fontSize={15} color={'primary'}>
              Copy payment & Booking Code
            </Button>
          </Box>
        </Box>
        <Box>
          <Text fontSize={'lg'}>Order Details:</Text>
          <Text fontSize={'lg'}>
            {detailOrder.qty} {detailVehicle.results.brand}
          </Text>
          <Text fontSize={'lg'}>Prepayment (no tax)</Text>
          <Text fontSize={'lg'}>
            {detailOrder.totalDay} {detailOrder.totalDay > 1 ? 'Days' : 'Day'}
          </Text>
          <Text fontSize={'lg'}>Order Details:</Text>
          <Text fontSize={'lg'}>
            {moment(detailOrder.startDate).format('MMM DD YYYY')} to {endDate}
          </Text>
          <Box py="5" style={styles.borderBtm} />
        </Box>
        <Box py="5" flexDirection={'row'} justifyContent="space-between">
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
        <Button color="primary" onPress={handleSubmit}>
          Finish Payment
        </Button>
        <Box mb={'20'} />
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderBtm: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
  },
});

export default ThirdPayment;
