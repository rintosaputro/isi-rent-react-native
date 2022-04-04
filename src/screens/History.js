import {ScrollView} from 'react-native';
import {Text, Box} from 'native-base';
import React from 'react';
import VehicleList from '../components/VehicleList';

const History = () => {
  const dataDummy = {
    image: require('../assets/imgDummy/scoter.jpg'),
    name: 'Vespa',
    seet: 2,
    stock: 3,
    prices: 3000,
  };
  return (
    <Box p="4">
      <Text fontSize={'2xl'} textAlign="center">
        History Order
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mt="10" mb="10">
          {[...Array(5)].map((data, index) => {
            return (
              <VehicleList
                key={index}
                image={dataDummy.image}
                name={dataDummy.name}
                seet={dataDummy.seet}
                stock={dataDummy.stock}
                price={dataDummy.prices}
              />
            );
          })}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default History;
