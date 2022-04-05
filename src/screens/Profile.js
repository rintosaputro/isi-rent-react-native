import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state);
  const handleLogout = () => {
    dispatch({
      type: 'AUTH_LOGOUT',
    });
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Image
          size={69}
          resizeMode={'contain'}
          borderRadius={200}
          source={
            profile.results.image
              ? {
                  uri: profile.results.image.replace(
                    /localhost/g,
                    '192.168.43.195',
                  ),
                }
              : require('../assets/img/no-pp.jpg')
          }
          alt="Photo profile"
        />
        <Text bold fontSize="2xl" style={styles.name}>
          {profile.results.name || profile.results.username}
        </Text>
      </View>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => navigation.navigate('Favourites')}>
            <Text fontSize="2xl">Your favourites</Text>
            <FaIcon name="chevron-right" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text fontSize="2xl">FAQ</Text>
            <FaIcon name="chevron-right" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text fontSize="2xl">Help</Text>
            <FaIcon name="chevron-right" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => navigation.navigate('UpdateProfile')}>
            <Text fontSize="2xl">Update profile</Text>
            <FaIcon name="chevron-right" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnWrapper}>
          <Button color="primary" onPress={handleLogout}>
            Log out
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    height: '100%',
  },
  container: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 19,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  name: {
    marginLeft: 30,
  },
  list: {
    paddingVertical: 20,
  },
  linkItem: {
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnWrapper: {
    // flex: 1,
  },
});

export default Profile;
