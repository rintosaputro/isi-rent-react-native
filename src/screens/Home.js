/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {getCategory} from '../redux/actions/vehicles';
import {getDetailCategory} from '../redux/actions/detailCategory';

const DetailTop = ({category, onPress}) => {
  return (
    <View style={styles.topProduct}>
      <Text style={styles.type}>{category}</Text>
      <TouchableOpacity style={styles.more} onPress={onPress}>
        <Text>View More</Text>
        <Icon2 name="navigate-next" size={20} />
      </TouchableOpacity>
    </View>
  );
};
const FlatListSection = ({dataList, onPress}) => {
  return (
    <FlatList
      data={dataList}
      horizontal={true}
      style={styles.flat}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity onPress={onPress}>
            <ImageBackground
              source={
                item.image
                  ? {uri: item.image.replace(/localhost/g, '192.168.43.195')}
                  : require('../assets/img/no-image.jpg')
              }
              style={styles.imgProduct}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {cars, motorbike, bike, pickup} = useSelector(state => state);

  useEffect(() => {
    dispatch(getCategory('CAR'));
    dispatch(getCategory('MOTORBIKE'));
    dispatch(getCategory('BIKE'));
    dispatch(getCategory('PICKUP'));
  }, []);

  const gotoDetail = (nameCategory, idCategory) => {
    dispatch(getDetailCategory(nameCategory, idCategory));
    navigation.navigate('DetailCategory');
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/img/home.png')}
          alt="home header"
          style={styles.image}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#fff"
              placeholder="Search Vehicle"
            />
            <TouchableOpacity
              style={styles.iconSearchWrap}
              onPress={() => navigation.navigate('SearchList')}>
              <Icon name="search" size={20} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.wrapperProduct}>
          <DetailTop
            onPress={() => gotoDetail('cars', cars.results[0].idCategory)}
            category="Car"
          />
          <View>
            <FlatListSection
              dataList={cars.results}
              onPress={() => navigation.navigate('Order')}
            />
          </View>
        </View>
        <View style={styles.wrapperProduct}>
          <DetailTop
            onPress={() =>
              gotoDetail('motorbike', motorbike.results[0].idCategory)
            }
            category="Motorbike"
          />
          <View>
            <FlatListSection
              dataList={motorbike.results}
              onPress={() => navigation.navigate('Order')}
            />
          </View>
        </View>
        <View style={styles.wrapperProduct}>
          <DetailTop
            onPress={() => gotoDetail('bike', bike.results[0].idCategory)}
            category="Bike"
          />
          <View>
            <FlatListSection
              dataList={bike.results}
              onPress={() => navigation.navigate('Order')}
            />
          </View>
        </View>
        <View style={styles.wrapperProduct}>
          <DetailTop
            onPress={() => gotoDetail('pickup', pickup.results[0].idCategory)}
            category="Pickup"
          />
          <View>
            <FlatListSection
              dataList={pickup.results}
              onPress={() => navigation.navigate('Order')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 290,
  },
  form: {
    padding: 20,
    justifyContent: 'center',
    marginTop: 45,
    position: 'relative',
  },
  input: {
    height: 60,
    color: '#fff',
    backgroundColor: 'rgba(34, 47, 62,0.6)',
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
  searchIcon: {
    color: '#fff',
  },
  wrapperProduct: {
    padding: 20,
  },
  topProduct: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  more: {
    flexDirection: 'row',
  },
  imgWrapper: {
    width: 250,
    marginTop: 10,
    height: 200,
    borderRadius: 10,
  },
  imgProduct: {
    marginRight: 20,
    width: 300,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default Home;
