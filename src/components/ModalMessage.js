import React from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const ModalMessage = ({isVisible, onClose, message}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonSection}>
              <Text style={styles.textMsg}>{message}</Text>
            </View>
            <Pressable style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>Oke</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  buttonSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  textMsg: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  firstBtn: {
    marginRight: 10,
  },
  cancel: {
    backgroundColor: '#32DBC6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  cancelText: {
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalMessage;
