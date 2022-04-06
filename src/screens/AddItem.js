import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Box, Image, Text} from 'native-base';
import React, {useState} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import Button from '../components/Button';

const AddItem = ({navigation}) => {
  const location = [
    'Ngawi',
    'Bandung',
    'Jakarta',
    'Yogyakarta',
    'Depok',
    'Bali',
    'Malang',
  ];
  const categories = ['Cars', 'Motorbike', 'Bike', 'Pickup'];
  const [selectedLocation, setSelectedLocation] = useState();
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <Box p="5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flexDirection={'row'} justifyContent="space-between">
          <TouchableOpacity style={styles.back}>
            <EntypoIcon
              name="chevron-left"
              size={30}
              style={styles.iconBack}
              color="black"
            />
            <Text fontSize={'xl'} bold>
              Add new item
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text fontSize={'xl'} color="gray.400">
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
        <Box
          my="6"
          justifyContent={'center'}
          alignItems="center"
          textAlign={'center'}>
          <Box background={'gray.200'} style={styles.imgWrapper}>
            <Image
              source={require('../assets/img/upload.png')}
              size={60}
              alt="upload"
              resizeMode="contain"
            />
          </Box>
          <TouchableOpacity>
            <Box
              background={'black'}
              py="3"
              px="10"
              mt="6"
              style={styles.btnPict}>
              <Text color="#32DBC6" bold>
                Add Picture
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box
          flexDirection="column"
          justifyContent={'center'}
          alignItems="center">
          <Box style={styles.formTop}>
            <TextInput
              textAlign="center"
              style={styles.input1}
              placeholder="Type product name min 30 characters"
            />
            <TextInput
              textAlign="center"
              style={styles.input1}
              placeholder="Type product price"
            />
          </Box>
        </Box>
        <Box mt="55">
          <Text fontSize={'xl'} bold>
            Description
          </Text>
          <TextInput
            style={styles.input1}
            placeholder="Describe your product min 150 characters"
          />
          <Text fontSize={'xl'} mt="5" bold>
            Location
          </Text>
          <Box style={styles.pickerWrap}>
            <Picker
              style={styles.picker}
              selectedValue={selectedLocation}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLocation(itemValue)
              }>
              {/* <Picker.item label="Select Location" color="gray" value={null} /> */}
              {location.map((data, index) => (
                <Picker.Item
                  label={data}
                  value={data}
                  color="gray"
                  key={index}
                />
              ))}
            </Picker>
          </Box>
          <Text fontSize={'xl'} mt="5" bold>
            Add to:
          </Text>
          <Box style={styles.pickerWrap}>
            <Picker
              style={styles.picker}
              selectedValue={selectedLocation}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLocation(itemValue)
              }>
              {/* <Picker.item label="Select Location" color="gray" value={null} /> */}
              {categories.map((data, index) => (
                <Picker.Item
                  label={data}
                  value={data}
                  color="gray"
                  key={index}
                />
              ))}
            </Picker>
          </Box>
          <Box
            mt="4"
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems="center">
            <Text fontSize={'lg'} my={'3'} bold>
              Select
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
        </Box>
        <Box my="5">
          <Button color="primary">Save Product</Button>
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
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  btnPict: {
    borderRadius: 10,
  },
  formTop: {
    width: '80%',
  },
  input1: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  pickerWrap: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(99, 110, 114,0.7)',
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
});

export default AddItem;
