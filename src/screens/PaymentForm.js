import {TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Box, Text} from 'native-base';
import Stepper from '../components/Stepper';
import InputPayment from '../components/InputPayment';
import {Picker} from '@react-native-picker/picker';
import Button from '../components/Button';

const PaymentForm = ({navigation}) => {
  const [selectPayment, setSelectPayment] = useState();
  const [isSelect, setIsSelect] = useState(false);

  const payment = ['COD', 'GOPAY', 'Transfer Bank'];
  return (
    <Box p={'3'}>
      <TouchableOpacity style={styles.head} onPress={() => navigation.goBack()}>
        <EntypoIcon name="chevron-left" color="black" size={35} />
        <Text fontSize={'2xl'} pl="2" bold>
          Payment
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <Box py={'10'}>
          <Stepper currentlyActive={1} />
        </Box>
        <Box py="2">
          <InputPayment placeholder="ID card Number" type="number-pad" />
        </Box>
        <Box py="2">
          <InputPayment placeholder="Name" />
        </Box>
        <Box py="2">
          <InputPayment placeholder="Last Name" />
        </Box>
        <Box py="2">
          <InputPayment
            placeholder="Mobile phone (must be active)"
            type="phone-pad"
          />
        </Box>
        <Box py="2">
          <InputPayment placeholder="Email address" type="email-address" />
        </Box>
        <Box py="2">
          <InputPayment placeholder="Location (home, office, set)" />
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
          <Button
            color="primary"
            onPress={() => navigation.navigate('SecondPayment')}>
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
