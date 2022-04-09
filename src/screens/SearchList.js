import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Box, Center} from 'native-base';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import VehicleList from '../components/VehicleList';
import {getFilter} from '../redux/actions/vehicles';
import {myOrder} from '../redux/actions/transaction';
import Button from '../components/Button';

const SearchList = ({navigation}) => {
  const [filter, setFilter] = useState(true);
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
    const splitKeyword = filterVehicle.keywoard.split('-');
    // console.log(filterVehicle.keywoard);
    // console.log(splitKeyword);
    console.log(filterVehicle.dataFilter);
    console.log(filterVehicle.pageInfo.currentPage);
    dispatch(
      getFilter(
        filterVehicle.dataFilter,
        filterVehicle.pageInfo.currentPage + 1,
      ),
    );
  };

  return (
    <View style={styles.mainWrapper}>
      {/* <View style={styles.search}>
        <TextInput
          placeholder="Motorbike-Sleman-January"
          placeholderTextColor="black"
          style={styles.input}
        />
        <Icon name="caretdown" size={15} />
      </View> */}
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {filterVehicle.results.map((data, index) => (
            <TouchableOpacity
              onPress={() => handleOrder(data.idVehicle)}
              key={index}>
              <VehicleList
                image={
                  data.image
                    ? {
                        uri: data.image.replace(/localhost/g, '192.168.43.195'),
                      }
                    : require('../assets/img/no-image.jpg')
                }
                name={data.brand}
                seet={data.capacity}
                stock={data.qty}
                price={data.price}
              />
            </TouchableOpacity>
          ))}
          {!filterVehicle.isLoading && filterVehicle.pageInfo.next && (
            <Box>
              <Button color="primary" onPress={nextPage}>
                Next
              </Button>
            </Box>
          )}
          {!filterVehicle.isLoading && filterVehicle.results.length === 0 && (
            <Center>
              <Box
                my="20"
                justifyContent={'center'}
                alignItems="center"
                style={styles.alert}>
                <Text style={styles.textAlert}>
                  Sorry, we couldn`t find any results
                </Text>
              </Box>
            </Center>
          )}
        </ScrollView>
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
    marginBottom: 140,
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
});

export default SearchList;
