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
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {
  Font,
  localStorage,
  mobileH,
  mobileW,
} from '../../Provider/utilslib/Utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {localimag} from '../../Provider/Localimage';
import PayTabs from '../../components/payTabs/payTabs';
import paymentTab from '../../Features/paymentTab/paymntTab';
import SuccessAddVehicle from '../../components/successAddVehicle/successAddVehicle';
import Modal from 'react-native-modal';
import sortDate from '../../utlites/sortDate';
export default function PaymentMethod({navigation}) {
  const [activePayment, setActivePayment] = useState(0);
  const [webView, setWebView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isPopUpOpen , setIsPopUpOpen] = useState(false)

  const [bookingDetails, setBookingDetails] =
    useRecoilState(bookingDetailsAtom);
    
  const paymentMethodsOptions = [
    {
      id: 1,
      title: Lang_chg.paypal[config.language],
      icon: paypalIcon,
    },
    {
      id: 2,
      title: Lang_chg.apple_pay[config.language],
      icon: appleIcon,
    },
    {
      id: 3,
      title: Lang_chg.google_pay[config.language],
      icon: googleIcon,
    },
  ];

  function handleClosePopUp() {
      setIsPopUpOpen(false)
  }

  return (
    <View className="pt-[10] px-5">
      <Modal
        swipeDirection={['down' , "left" , "right" , "up"]}
        onSwipeMove={handleClosePopUp}
        avoidKeyboard={true}
        hasBackdrop={true}
        isVisible={isPopUpOpen}>
        <SuccessAddVehicle closePopUp={handleClosePopUp} title={Lang_chg.successbookingTxt[config.language]} />
      </Modal>
      {webView && (
        <PayTabs
        url={currentUrl}
          setWebView={setWebView}
          webView={webView}
          navigation={navigation}
            success= {()=>{
            setIsPopUpOpen(true)
          navigation.navigate('HomeScreen')
          let date = new Date();
           setBookingDetails({
              booking_date: sortDate(date.toLocaleDateString("en-us"))
           })
          }}
          amount={
            bookingDetails.total_amount
              ? bookingDetails.total_amount
              : bookingDetails.service_price
          }
        />
      )}
      <ScrollView>
        <View>
          <Text className={'mb-2 font-semibold'}>
            {Lang_chg.cash_txt[config.language]}
          </Text>
          <RadioButton
            buttons={[
              {
                id: 1,
                title: Lang_chg.cash_txt[config.language],
                icon: cashIcon,
              },
            ]}
            currentActive={activePayment}
            set={activeElement => {
              setBookingDetails({
                ...bookingDetails,
                payment_method: 0,
              });
              setActivePayment(activeElement);
            }}
          />
        </View>
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
            ]}
            currentActive={activePayment}
            set={activeElement => {
              setBookingDetails({
                ...bookingDetails,
                payment_method: 1,
              });
              setActivePayment(activeElement);
            }}
          />
          {/* <SelectVechileCard
            text={Lang_chg.add_card[config.language]}
            navigation={navigation}
            screen={'AddCardScreen'}
            icon={creditIcon}
          /> */}
        </View>
        {/* <View>
          <Text className={'mt-4 mb-3 font-semibold'}>
            {Lang_chg.Payment_Option[config.language]}
          </Text> */}

        {/* <RadioButton
            buttons={paymentMethodsOptions}
            currentActive={activePayment}
            set={setActivePayment}
          /> */}
        {/* </View> */}
        <Button
        isLoading={isLoading}
          Title={Lang_chg.Confirm[config.language]}
          onPress={async () => {
            setIsLoading(true)
            let paymentLink = await cashBooking(bookingDetails, navigation ,setIsPopUpOpen , setBookingDetails);
            if (paymentLink != undefined){
              setCurrentUrl(paymentLink)
              setWebView(true)
              
            }
            setIsLoading(false)
          }}
        />
      </ScrollView>
    </View>
  );
}
