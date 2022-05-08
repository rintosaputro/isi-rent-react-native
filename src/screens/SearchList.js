import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import VehicleList from '../components/VehicleList';
import {getFilter} from '../redux/actions/vehicles';
import {myOrder} from '../redux/actions/transaction';

const SearchList = ({navigation}) => {
  const [filter, setFilter] = useState(true);
  const [errImg, setErrImg] = useState();
  const [key, setKey] = useState();

  const dispatch = useDispatch();

  const {filterVehicle} = useSelector(state => state);

  const showFilter = () => {
    setFilter(!filter);
  };

  const handleSearch = () => {
    const dataFilter = {search: key};
    dispatch(getFilter(dataFilter));
  };

  const handleOrder = id => {
    dispatch(myOrder(id));
    navigation.navigate('Order');
  };

  const nextPage = () => {
    if (filterVehicle.pageInfo.next) {
      dispatch(
        getFilter(
          filterVehicle.dataFilter,
          filterVehicle.pageInfo.currentPage + 1,
        ),
      );
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#fff"
          placeholder={filterVehicle.keywoard}
          onChangeText={setKey}
          defaultValue={key}
        />
        <TouchableOpacity style={styles.iconSearchWrap} onPress={handleSearch}>
          <FaIcon name="search" size={20} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.filter}
          onPress={() => navigation.navigate('Filter')}>
          <Icon name="filter" size={20} />
          <Text>Filter Search</Text>
        </TouchableOpacity>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filterVehicle.results}
          onEndReachedThreshold={0.2}
          onEndReached={nextPage}
          renderItem={({item, index}) => (
            <>
              <TouchableOpacity
                onPress={() => handleOrder(item.idVehicle)}
                key={index}>
                <VehicleList
                  name={item.brand}
                  seet={item.capacity}
                  stock={item.qty}
                  price={item.price}
                  Image={() => (
                    <Image
                      alt={item.brand}
                      source={
                        item.image
                          ? !errImg
                            ? {uri: item.image}
                            : require('../assets/img/defaultItem.jpg')
                          : require('../assets/img/no-image.jpg')
                      }
                      onError={setErrImg}
                      style={styles.img}
                    />
                  )}
                />
              </TouchableOpacity>
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    marginBottom: 120,
  },
  container: {
    padding: 20,
    marginBottom: 120,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 19,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  form: {
    padding: 20,
    justifyContent: 'center',
    // marginTop: 10,
    position: 'relative',
  },
  input: {
    height: 60,
    color: '#fff',
    backgroundColor: 'rgba(34, 47, 62,0.3)',
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 0,
  },
  iconSearchWrap: {
    position: 'absolute',
    right: 40,
    height: '100%',
    width: 90,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  alert: {},
  textAlert: {
    paddingVertical: 20,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 30,
  },
  img: {
    width: 150,
    height: 120,
    borderRadius: 30,
    resizeMode: 'cover',
  },
});

export default SearchList;
