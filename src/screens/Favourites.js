import {FlatList, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Box, Image, Text} from 'native-base';
import React, {useState} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import priceFormat from '../helper/priceFormat';
import {useDispatch, useSelector} from 'react-redux';
import {deleteFavourite} from '../redux/actions/favourite';
import {myOrder} from '../redux/actions/transaction';

const Favourites = ({navigation}) => {
  const [errImg, setErrImg] = useState(false);

  const {favourite: favouriteState} = useSelector(state => state);

  const dispatch = useDispatch();

  const handleDelete = id => {
    const filterFav = favouriteState.results.filter(
      data => data.idVehicle !== id,
    );
    dispatch(deleteFavourite(filterFav));
    console.log(id);
    console.log();
    console.log(filterFav);
  };

  const handleOrder = id => {
    dispatch(myOrder(id));
    navigation.navigate('Order');
  };

  return (
    <Box p="5">
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <EntypoIcon name="chevron-left" color="black" size={39} />
        <Text fontSize={'3xl'} pl="2" bold>
          Your Favourites
        </Text>
      </TouchableOpacity>
      {favouriteState.results?.length > 0 && (
        <Text color={'gray.500'} my="5" textAlign={'center'}>
          Tap love to unlike
        </Text>
      )}
      <Box style={styles.listWrapper}>
        {favouriteState.results?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favouriteState.results}
            renderItem={({item, index}) => (
              <Box
                justifyContent={'space-between'}
                alignItems="center"
                flexDirection="row">
                <TouchableOpacity
                  style={styles.listVehicles}
                  onPress={() => handleOrder(item.idVehicle)}>
                  <View style={styles.left}>
                    <Image
                      source={
                        item.image
                          ? !errImg
                            ? {uri: item.image}
                            : require('../assets/img/defaultItem.jpg')
                          : require('../assets/img/no-image.jpg')
                      }
                      alt="photo product"
                      resizeMode={'cover'}
                      width={130}
                      height={100}
                      borderRadius={30}
                      onError={setErrImg}
                      style={styles.image}
                    />
                  </View>
                  <Box style={styles.right} ml="5">
                    <Text fontSize={'lg'} bold>
                      {item.brand}
                    </Text>
                    <Text>
                      {moment(item.rentStart).format('MMM DD')} to{' '}
                      {moment(item.rentStart)
                        .add(item.totalDay)
                        .format('MMM DD YYYY')}
                    </Text>
                    {item.payment ? (
                      <Text bold>Prepayment: {priceFormat(item.payment)}</Text>
                    ) : (
                      <Text bold>No prepayment</Text>
                    )}
                    <Text bold>{item.location}</Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.badgeDelete}
                  onPress={() => handleDelete(item.idVehicle)}>
                  <AntIcon name="heart" color={'#49BEB7'} size={30} />
                </TouchableOpacity>
              </Box>
            )}
          />
        ) : (
          <Box my="20">
            <Text textAlign={'center'} fontSize="2xl" bold>
              Your Favourite is Empty
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listWrapper: {
    paddingBottom: 200,
  },
  listVehicles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
    width: '90%',
  },
});

export default Favourites;
