import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Text, Image, Center, Radio, Stack} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {updateProfile} from '../redux/actions/user';

const UpdateProfile = ({navigation: {goBack}}) => {
  const [changed, setChanged] = useState({
    image,
    gender: '',
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    birthdate: '',
    address: '',
  });
  const [open, setOpen] = useState();
  const [date, setDate] = useState(new Date());
  const [isStart, setIsStart] = useState(false);

  const {profile, auth} = useSelector(state => state);
  const dispatch = useDispatch();

  const {
    name,
    username,
    gender,
    image,
    email,
    phoneNumber,
    birthdate,
    address,
  } = profile.results;

  const dataInput = [
    {
      label: 'Name',
      value: name,
      keyObj: 'name',
    },
    {
      label: 'User Name',
      value: username,
      keyObj: 'username',
    },
    {
      label: 'Email Address',
      value: email,
      type: 'email-address',
      keyObj: 'email',
    },
    {
      label: 'Phone Number',
      value: phoneNumber,
      type: 'phone-pad',
      keyObj: 'phoneNumber',
    },
  ];

  const getFile = async () => {
    const file = await launchImageLibrary({});
    setChanged({...changed, image: file.assets[0]});
  };

  const saveChanged = () => {
    dispatch(updateProfile(auth.token, changed));
  };

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <View style={styles.profilePict}>
            <Center>
              <Image
                size={99}
                resizeMode={'contain'}
                borderRadius={200}
                source={
                  changed.image
                    ? {uri: changed.image.uri}
                    : profile.results.image
                    ? {
                        uri: image.replace(/localhost/g, '192.168.43.195'),
                      }
                    : require('../assets/img/no-pp.jpg')
                }
                alt="Photo profile"
              />
            </Center>
            <TouchableOpacity style={styles.iconEdit} onPress={getFile}>
              <MaterialIcon
                color="white"
                name="pencil-outline"
                style={styles.iconPen}
                size={21}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.radioGrup}>
            <Radio.Group defaultValue={gender} name="myRadioGroup">
              <Stack
                direction={{base: 'row'}}
                alignItems="center"
                space={4}
                w="75%"
                maxW="300px">
                <Radio value="Female" my={1}>
                  <Text style={styles.textRadio}>Female</Text>
                </Radio>
                <Radio value="Male" my={1}>
                  <Text style={styles.textRadio}>Male</Text>
                </Radio>
              </Stack>
            </Radio.Group>
          </View>
          {dataInput.map((data, index) => {
            return (
              <View key={index}>
                <Text style={styles.label}>{data.label}:</Text>
                <TextInput
                  keyboardType={data.type}
                  defaultValue={data.value}
                  style={styles.input}
                  onChangeText={value =>
                    setChanged({...changed, [data.keyObj]: value})
                  }
                />
              </View>
            );
          })}
          <Text style={styles.label}>Date of Birth:</Text>
          {/* <TouchableOpacity style={styles.birthdate}> */}
          <TouchableOpacity
            style={styles.birthdate}
            title={String(birthdate)}
            onPress={() => setOpen(true)}>
            <Text>
              {isStart
                ? moment(changed.birthdate).format('MMM DD YYYY')
                : moment(birthdate).format('MMM DD YYYY')}
            </Text>
          </TouchableOpacity>
          <DatePicker
            style={styles.datePicker}
            fadeToColor="white"
            theme="dark"
            textColor="black"
            modal
            mode="date"
            open={open}
            date={date}
            maximumDate={new Date()}
            onConfirm={dateItem => {
              setOpen(false);
              setDate(dateItem);
              setChanged({...changed, birthdate: dateItem});
              setIsStart(true);
            }}
            onCancel={() => setOpen(false)}
          />
          <View>
            <Text style={styles.label}>Delivery Address:</Text>
            <TextInput
              defaultValue={address}
              style={styles.input}
              onChangeText={value => setChanged({...changed, address: value})}
            />
          </View>
          {/* </TouchableOpacity> */}
          <View style={styles.button}>
            <Button color="primary" onPress={saveChanged}>
              Save change
            </Button>
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
  birthdate: {
    height: 50,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 15,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 80,
    marginTop: 40,
  },
});

export default UpdateProfile;
