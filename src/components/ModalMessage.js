import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const ModalMessage = ({show, message}) => {
  const [modalVisible, setModalVisible] = useState();

  const handleClose = () => {
    setModalVisible(!modalVisible);
    show(false);
    message = null;
    console.log('ok');
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message || 'oke'}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleClose}>
              <Text style={styles.textStyle}>Oke</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(47, 54, 64,0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    width: '80%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: '100%',
      height: 90,
    },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 79,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: 'black',
  },
  textStyle: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    color: '#32DBC6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 55,
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
  },
});

export default ModalMessage;
