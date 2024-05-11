import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import { Image } from 'react-native-ui-lib';
import Modal from 'react-native-modal';
import AddVehiclePopup from '../addVehiclePopup/addVehiclePopup';
import { useRecoilState } from 'recoil';
import addVehiclePopUpState from '../../atoms/addNewCar/addNewCar'
const CustomTabBarButton = props => {

  const [isAddPopUpOpen , setIsAddPopUpOpen] = useState(false)


  function handleClosePopUp() {
    setIsAddPopUpOpen(false)
  }

    return (
    props.float ?
      <View style={styles.btnWrapper}>
              <Modal
       avoidKeyboard={true}
       hasBackdrop={true}
       isVisible={isAddPopUpOpen}>
        <AddVehiclePopup closePopUp={handleClosePopUp} nextScreen={props.onPress}/>
      </Modal>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.svgGapFiller,
              {
                borderTopLeftRadius: props.route === 'home' ? 10 : 0,
              },
            ]}
          />
          <Svg width={71} height={58} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={"#fff"}
            />
          </Svg>
          <View
            style={[
              styles.svgGapFiller
            ]}
          />
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>setIsAddPopUpOpen(true)}
          style={[styles.activeBtn]}>
          <Text>{props.children}</Text>
        </TouchableOpacity>
      </View> :
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPress}
        style={[
          styles.inactiveBtn,
          {
            borderTopLeftRadius: props.href === "/HomeScreen/HomeScreen" ? 20 : 0,
            borderTopRightRadius: props.href === "/HomeScreen/Profile" ? 20 : 0  ,  
        }
        ]}>
        <View className="items-center">
          
          {props.accessibilityState.selected ? 
          <Image source={props.activeIcon}/>
          
          
          : 
          
          props.children}
        <Text className={`font-sm text-black`}>{props.screenName}</Text>
        </View>
      </TouchableOpacity>
    );
  
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  activeBtn: {
    flex: 1,
    position: 'absolute',
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#DD9923",
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 45
},
inactiveBtn: {
    flex: 1,
    backgroundColor:"white",
    justifyContent: 'center',
    alignItems: 'center',
    height:58,

},
  svgGapFiller: {
    flex: 1,
    backgroundColor: "white",
  }
})