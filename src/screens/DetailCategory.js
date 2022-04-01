import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import VehicleList from '../components/VehicleList';

const DetailCategory = ({navigation: {goBack}}) => {
  const listVehicles = [
    {
      name: 'Vespa Matic',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/motor.jpg'),
      rating: 4,
    },
    {
      name: 'Jupiter',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/scoter.jpg'),
      rating: 4,
    },
    {
      name: 'Honda Supra',
      seet: 2,
      stock: 2,
      price: 20000,
      image: require('../assets/imgDummy/motor.jpg'),
      rating: 4,
    },
    {
      name: 'Ymah KLX',
      seet: 2,
      stock: 1,
      price: 20000,
      image: require('../assets/imgDummy/car.jpg'),
      rating: 4,
    },
    {
      name: 'Monkey',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/scoter.jpg'),
      rating: 4,
    },
    {
      name: 'Vespa',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/motor.jpg'),
      rating: 4,
    },
    {
      name: 'Matic',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/motor.jpg'),
      rating: 4,
    },
    {
      name: 'Matic',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/car.jpg'),
      rating: 4,
    },
    {
      name: 'Vespa Matic',
      seet: 2,
      stock: 3,
      price: 20000,
      image: require('../assets/imgDummy/scoter.jpg'),
      rating: 4,
    },
  ];
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {listVehicles.map((data, index) => {
        return (
          <VehicleList
            image={data.image}
            name={data.name}
            seet={data.seet}
            stock={data.stock}
            price={data.price}
            key={index}
          />
          // <View style={styles.listVehicles} key={index}>
          //   <View style={styles.left}>
          //     <Image
          //       source={data.image}
          //       alt={data.name}
          //       resizeMode={'cover'}
          //       width={150}
          //       height={120}
          //       borderRadius={30}
          //       style={styles.image}
          //     />
          //     <LinearGradient
          //       start={{x: 0, y: 0}}
          //       end={{x: 1, y: 0}}
          //       colors={['#01a3a4', '#49BEB7', '#32DBC6']}
          //       style={styles.rate}>
          //       <Text bold color="white" fontSize={'md'}>
          //         4.5
          //       </Text>
          //       <FaIcon
          //         name="star"
          //         color="white"
          //         size={20}
          //         style={styles.iconRate}
          //       />
          //     </LinearGradient>
          //   </View>
          //   <View style={styles.right}>
          //     <View>
          //       <Text fontSize={'lg'} bold>
          //         {data.name}
          //       </Text>
          //       <Text>Max for {data.seet} person</Text>
          //       <Text>2.1 km from your location</Text>
          //       {data.stock <= 2 ? (
          //         <Text bold color="#d63031">
          //           {data.stock} bikes left
          //         </Text>
          //       ) : (
          //         <Text bold color="#49BEB7">
          //           Available
          //         </Text>
          //       )}
          //     </View>
          //     <Text fontSize={'lg'} bold style={styles.price}>
          //       Rp.12000/day
          //     </Text>
          //   </View>
          // </View>
        );
      })}
      <View style={styles.bottom} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  listVehicles: {
    flexDirection: 'row',
    marginVertical: 18,
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
    marginLeft: 35,
    justifyContent: 'space-between',
  },
  bottom: {
    paddingBottom: 40,
  },
});

export default DetailCategory;
