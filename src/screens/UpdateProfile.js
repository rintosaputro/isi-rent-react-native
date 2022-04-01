import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Text, Image, Center, Radio, Stack} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';

const UpdateProfile = ({navigation: {goBack}}) => {
  const dataInput = [
    {label: 'Name', value: 'Rinto Saputro'},
    {label: 'Email Address', value: 'email@mail.com', type: 'email-address'},
    {label: 'Phone Number', value: '081111111113', type: 'name-phone-pad'},
    {label: 'Date of Birth', value: '1996-08-30'},
    {label: 'Delivery Address', value: 'Sine, Ngawi, East Java'},
  ];

  return (
    <View>
      <TouchableOpacity style={styles.back} onPress={() => goBack()}>
        <EntypoIcon
          name="chevron-left"
          color="black"
          size={35}
          style={styles.icon}
        />
        <Text fontSize={20} bold style={styles.textBack}>
          Update Profile
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.profilePict}>
            <Center>
              <Image
                size={99}
                resizeMode={'contain'}
                borderRadius={200}
                source={require('../assets/imgDummy/user.jpg')}
                alt="Photo profile"
              />
            </Center>
            <View style={styles.iconEdit}>
              <MaterialIcon
                color="white"
                name="pencil-outline"
                style={styles.iconPen}
                size={21}
              />
            </View>
          </View>
          <View style={styles.radioGrup}>
            <Radio.Group defaultValue="1" name="myRadioGroup">
              <Stack
                direction={{base: 'row'}}
                alignItems="center"
                space={4}
                w="75%"
                maxW="300px">
                <Radio value="1" my={1}>
                  <Text style={styles.textRadio}>Female</Text>
                </Radio>
                <Radio value="2" my={1}>
                  <Text style={styles.textRadio}>Male</Text>
                </Radio>
              </Stack>
            </Radio.Group>
          </View>
          {dataInput.map((data, index) => (
            <View key={index}>
              <Text style={styles.label}>{data.label}:</Text>
              <TextInput defaultValue={data.value} style={styles.input} />
            </View>
          ))}
          <View style={styles.button}>
            <Button color="primary">Save change</Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    fontWeight: 'bold',
  },
  textBack: {},
  profilePict: {
    marginTop: 10,
    justifyContent: 'center',
    position: 'relative',
  },
  iconEdit: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    right: 140,
    backgroundColor: '#49BEB7',
    padding: 9,
    borderRadius: 50,
  },
  radioGrup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textRadio: {
    marginLeft: 8,
  },
  label: {
    color: 'gray',
    marginTop: 20,
    marginBottom: 15,
  },
  input: {
    height: 50,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 15,
  },
  button: {
    marginBottom: 30,
    marginTop: 40,
  },
});

export default UpdateProfile;
