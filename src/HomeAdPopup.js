import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import {mobileH, mobileW, localimag} from './Provider/utilslib/Utils';

const HomeAdPopup = ({showDialog, ad, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showDialog}
      onRequestClose={() => {
        if (onClose) {
          onClose();
        }
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image source={{uri: ad?.image}} style={styles.image} />
          <Text numberOfLines={3} style={styles.modalText}>
            {ad?.description ?? ''}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              if (onClose) {
                onClose();
              }
            }}>
            <Image style={styles.closeImage} source={localimag.home_cancel} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000060',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: mobileW * 0.85,
    borderRadius: 8,
    height: mobileW * 0.85,
    marginBottom: 12,
  },
  modalText: {
    fontSize: 17,
  },
  closeImage: {
    width: 40,
    height: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 17,
    right: 17,
  },
});

export default HomeAdPopup;
