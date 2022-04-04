import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Box, Text} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import priceFormat from '../helper/priceFormat';
import Rate from '../components/Rate';
import Button from '../components/Button';
import {useSelector} from 'react-redux';
import moment from 'moment';

const FinishedPayment = ({navigation}) => {
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
  const customer = {
    id: 13454,
    name: 'Alexander Grahambel',
    phone: '089234543',
    address: 'Jakarta, Indonesia',
    email: 'alexander@mail.com',
    total: 245000,
  };

  const {addHistory, paymentForm, detailOrder} = useSelector(state => state);

  return (
    <Box p="5">
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('History')}>
        <EntypoIcon name="chevron-left" color="black" size={35} />
        <Text fontSize={'2xl'} pl="2" bold>
          See history
        </Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          textAlign={'center'}
          my="6"
          fontSize={'2xl'}
          color="success.700"
          bold>
          Payment Success!
        </Text>
        <Box style={styles.imgWrapper}>
          <Image
            source={
              addHistory.results.image
                ? {
                    uri: addHistory.results.image.replace(
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
            {detailOrder.qty} {addHistory.results.brand}
          </Text>
          <Text py={'1'}>{paymentForm.payment}</Text>
          <Text py={'1'}>
            {detailOrder.totalDay} {detailOrder.totalDay === 1 ? 'day' : 'days'}
          </Text>
          <Text py={'1'}>
            {moment(addHistory.results.rentStartDate).format('MMM DD YYYY')} to{' '}
            {moment(addHistory.results.rentEndDate).format('MMM DD YYYY')}
          </Text>
        </Box>
        <View style={styles.borderBtm} />
        <Box>
          <Text py={'1'}>ID: {addHistory.results.idHistory}</Text>
          <Text py={'1'}>
            {paymentForm.firsName} ({paymentForm.email})
          </Text>
          <Text py={'1'}>
            {paymentForm.phone}{' '}
            <Text color="success.700" bold>
              Active
            </Text>
          </Text>
          <Text py={'1'}>{paymentForm.address}</Text>
        </Box>
        <Box my="10">
          <Button color="primary">
            Total: {priceFormat(addHistory.results.prepayment)}
          </Button>
        </Box>
        <Box mb="20" />
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
    marginBottom: 30,
  },
});

export default FinishedPayment;
