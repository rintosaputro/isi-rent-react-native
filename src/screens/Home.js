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
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
  const dataProduct = [
    {image: require('../assets/imgDummy/car.jpg'), text: 'test'},
    {image: require('../assets/imgDummy/motor.jpg'), text: 'test'},
    {image: require('../assets/imgDummy/scoter.jpg'), text: 'test'},
    {image: require('../assets/imgDummy/motor.jpg'), text: 'test'},
    {image: require('../assets/imgDummy/car.jpg'), text: 'test'},
    {image: require('../assets/imgDummy/motor.jpg'), text: 'test'},
  ];
  const typeProduct = ['Cars', 'Motorbike', 'Bike'];

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
        {typeProduct.map((data, index) => {
          return (
            <View style={styles.wrapperProduct} key={index}>
              <View style={styles.topProduct}>
                <Text style={styles.type}>{data}</Text>
                <TouchableOpacity
                  style={styles.more}
                  onPress={() => navigation.navigate('DetailCategory')}>
                  <Text>View More</Text>
                  <Icon2 name="navigate-next" size={20} />
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  data={dataProduct}
                  horizontal={true}
                  style={styles.flat}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Order')}>
                        <ImageBackground
                          source={item.image}
                          style={styles.imgProduct}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          );
        })}
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
