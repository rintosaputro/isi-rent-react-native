import {TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Box, Text} from 'native-base';
import Stepper from '../components/Stepper';
import InputPayment from '../components/InputPayment';
import {Picker} from '@react-native-picker/picker';
import Button from '../components/Button';
import {paymentForm} from '../redux/actions/transaction';

const PaymentForm = ({navigation}) => {
  const payment = [
    'Prepayment (no tax)',
    'Pay at the end (include tax)',
    'Partial payment (include tax)',
  ];

  const [selectPayment, setSelectPayment] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [idCard, setIdCard] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();
  const [isEmpty, setIsEmpty] = useState();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      idCard &&
      firstName &&
      lastName &&
      phone &&
      email &&
      location &&
      selectPayment
    ) {
      setIsEmpty(false);
      dispatch(
        paymentForm(
          idCard,
          firstName,
          lastName,
          phone,
          email,
          location,
          selectPayment,
        ),
      );
      navigation.navigate('SecondPayment');
    } else {
      setIsEmpty(true);
    }
    // console.log(
    //   'test',
    //   idCard,
    //   firstName,
    //   lastName,
    //   phone,
    //   email,
    //   location,
    //   selectPayment,
    // );
  };

  return (
    <Box p={'3'}>
      <TouchableOpacity style={styles.head} onPress={() => navigation.goBack()}>
        <EntypoIcon name="chevron-left" color="black" size={35} />
        <Text fontSize={'2xl'} pl="2" bold>
          Payment
        </Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box py={'10'}>
          <Stepper currentlyActive={1} />
        </Box>
        {isEmpty && (
          <Text
            color={'danger.700'}
            style={styles.message}
            py="2"
            my="7"
            textAlign={'center'}
            fontSize="xl"
            bold>
            All data must be filled
          </Text>
        )}
        <Box py="2">
          <InputPayment
            placeholder="ID card Number"
            type="number-pad"
            onChangeText={setIdCard}
            value={idCard}
          />
        </Box>
        <Box py="2">
          <InputPayment
            placeholder="First Name"
            onChangeText={setFirstName}
            value={firstName}
          />
        </Box>
        <Box py="2">
          <InputPayment
            placeholder="Last Name"
            onChangeText={setLastName}
            value={lastName}
          />
        </Box>
        <Box py="2">
          <InputPayment
            placeholder="Mobile phone (must be active)"
            type="phone-pad"
            onChangeText={setPhone}
            value={phone}
          />
        </Box>
        <Box py="2">
          <InputPayment
            placeholder="Email address"
            type="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </Box>
        <Box py="2">
          <InputPayment
            placeholder="Location (home, office, set)"
            onChangeText={setLocation}
            value={location}
          />
        </Box>
        <Box py="2">
          <Picker
            style={styles.picker}
            selectedValue={selectPayment}
            onValueChange={(itemValue, itemIndex) => {
              setSelectPayment(itemValue);
              setIsSelect(true);
            }}>
            {!isSelect && (
              <Picker.Item
                style={styles.item}
                label="Payment type"
                color="gray"
              />
            )}
            {payment.map((data, index) => (
              <Picker.Item
                style={styles.item}
                key={index}
                label={data}
                value={data}
                color="black"
              />
            ))}
          </Picker>
        </Box>
        <Box py={'10'}>
          <Button color="primary" onPress={handleSubmit}>
            See Order Details
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
  },
  picker: {
    height: 60,
    // color: 'gray',
    backgroundColor: 'rgba(178, 190, 195,0.3)',
    borderRadius: 20,
    fontSize: 20,
    paddingHorizontal: 15,
  },
});

export default PaymentForm;
