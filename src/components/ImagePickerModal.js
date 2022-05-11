import React from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const ImagePickerModal = ({isVisible, onClose, onImageLibrary, onCamera}) => {
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
              <Pressable
                style={[styles.button, styles.buttonClose, styles.firstBtn]}
                onPress={onCamera}>
                <Text style={styles.textStyle}>Camera</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={onImageLibrary}>
                <Text style={styles.textStyle}>Library</Text>
              </Pressable>
            </View>
            <Pressable style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
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
  },
  firstBtn: {
    marginRight: 10,
  },
  button: {
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    width: '40%',
    marginVertical: 40,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'teal',
  },
  cancel: {
    backgroundColor: '#EBEFD0',
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

export default ImagePickerModal;
