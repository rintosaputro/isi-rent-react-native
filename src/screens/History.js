/* eslint-disable react-hooks/exhaustive-deps */
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Text, Image, Checkbox, Box, Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import priceFormat from '../helper/priceFormat';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getHistories, deleteHistory} from '../redux/actions/history';

const History = () => {
  const dataDummy = {
    image: require('../assets/imgDummy/scoter.jpg'),
    name: 'Vespa',
    seet: 2,
    stock: 3,
    prices: 3000,
    rentStartDate: '2022-04-11',
    rentEndDate: '2022-04-12',
  };

  const [select, setSelect] = useState();
  const [msgDelete, setMsgDelete] = useState();
  const {
    auth,
    profile,
    histories,
    deleteHistory: deleteState,
    addHistory,
  } = useSelector(state => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHistories(profile.results.username, auth.token));
  }, []);

  useEffect(() => {
    if (addHistory.isSuccess) {
      dispatch(getHistories(profile.results.username, auth.token));
    }
  }, [addHistory.isSuccess]);

  useEffect(() => {
    if (deleteState.isSuccess) {
      setMsgDelete(true);
      dispatch(getHistories(profile.results.username, auth.token));
      setTimeout(() => {
        setMsgDelete(false);
      }, 7000);
    }
  }, [deleteState.isSuccess]);

  const handleDelete = () => {
    if (select.length > 0) {
      dispatch(deleteHistory(select, auth.token));
    }
  };
  const test = () => {
    console.log(select);
  };

  return (
    <Box p="4" my="10">
      <Text fontSize={'3xl'} textAlign="center" bold>
        History Order
      </Text>
      {/* <Button onPress={test}>Test</Button> */}
      <Box mt={'5'} justifyContent="flex-end" style={styles.deleteWrap}>
        <Box
          alignItems={'flex-end'}
          style={styles.delete}
          flexDirection={'row'}>
          <TouchableOpacity onPress={handleDelete}>
            <Text color={'gray.500'} fontSize="lg" bold>
              {select && select.length > 0 ? 'Delete' : 'Select'}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
      {msgDelete && !histories.isLoading && (
        <Text fontSize={'xl'} py="3" style={styles.message} bold>
          History successfully deleted!
        </Text>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={histories.results}
        style={styles.flatList}
        renderItem={({item, index}) => (
          <Box
            justifyContent={'space-between'}
            alignItems="center"
            flexDirection="row">
            <View style={styles.listVehicles}>
              <View style={styles.left}>
                <Image
                  source={
                    item.image
                      ? {
                          uri: item.image.replace(
                            /localhost/g,
                            '192.168.43.195',
                          ),
                        }
                      : require('../assets/img/no-image.jpg')
                  }
                  alt={dataDummy.name}
                  resizeMode={'cover'}
                  width={130}
                  height={100}
                  borderRadius={30}
                  style={styles.image}
                />
              </View>
              <View style={styles.right}>
                <View>
                  <Text fontSize={'lg'} bold>
                    {item.brand}
                  </Text>
                  <Text>
                    {moment(item.rentStartDate).format('MMM DD')} to{' '}
                    {moment(item.rentEndDate).format('MMM DD YYYY')}
                  </Text>
                  {item.prepayment ? (
                    <Text bold>Prepayment: {priceFormat(item.prepayment)}</Text>
                  ) : (
                    <Text bold>No prepayment</Text>
                  )}
                  <Text bold color="#49BEB7">
                    Has been returned
                  </Text>
                </View>
              </View>
            </View>
            <Box style={styles.badgeDelete}>
              <Checkbox.Group onChange={setSelect}>
                <Checkbox
                  aria-label="checkbox"
                  size={'md'}
                  style={styles.checbox}
                  value={item.idHistory}
                />
              </Checkbox.Group>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  delete: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  message: {
    color: '#49BEB7',
  },
  flatList: {
    marginBottom: 38,
  },
  listVehicles: {
    flexDirection: 'row',
    marginVertical: 18,
    width: '90%',
  },
  left: {
    position: 'relative',
    width: '40%',
  },
  image: {},
  rate: {
    flexDirection: 'row',
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 20,
    position: 'absolute',
    right: -18,
    top: -10,
  },
  iconRate: {
    marginLeft: 8,
  },
  right: {
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  badgeDelete: {
    backgroundColor: '#55efc4',
    padding: 2,
    borderRadius: 10,
  },
  checbox: {
    // width: 30,
    borderRadius: 10,
    // backgroundColor: 'gray',
  },
  bottom: {
    marginBottom: 350,
  },
});

export default History;
