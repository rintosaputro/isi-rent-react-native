import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Container, Center} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
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
      <ScrollView>
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
            <Icon name="search" size={20} style={styles.searchIcon} />
          </View>
        </ImageBackground>
        {typeProduct.map((data, index) => {
          return (
            <View style={styles.wrapperProduct} key={index}>
              <View style={styles.topProduct}>
                <Text style={styles.type}>{data}</Text>
                <View style={styles.more}>
                  <Text>View More</Text>
                  <Icon2 name="navigate-next" size={20} />
                </View>
              </View>
              <View>
                <FlatList
                  data={dataProduct}
                  horizontal={true}
                  style={styles.flat}
                  renderItem={({item}) => {
                    return (
                      <ImageBackground
                        source={item.image}
                        style={styles.imgProduct}
                        resizeMode="cover"
                      />
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
    paddingHorizontal: 15,
  },
  searchIcon: {
    color: '#fff',
    position: 'absolute',
    right: 40,
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
