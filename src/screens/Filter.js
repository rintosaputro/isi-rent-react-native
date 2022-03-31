import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Filter = () => {
  return (
    <View style={styles.backWrapper}>
      <View style={styles.top}>
        <TouchableOpacity style={styles.back}>
          <EntypoIcon
            name="chevron-left"
            size={30}
            style={styles.iconBack}
            color="black"
          />
          <Text fontSize={20} bold>
            Filter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn}>
          <Text>RESET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // filterScreen
  backWrapper: {
    padding: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBack: {
    marginRight: 10,
  },
  resetBtn: {
    backgroundColor: '#dcdde1',
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Filter;
