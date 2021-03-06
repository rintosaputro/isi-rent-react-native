import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, Image, Center, Radio, Stack, Box} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {getProfile, updateProfile} from '../redux/actions/user';
import {checkEmail, checkPhone} from '../helper/check';
import ImagePickerModal from '../components/ImagePickerModal';
import ModalMessage from '../components/ModalMessage';
import Icon from 'react-native-vector-icons/Fontisto';

const UpdateProfile = ({navigation: {goBack}}) => {
  const [changed, setChanged] = useState({
    image,
    gender: '',
    name: '',
    username: '',
    email: '',
    phone_number: '',
    birthdate: '',
    address: '',
  });
  const [open, setOpen] = useState();
  const [date, setDate] = useState(new Date());
  const [isStart, setIsStart] = useState(false);
  const [isChanged, setIsChanged] = useState();
  const [message, setMessage] = useState();
  const [errMessage, setErrMessage] = useState();
  const [isErr, setIsErr] = useState();
  const [errImg, setErrImg] = useState();
  const [visible, setVisible] = useState(false);
  const [mdlMessage, setMdlMessage] = useState(false);

  const {
    profile,
    auth,
    updateProfile: updateProfileState,
  } = useSelector(state => state);
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
      keyObj: 'phone_number',
    },
  ];

  useEffect(() => {
    if (updateProfileState.isSuccess && updateProfileState.results) {
      dispatch(getProfile(auth.token));
      setIsChanged(false);
      setMessage('Update profile successfully!');
      setMdlMessage(true);
      dispatch({type: 'UPD_PROFILE_CLEAR'});
      setChanged({
        image: null,
        gender: '',
        name: '',
        username: '',
        email: '',
        phone_number: '',
        birthdate: '',
        address: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProfileState.results]);
  useEffect(() => {
    if (updateProfileState.isError) {
      setMdlMessage(true);
    }
  }, [updateProfileState.isError]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(false);
      }, 8000);
    }
  }, [message]);

  const getFile = async () => {
    const file = await launchImageLibrary({});
    setChanged({...changed, image: file.assets[0]});
    setIsChanged(true);
    setVisible(false);
  };
  const getCamera = async () => {
    const file = await launchCamera({});
    setChanged({...changed, image: file.assets[0]});
    setIsChanged(true);
    setVisible(false);
  };

  const saveChanged = () => {
    setIsErr(false);
    setErrMessage('');
    setIsStart(false);
    let err;
    if (changed.email) {
      if (!checkEmail(changed.email)) {
        setIsErr(true);
        setErrMessage('Email is not valid!');
        err = true;
      }
    }
    if (changed.phone_number) {
      if (!checkPhone(changed.phone_number)) {
        setIsErr(true);
        setErrMessage('Phone number does not match!');
        err = true;
      }
    }
    if (changed.address) {
      if (changed.address.length < 20) {
        setIsErr(true);
        setErrMessage('Delivery address must be at least 20 characters');
        err = true;
      }
    }
    if (Number(changed.image?.fileSize) >= 2000000) {
      setIsErr(true);
      setErrMessage(
        'File image is to large. Make sure the size is less than 2mb',
      );
      err = true;
    }
    if (err) {
      setMdlMessage(true);
    }
    if (!err) {
      dispatch(updateProfile(auth.token, changed));
    }
  };

  const getGender = value => {
    setIsChanged(true);
    setChanged({...changed, gender: value});
  };

  return (
    <View>
      <ModalMessage
        isVisible={mdlMessage}
        onClose={() => setMdlMessage(false)}
        message={errMessage || updateProfileState.errMessage || message}
      />
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
              {changed.image?.uri ? (
                <Image
                  size={99}
                  resizeMode={'contain'}
                  borderRadius={200}
                  source={{uri: changed.image.uri}}
                  alt="Photo profile"
                />
              ) : (
                <Image
                  size={99}
                  resizeMode={'contain'}
                  borderRadius={200}
                  source={
                    profile.results?.image
                      ? errImg
                        ? require('../assets/img/defaultPict.png')
                        : {
                            uri: profile.results.image,
                          }
                      : require('../assets/img/no-pp.jpg')
                  }
                  alt="Photo profile"
                  onError={setErrImg}
                />
              )}
            </Center>
            <TouchableOpacity
              style={styles.iconEdit}
              onPress={() => setVisible(true)}>
              <MaterialIcon
                color="white"
                name="pencil-outline"
                style={styles.iconPen}
                size={21}
              />
            </TouchableOpacity>
          </View>
          <ImagePickerModal
            isVisible={visible}
            onClose={() => setVisible(false)}
            onImageLibrary={getFile}
            onCamera={getCamera}
          />
          <View style={styles.radioGrup}>
            <Radio.Group
              value={changed.gender || gender}
              name="myRadioGroup"
              onChange={value => getGender(value)}>
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
                  onChangeText={value => {
                    setChanged({...changed, [data.keyObj]: value});
                    setIsChanged(true);
                  }}
                />
              </View>
            );
          })}
          <Text style={styles.label}>Date of Birth:</Text>
          <TouchableOpacity
            style={styles.birthdate}
            title={String(birthdate)}
            onPress={() => setOpen(true)}>
            <Text>
              {isStart
                ? moment(changed.birthdate).format('MMM DD YYYY')
                : birthdate
                ? moment(birthdate).format('MMM DD YYYY')
                : ''}
            </Text>
            <Box display={'flex'} alignItems="flex-end">
              <Icon name="date" size={20} />
            </Box>
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
              setChanged({
                ...changed,
                birthdate: moment(dateItem).format('YYYY-MM-DD'),
              });
              setIsStart(true);
              setIsChanged(true);
            }}
            onCancel={() => setOpen(false)}
          />
          <View>
            <Text style={styles.label}>Delivery Address:</Text>
            <TextInput
              defaultValue={address}
              style={styles.input}
              onChangeText={value => {
                setIsChanged(true);
                setChanged({...changed, address: value});
              }}
            />
          </View>
          <View style={styles.button}>
            {updateProfileState.isError && (
              <Box justifyContent={'center'} py="5" mb="5">
                <Text textAlign={'center'} fontSize={'xl'} bold>
                  {updateProfileState.errMessage}
                </Text>
              </Box>
            )}
            {!isChanged ? (
              <Box
                justifyContent={'center'}
                py="4"
                background={'gray.400'}
                style={styles.fakeBtn}>
                <Text textAlign={'center'} fontSize="xl" color="gray.300" bold>
                  Save change
                </Text>
              </Box>
            ) : updateProfileState.isLoading ? (
              <ActivityIndicator size="large" color="#085F63" />
            ) : (
              <Button color="primary" onPress={saveChanged}>
                Save change
              </Button>
            )}
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
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginBottom: 80,
    marginTop: 40,
  },
  fakeBtn: {
    // backgroundColor: 'gray',
    borderRadius: 10,
  },
});

export default UpdateProfile;
