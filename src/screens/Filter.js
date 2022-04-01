import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Text} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import SwitchSection from '../components/SwitchSection';
import Button from '../components/Button';

const Filter = ({navigation}) => {
  const location = ['Ngawi', 'Sleman', 'Jakarta'];
  const type = ['Motorbike', 'Car', 'Bike'];

  const [selectedLocation, setSelectedLocation] = useState();
  const [selectRate, setSelectRate] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isPrepayment, setIsPrepayment] = useState(false);
  const [isDeal, setIsDeal] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const handleReset = () => {
    setSelectedLocation();
    setSelectRate();
    setDate(new Date());
    setOpen(false);
    setIsPrepayment(false);
    setIsDeal(false);
    setIsAvailable(false);
  };

  return (
    <View>
      <View style={styles.backWrapper}>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <EntypoIcon
              name="chevron-left"
              size={39}
              style={styles.iconBack}
              color="black"
            />
            <Text fontSize={'2xl'} bold>
              Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.main}>
        <View>
          <View style={styles.select}>
            <Text color={'black'} fontSize={'xl'}>
              Your Location
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedLocation}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLocation(itemValue)
              }>
              {location.map((data, index) => (
                <Picker.Item
                  label={data}
                  value={data}
                  color="gray"
                  key={index}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.select}>
            <Text color={'black'} fontSize={'xl'}>
              Star Rating
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={selectRate}
              onValueChange={(itemValue, itemIndex) =>
                setSelectRate(itemValue)
              }>
              <Picker.Item label="Select" color="gray" />
              {[...Array(5)].map((data, index) => (
                <Picker.Item
                  key={index}
                  label={String(index + 1)}
                  value={index + 1}
                  color="gray"
                />
              ))}
            </Picker>
          </View>
          <View style={styles.select}>
            <Text color={'black'} fontSize={'xl'}>
              Price
            </Text>
            <View style={[styles.picker, styles.inputWrapper]}>
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                placeholder="Select"
                keyboardType="number-pad"
              />
              <AntIcon name="caretdown" size={10} style={styles.iconInput} />
            </View>
          </View>
          <View style={styles.select}>
            <Text color={'black'} fontSize={'xl'}>
              Date
            </Text>
            <View style={[styles.picker, styles.inputWrapper]}>
              <TouchableOpacity
                title={String(date)}
                onPress={() => setOpen(true)}>
                <Text style={styles.textBtn}>
                  {moment(date).format('MMM DD YYYY')}
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
                onConfirm={dateItem => {
                  setOpen(false);
                  setDate(dateItem);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <AntIcon name="caretdown" size={10} style={styles.iconInput} />
            </View>
          </View>
          <View style={styles.select}>
            <Text color={'black'} fontSize={'xl'}>
              Type
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={selectRate}
              onValueChange={(itemValue, itemIndex) =>
                setSelectRate(itemValue)
              }>
              {type.map((data, index) => (
                <Picker.Item
                  key={index}
                  label={data}
                  value={data}
                  color="gray"
                />
              ))}
            </Picker>
          </View>
          <SwitchSection
            title="No Prepayment"
            state={isPrepayment}
            setState={setIsPrepayment}
          />
          <SwitchSection title="Deal" state={isDeal} setState={setIsDeal} />
          <SwitchSection
            title="Only show available"
            state={isAvailable}
            setState={setIsAvailable}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            color="primary"
            onPress={() => navigation.navigate('SearchList')}>
            Apply
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // filterScreen
  backWrapper: {
    padding: 20,
    borderBottomColor: '#dcdde1',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBack: {
    marginRight: 10,
  },
  resetBtn: {
    backgroundColor: '#dcdde1',
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  main: {
    padding: 20,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  picker: {
    width: '40%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingHorizontal: 17,
    fontSize: 16,
  },
  iconInput: {
    paddingRight: 19,
  },
  btndate: {
    backgroundColor: 'gray',
    color: 'gray',
  },
  textBtn: {
    color: 'gray',
  },
  btnWrapper: {
    marginTop: 50,
  },
});

export default Filter;
