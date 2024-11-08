import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Colors,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import RadioButton from '../../components/RadioButton/RadioButton';
import SelectVechileCard from '../../components/selectVechileCard.jsx/selectVechileCard';
import {useEffect, useState} from 'react';
import Button from '../../components/mainButton/Button';
import appleIcon from '../../assets/icons/appleIcon.png';
import googleIcon from '../../assets/icons/googleIcon.png';
import paypalIcon from '../../assets/icons/paypalIcon.png';
import cashIcon from '../../assets/icons/cashIcon.png';
import creditIcon from '../../assets/icons/creditIcon.png';
import packageIcon from '../../assets/icons/profile/package.png';
import walletIcon from '../../assets/icons/profile/wallet.png';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {useRecoilState} from 'recoil';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import cashBooking from '../../Features/createBooking/createBooking';
import WebView from 'react-native-webview';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {localimag} from '../../Provider/Localimage';
import PayTabs from '../../components/payTabs/payTabs';
import paymentTab from '../../Features/paymentTab/paymntTab';
import subscripePackage from '../../Features/subscripePackage/subscripePackage';
import SuccessAddVehicle from '../../components/successAddVehicle/successAddVehicle';

export default function PaymentMethodPackage({navigation , route}) {
  const [activePayment, setActivePayment] = useState(0);
  const [webView, setWebView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isPopUpOpen , setIsPopUpOpen] = useState(false)

  function handleClosePopUp() {
      setIsPopUpOpen(false)
  }

  return (
    <View className="pt-[10] px-5">
          <Modal
        swipeDirection={'down'}
        onSwipeMove={handleClosePopUp}
        avoidKeyboard={true}
        hasBackdrop={true}
        isVisible={isPopUpOpen}
        
        >
        <SuccessAddVehicle closePopUp={handleClosePopUp} title={Lang_chg.packageBookingSuccess[config.language]} />
      </Modal>
      {webView && (
        <PayTabs
        url={currentUrl}
          setWebView={setWebView}
          webView={webView}
          navigation={navigation}
          setIsPopUpOpen={setIsPopUpOpen}
           success= {()=>{
            setIsPopUpOpen(true)
            navigation.navigate('HomeScreen')
          }}
        />
      )}
      <ScrollView>
        {/* <View>
          <Text className={'mt-4 mb-3 font-semibold'}>
            {Lang_chg.packages[config.language]}
          </Text>
          <SelectVechileCard
            text={Lang_chg.packages[config.language]}
            navigation={navigation}
            icon={packageIcon}
          />
        </View>
        <View>
          <Text className={'mt-4 mb-3 font-semibold'}>
            {Lang_chg.wallet_txt[config.language]}
          </Text>
          <RadioButton
            buttons={[
              {
                id: 1,
                title: Lang_chg.wallet[config.language],
                icon: walletIcon,
              },
            ]}
            currentActive={activePayment}
            set={setActivePayment}
          />
        </View> */}
        <View>
          <Text className={'mt-4 mb-3 font-semibold'}>
            {Lang_chg.debit_credit_card[config.language]}
          </Text>
          <RadioButton
            buttons={[
              {
                id: 1,
                title: Lang_chg.debit_credit_card[config.language],
                icon: creditIcon,
              },
              {
                id: 2,
                title: Lang_chg.wallet[config.language],
                icon: walletIcon,
              },
            ]}
            currentActive={activePayment}
            set={activeElement => {
              
              setActivePayment(activeElement);
            }}
          />
        </View>
        <Button
        isLoading={isLoading}
          Title={Lang_chg.Confirm[config.language]}
          onPress={async () => {
            setIsLoading(true)

            let {paymentLink , success} = await subscripePackage(route.params.packId , activePayment == Lang_chg.wallet[config.language] ? "wallet" : "visa");
        
            if (paymentLink != ""){
              setCurrentUrl(paymentLink)
              setIsLoading(false)
              setWebView(true)
              return false
            } 
            if(success) {
                 setIsPopUpOpen(true)
            navigation.navigate('HomeScreen')
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
