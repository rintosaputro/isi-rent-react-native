import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Box, Image, Text} from 'native-base';
import React, {useState, useEffect} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import Button from '../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {addVehicle} from '../redux/actions/vehicles';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {myOrder} from '../redux/actions/transaction';

const AddItem = ({navigation}) => {
  const BACKEND_URL = 'http://192.168.43.195:5000';
  const location = [
    'Ngawi',
    'Bandung',
    'Jakarta',
    'Yogyakarta',
    'Depok',
    'Bali',
    'Malang',
  ];
  const categories = [
    {name: 'Cars', id: 1},
    {name: 'Motorbike', id: 2},
    {name: 'Bike', id: 3},
    {name: 'Pickup', id: 5},
  ];
  const [selectedLocation, setSelectedLocation] = useState();
  const [qty, setQty] = useState(1);
  const [capacity, setCapcity] = useState(1);
  const [image, setImage] = useState();
  const [idCategory, setIdCategory] = useState();
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();

  const {auth, addVehicle: addVehicleState} = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (addVehicleState.isSuccess) {
      dispatch(myOrder(addVehicleState.results.idVehicle));
    }
  }, [addVehicleState.isSuccess, addVehicleState.results.idVehicle, dispatch]);

  const addImage = async () => {
    const photo = await launchImageLibrary({});
    setImage(photo.assets[0]);
  };

  const handleSave = () => {
    dispatch(
      addVehicle(
        idCategory,
        brand,
        image,
        capacity,
        selectedLocation,
        price,
        qty,
        auth.token,
      ),
    );
  };

  const test = () => {
    console.log('testt', addVehicleState);
  };

  const increment = (state, setState) => {
    setState(state + 1);
  };
  const decrement = (state, setState) => {
    if (state > 1) {
      setState(state - 1);
    }
  };

  return (
    <Box p="5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flexDirection={'row'} justifyContent="space-between">
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
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
          {image ? (
            <Image
              source={{
                uri: image.uri,
              }}
              width={150}
              alt={image.fileName}
              height={150}
              style={styles.imgWrapper}
            />
          ) : (
            <Box background={'gray.200'} style={styles.imgWrapper}>
              <Image
                source={require('../assets/img/upload.png')}
                size={60}
                alt="upload"
                resizeMode="contain"
              />
            </Box>
          )}
          <TouchableOpacity onPress={addImage}>
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
          <Button onPress={test}>Test</Button>
        </Box>
        <Box
          flexDirection="column"
          justifyContent={'center'}
          alignItems="center">
          <Box style={styles.formTop}>
            <TextInput
              textAlign="center"
              style={styles.input1}
              placeholder="Product name min 30 characters"
              onChangeText={setBrand}
            />
            <TextInput
              textAlign="center"
              style={styles.input1}
              keyboardType="number-pad"
              placeholder="Product price"
              onChangeText={setPrice}
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
              selectedValue={idCategory}
              onValueChange={(itemValue, itemIndex) =>
                setIdCategory(itemValue)
              }>
              {/* <Picker.item label="Select Location" color="gray" value={null} /> */}
              {categories.map((data, index) => (
                <Picker.Item
                  label={data.name}
                  value={data.id}
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
              Stock
            </Text>
            <Box flexDirection={'row'}>
              <TouchableOpacity
                style={styles.counter}
                onPress={() => increment(qty, setQty)}>
                <Text fontSize={'lg'} bold>
                  +
                </Text>
              </TouchableOpacity>
              <Text fontSize={'lg'} mx={'4'} bold>
                {qty}
              </Text>
              <TouchableOpacity
                style={styles.counter}
                onPress={() => decrement(qty, setQty)}>
                <Text fontSize={'xl'} bold>
                  -
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <Box
            mt="4"
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems="center">
            <Text fontSize={'lg'} my={'3'} bold>
              Capacity
            </Text>
            <Box flexDirection={'row'}>
              <TouchableOpacity
                style={styles.counter}
                onPress={() => increment(capacity, setCapcity)}>
                <Text fontSize={'lg'} bold>
                  +
                </Text>
              </TouchableOpacity>
              <Text fontSize={'lg'} mx={'4'} bold>
                {capacity}
              </Text>
              <TouchableOpacity
                style={styles.counter}
                onPress={() => decrement(capacity, setCapcity)}>
                <Text fontSize={'xl'} bold>
                  -
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
        <Box my="5">
          <Button color="primary" onPress={handleSave}>
            Save Product
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
