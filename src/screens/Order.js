import {
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Rate from '../components/Rate';
import {Box, Text, Badge} from 'native-base';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';

import priceFormat from '../helper/priceFormat';
import checkImage from '../helper/checkImage';
import Button from '../components/Button';
import InputBorderBottom from '../components/InputBorderBottom';

import {
  deleteVehicle,
  getCategory,
  getDetailVehicle,
  updateVehicle,
} from '../redux/actions/vehicles';
import {detailOrder} from '../redux/actions/transaction';
import {goToVerify} from '../redux/actions/verify';
import {addFavourite, deleteFavourite} from '../redux/actions/favourite';

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
  const [file, setFile] = useState();
  const [chBrand, setChBrand] = useState();
  const [chPrice, setChPrice] = useState();
  // const [chCapacity, setChCapacity] = useState();
  const [chLocation, setChLocation] = useState();
  const [chQty, setChQty] = useState(0);
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isStart, setIsStart] = useState(false);
  const [endDate, setEndDate] = useState(1);
  const [stock, setStock] = useState();
  const [isChange, setIsChange] = useState();
  const [isErr, setIsErr] = useState();
  const [errMessage, setErrMessage] = useState();
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    myOrder,
    detailVehicle,
    profile,
    auth,
    deleteVehicle: delVehicleState,
    updateVehicle: updVehicleState,
    favourite: favouriteState,
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'ADD_VEHICLE_CLEAR'});
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDetailVehicle(myOrder.idVehicle));
  }, [dispatch, myOrder.idVehicle]);

  useEffect(() => {
    if (favouriteState.results.length > 0) {
      const isFav = favouriteState.results.filter(
        data => data.idVehicle === detailVehicle.results.idVehicle,
      );
      if (isFav.length > 0) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favouriteState]);

  useEffect(() => {
    if (updVehicleState.isSuccess) {
      setMessageSuccess(true);
      if (detailVehicle.results.type === 'Cars') {
        dispatch(getCategory('CAR'));
      } else {
        dispatch(getCategory(detailVehicle.results.type.toUpperCase()));
      }
      dispatch({type: 'UPD_VEHICLE_CLEAR'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updVehicleState.isSuccess]);
  useEffect(() => {
    if (messageSuccess) {
      setTimeout(() => {
        setMessageSuccess(false);
      }, 8000);
    }
  }, [messageSuccess]);

  useEffect(() => {
    if (delVehicleState.isSuccess) {
      if (detailVehicle.results.type === 'Cars') {
        dispatch(getCategory('CAR'));
      } else {
        dispatch(getCategory(detailVehicle.results.type.toUpperCase()));
      }
      // dispatch({type: 'DEL_VEHICLE_CLEAR'});
      // navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delVehicleState.isSuccess]);

  const handleBack = () => {
    dispatch({type: 'GET_DETAIL_VEHICLE_CLEAR'});
    navigation.goBack();
  };

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
  };
  const handleVerify = () => {
    dispatch({type: 'AUTH_LOGOUT'});
    dispatch(goToVerify);
  };

  const {
    type,
    idVehicle,
    brand,
    capacity,
    payment,
    location,
    price,
    qty,
    image,
  } = detailVehicle.results;

  const handleFavourite = () => {
    if (favorite) {
      setFavorite(false);
      const filterFav = favouriteState.results.filter(
        data => data.idVehicle !== idVehicle,
      );
      dispatch(deleteFavourite(filterFav));
    } else {
      setFavorite(true);
      const data = {
        idVehicle,
        image,
        brand,
        payment,
        rentStart: date,
        totalDay: endDate,
        location,
      };
      dispatch(addFavourite(data));
    }
  };

  const getFile = async () => {
    const picture = await launchImageLibrary({});
    setFile(picture.assets[0]);
    setIsChange(true);
  };

  const test = () => {
    setErrMessage();
    setIsErr(false);
    let err = false;
    const data = {
      location: chLocation,
      // brand: chBrand,
      // price: chPrice,
      // qty: chQty !== 0 ? chQty : qty,
      image: file,
      status: stock,
    };
    const pola = /\D/g;
    if (chQty !== 0) {
      data.qty = chQty;
    }
    if (chBrand) {
      data.brand = chBrand;
    }
    if (chPrice) {
      if (pola.test(chPrice)) {
        setErrMessage('Price must be number');
        setIsErr(true);
        err = true;
      } else {
        data.price = chPrice;
      }
    }
    if (Number(file?.fileSize) >= 2000000) {
      setIsErr(true);
      err = true;
      setErrMessage(
        'File image is to large. Make sure the size is less than 2mb',
      );
    }
    if (!err) {
      dispatch(updateVehicle(auth.token, idVehicle, data));
    }
  };

  const handleDelete = () => {
    dispatch(deleteVehicle(auth.token, detailVehicle.results.idVehicle));
  };

  const testing = () => {
    console.log(file);
  };

  return (
    <ScrollView>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={
            file?.uri
              ? {uri: file.uri}
              : image
              ? checkImage(image)
                ? {uri: image}
                : require('../assets/img/defaultItem.jpg')
              : require('../assets/img/no-image.jpg')
          }
          alt={brand}
          style={styles.imageProduct}>
          <View style={styles.opacity}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backWrapper}>
                <Icon name="angle-left" size={45} color="white" />
              </TouchableOpacity>
              {profile.results.username === 'Admin' ? (
                <View style={styles.rateWrapperAdmin}>
                  <View style={styles.rate}>
                    <Rate rate={4.5} />
                  </View>
                </View>
              ) : (
                <View style={styles.rateWrapper}>
                  <View style={styles.rate}>
                    <Rate rate={4.5} />
                  </View>

                  <TouchableOpacity
                    style={styles.favorite}
                    onPress={handleFavourite}>
                    <Icon
                      name={favorite ? 'heart' : 'heart-o'}
                      size={35}
                      color={favorite ? '#49BEB7' : 'white'}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {profile.results.username === 'Admin' && (
              <TouchableOpacity style={styles.changeImg} onPress={getFile}>
                <Icon
                  color="#fff"
                  name="pencil"
                  size={30}
                  style={styles.iconChange}
                />
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    {delVehicleState.isError
                      ? delVehicleState.errMessage
                      : delVehicleState.isSuccess
                      ? 'Successfully deleted Vehicle!'
                      : 'Are you sure to delete this vehicle?'}
                  </Text>
                  <Box
                    mt={'5'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    style={styles.btnModalWrap}>
                    {delVehicleState.isSuccess ? (
                      <Pressable
                        style={[styles.button, styles.buttonConfirm]}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          dispatch({type: 'DEL_VEHICLE_CLEAR'});
                          navigation.goBack();
                        }}>
                        <Text style={styles.textStyle}>Ok!</Text>
                      </Pressable>
                    ) : (
                      <>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.buttonConfirm]}
                          onPress={handleDelete}>
                          <Text style={styles.textStyle}>Delete</Text>
                        </Pressable>
                      </>
                    )}
                  </Box>
                </View>
              </View>
            </Modal>
          </View>
          {updVehicleState.isError ||
            delVehicleState.isError ||
            (isErr && (
              <Box justifyContent={'center'} py="5">
                <Text
                  textAlign={'center'}
                  color="danger.700"
                  fontSize={'xl'}
                  bold>
                  {updVehicleState.errMessage ||
                    delVehicleState.errMessage ||
                    errMessage}
                </Text>
              </Box>
            ))}
          {messageSuccess && (
            <Box justifyContent={'center'} py="5">
              <Text
                textAlign={'center'}
                // color="danger.700"
                fontSize={'xl'}
                bold>
                Update Product Success!
              </Text>
            </Box>
          )}
          <Box style={styles.topDetail}>
            {profile.results?.username === 'Admin' ? (
              <Box style={styles.wrapBrand}>
                <InputBorderBottom
                  defaultValue={brand}
                  placeholder={brand}
                  onChangeText={value => {
                    setChBrand(value);
                    setIsChange(true);
                  }}
                  border
                />
              </Box>
            ) : (
              <Text fontSize={'3xl'} bold>
                {brand}
              </Text>
            )}
            {profile.results?.username === 'Admin' ? (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name="trash" size={35} color="#32DBC6" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Icon name="comment-o" size={35} color="#32DBC6" />
              </TouchableOpacity>
            )}
          </Box>
          {profile.results?.username === 'Admin' ? (
            <>
              <Box mb="3">
                <InputBorderBottom
                  keyboard={'numeric'}
                  placeholder={priceFormat(price) + '/day'}
                  onChangeText={value => {
                    setChPrice(value);
                    setIsChange(true);
                  }}
                  border
                  price
                />
              </Box>
            </>
          ) : (
            <>
              <Text mb="1.5" fontSize={'3xl'} bold>
                {priceFormat(price)}/day
              </Text>
            </>
          )}
          <Text fontSize={'lg'}>Max for {capacity} person</Text>
          <Text fontSize={'lg'}>
            {payment ? 'Prepayment' : 'No prepayment'}
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
          {profile.results?.username === 'Admin' ? (
            <Box style={styles.location}>
              <Badge
                my={'2'}
                mr="2"
                colorScheme="light"
                py={'2'}
                width={'9'}
                style={styles.borderBadge}>
                <Icon name={'map-marker'} size={20} color="#49BEB7" />
              </Badge>
              <InputBorderBottom
                defaultValue={location}
                placeholder={location}
                onChangeText={value => {
                  setChLocation(value);
                  setIsChange(true);
                }}
              />
            </Box>
          ) : (
            <LocationSection address={location} icon={'map-marker'} />
          )}
          <LocationSection
            address="3.2 miles from your location"
            icon="street-view"
          />
          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems="center">
            <Text fontSize={'lg'} my={'3'} bold>
              {profile.results?.username === 'Admin'
                ? 'Update stock'
                : `Select ${type}`}
            </Text>
            {profile.results?.username === 'Admin' ? (
              <Box flexDirection={'row'}>
                <TouchableOpacity
                  style={styles.counter}
                  onPress={() => {
                    setChQty(chQty + 1);
                    setIsChange(true);
                  }}>
                  <Text fontSize={'lg'} bold>
                    +
                  </Text>
                </TouchableOpacity>
                <Text fontSize={'lg'} mx={'4'} bold>
                  {chQty > 0 ? chQty : qty}
                </Text>
                <TouchableOpacity
                  style={styles.counter}
                  onPress={() => {
                    chQty > 1 && setChQty(chQty - 1);
                    chQty !== 0 && setIsChange(true);
                  }}>
                  <Text fontSize={'xl'} bold>
                    -
                  </Text>
                </TouchableOpacity>
              </Box>
            ) : (
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
            )}
          </Box>
          {profile.results?.username === 'Admin' ? (
            <TouchableOpacity style={styles.updStock}>
              <Picker
                selectedValue={stock}
                onValueChange={(itemValue, itemIndex) => setStock(itemValue)}>
                <Picker.Item label="Update stock status" color="gray" />
                <Picker.Item value="1" label="Available" color="black" />
                <Picker.Item value="2" label="Full Booked" color="black" />
              </Picker>
            </TouchableOpacity>
          ) : (
            <Box my={'2'} justifyContent="space-between" flexDirection={'row'}>
              <TouchableOpacity style={styles.startDate}>
                <TouchableOpacity
                  title={String(date)}
                  onPress={() => setOpen(true)}>
                  <Text style={styles.textBtn}>
                    {isStart
                      ? moment(date).format('MMM DD YYYY')
                      : 'Select date'}
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
                  onValueChange={(itemValue, itemIndex) =>
                    setEndDate(itemValue)
                  }>
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
          )}
          {profile.results?.username === 'Admin' ? (
            !isChange ? (
              <Box
                justifyContent={'center'}
                py="4"
                background={'gray.400'}
                mt={'25'}
                style={styles.fakeBtn}>
                <Text textAlign={'center'} fontSize="xl" color="gray.300" bold>
                  Save change
                </Text>
              </Box>
            ) : (
              <Box mt={'25'}>
                <Button color={'primary'} onPress={test}>
                  Update Item
                </Button>
              </Box>
            )
          ) : profile.results?.confirm === '0' ? (
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
  rateWrapperAdmin: {
    paddingRight: 15,
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
  changeImg: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 140,
    paddingBottom: 10,
    paddingTop: 80,
  },
  iconChange: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    backgroundColor: '#49BEB7',
    borderRadius: 10,
  },
  container: {
    padding: 20,
  },
  wrapBrand: {
    maxWidth: '85%',
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
  updStock: {
    borderRadius: 10,
    backgroundColor: 'rgba(57, 57, 57, 0.15)',
    // paddingVertical: 3,
    marginTop: 10,
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
  fakeBtn: {
    // backgroundColor: 'gray',
    borderRadius: 10,
  },

  //Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 6,
    elevation: 95,
  },
  btnModalWrap: {
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 39,
    elevation: 2,
    marginHorizontal: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'gray',
  },
  buttonConfirm: {
    backgroundColor: '#49BEB7',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Order;
