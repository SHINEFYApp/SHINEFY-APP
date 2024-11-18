import React, {useEffect, useMemo, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import locationMark from '../../assets/icons/bookingOverview/locationMark.png';
import BookingOverviewTextDetails from '../../components/bookingOverview/BookingOverviewTextDetails';
import Button from '../../components/mainButton/Button';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import {useRecoilState} from 'recoil';
import sortDate, {reverseSortDate} from '../../utlites/sortDate';
import {config} from '../../Provider/configProvider';
import SelectVehicle from '../../components/selectVehicle/SelectVehicle';
import {Lang_chg} from '../../Provider/Language_provider';
import applyCoupon from '../../Features/applyCoupon/applyCoupon';
import RadioButton from '../../components/RadioButton/RadioButton';
import walletIcon from '../../assets/icons/profile/wallet.png';
import getWallet from '../../Features/getWallet/getWallet';
import create_package_booking from '../../Features/createPackgeBooking/createPackageBooking';
import Modal from 'react-native-modal';
import SuccessAddVehicle from '../../components/successAddVehicle/successAddVehicle';
import { msgProvider } from '../../Provider/Messageconsolevalidationprovider/messageProvider';

const BookingOverview = ({navigation, route}) => {

  const [bookingDetails, setBookingDetails] =
    useRecoilState(bookingDetailsAtom);
  let date = new Date(reverseSortDate(bookingDetails.booking_date));
  const [coupon, setCoupon] = useState();
  const [walletAmount, setWalletAmount] = useState();
  const [walletUserAmount, setUserWalletAmount] = useState("");
  const [isWallet, setIsWallet] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUpOpen , setIsPopUpOpen] = useState(false)



  const extraServiceData = useMemo(() => {
    let extraData = [];
    for (let key in bookingDetails?.extraData?.extraServices) {
      extraData.push(bookingDetails?.extraData?.extraServices[key]);
    }
    
    return extraData;
  }, []);

  useEffect(() => {
    if (coupon?.couponName == '') {
      setCoupon();
      setBookingDetails({
        ...bookingDetails,
        coupon_id: 'NA',
        discount_amount: 'NA',
      });
    }
  }, [coupon]);
  useEffect(() => {
    setBookingDetails({
      ...bookingDetails,
      total_amount:
        route.params.price *
        bookingDetails.extraData.allSelectedCarsDetails.length,
    });
  }, []);
 function handleClosePopUp() {
      setIsPopUpOpen(false)
  }

  useEffect(()=>{
    async function fetchData() {
      let data = await getWallet();
      setWalletAmount(data.userwallet)
    }
    fetchData()
  },[])

  async function handleWalletAmount(){
    if(walletUserAmount <= walletAmount) {

      if (walletUserAmount >= 50 && walletAmount >= 50) {

        if(walletUserAmount > handleAmount()) {
          setUserWalletAmount(handleAmount())
        }
        setIsWallet(true)
        setBookingDetails({
                  ...bookingDetails,
                  redemwallet:walletUserAmount,
                });
      }else {
        msgProvider.toast(Lang_chg.wallet_balance_error[config.language] , "center")
      }
    }else {
      msgProvider.toast(Lang_chg.wallet_balance_error_userAmount[config.language] , "center")
    }

  }
    

  function handleAmount() {
    if (isWallet) {
      if (coupon?.total_amount) {
        return +coupon?.total_amount - +walletUserAmount;
      } else {
        return (
          +route.params.price -
          +walletUserAmount
        );
      }
    } else {
      if (coupon?.total_amount) {
        return +coupon?.total_amount;
      } else {
        return (
          +route.params.price 
        );
      }
    }
  }


  useEffect(() => {
    setBookingDetails({
      ...bookingDetails,
      total_amount: handleAmount(),
    });
  }, [isWallet, coupon]);


  return (
    <View className={'pt-[10px] px-5'}>
      <Modal
        swipeDirection={['down' , "left" , "right" , "up"]}
        onSwipeMove={handleClosePopUp}
        avoidKeyboard={true}
        hasBackdrop={true}
        isVisible={isPopUpOpen}>
        <SuccessAddVehicle closePopUp={handleClosePopUp} title={Lang_chg.successbookingTxt[config.language]} />
      </Modal>
      <ScrollView className={'pb-16'}>
        <View className={'bg-mainColor py-4 w-full rounded'}>
          <Text className={'font-bold text-center text-lg'}>
            {date.toLocaleDateString(
              {language: 'en'},
              {month: 'short', year: 'numeric', day: 'numeric'},
            )}{' '}
            , {bookingDetails.booking_time}
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            className={
              'bg-white py-4 px-3 w-full rounded mt-4 flex flex-row items-center mb-6'
            }>
            <Image source={locationMark} className={'w-6 h-6 mr-4'} />
            <Text className={'font-bold text-lg mr-2'}>
              {config.language === 0 ? 'Location' : 'الموقع'}:
            </Text>
            <Text className={'text-mainColor'}>
              {bookingDetails.address_loc}
            </Text>
          </View>
        </ScrollView>
       <FlatList
          data={bookingDetails?.extraData?.allSelectedCarsDetails}
          renderItem={({item}) => <SelectVehicle car={item} />}
          keyExtractor={item => item.vehicle_id}
        />
        {/* <SelectVehicle car={bookingDetails.extraData.car} /> */}
        <View className={'mt-4 py-2 px-6 w-full bg-white rounded-lg'}>
          <BookingOverviewTextDetails
            title={Lang_chg.services[config.language]}
            value={
              bookingDetails?.extraData?.service?.service_name[config.language]
            }
            price={`${bookingDetails?.extraData?.service?.service_price} EGP`}
          />
          <View
            className={
              'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
            }
          />
          <BookingOverviewTextDetails
            title={Lang_chg.car_txt[config.language]}
            value={Lang_chg.carsCount_txt[config.language]}
            price={`X ${bookingDetails?.extraData?.allSelectedCarsDetails?.length} `}
          />
          <View
            className={
              'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
            }
          />
      
          <FlatList 
            data={extraServiceData}
            renderItem={({item:extraService}) => {
             return(<React.Fragment>
                <BookingOverviewTextDetails
                  title={Lang_chg.extraservice_txt[config.language]}
                  value={extraService?.extra_service_name[config.language]}
                  price={` ${extraService.quantity} X ${
                    extraService.extra_service_price
                  } `}
                />
                <View
                  className={
                    'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
                  }
                />
              </React.Fragment>)}}
          keyExtractor={item => item.extra_service_id}
          />
          {coupon?.couponName !== '' && coupon && (
            <>
              <BookingOverviewTextDetails
                title={Lang_chg.coupon[config.language]}
                value={coupon?.couponName}
                price={`-${coupon?.dis_amount}`}
              />
              <View
                className={
                  'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
                }
              />
            </>
          )}
          {isWallet && (
            <>
              <BookingOverviewTextDetails
                title={Lang_chg.wallet[config.language]}
                value={Lang_chg.wallet[config.language]}
                price={`${walletUserAmount}`}
              />
              <View
                className={
                  'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
                }
              />
            </>
          )}
        </View>
        
        {
          route.params.type != "package" &&
        <>
          <View
            className={
              'bg-mainColor py-4 w-full rounded mt-4 flex flex-row justify-between px-4'
            }>
            <Text className={'font-bold text-center text-lg'}>
              {Lang_chg.totalservicecharges_txt[config.language]}
            </Text>
            <Text className={'font-bold text-center text-lg'}>
              {bookingDetails?.total_amount} EGP
            </Text>
          </View>

          <View
            className={
              'bg-white items-center w-full rounded mt-4 flex flex-row justify-between px-4 border-2 border-[#C3C3C3] mb-1'
            }>
            <TextInput
            value={coupon?.couponName}
              className={`h-[40px] w-[70%] text-black font-bold pr-4 border-r border-r-[#C3C3C3] placeholder:text-${config.textalign} text-${config.textalign} `}
              placeholder={Lang_chg.enter_promo_code[config.language]}
              placeholderTextColor={'#C3C3C3'}
              onChange={e => {
                setCoupon({
                  ...coupon,
                  couponName: e.nativeEvent.text,
                });
              }}
            />
            <View className={'w-[25%]'}>
              {
                coupon?.total_amount ? <Button
                Title={Lang_chg.Remove[config.language]}
                onPress={async () => {
                  setCoupon();
                  setBookingDetails({
                    ...bookingDetails,
                    coupon_id: "NA",
                    discount_amount: "NA",
                  });
                }}
              /> :<Button
                Title={Lang_chg.Apply[config.language]}
                onPress={async () => {
                  let res = await applyCoupon(
                   bookingDetails?.total_amount,
                    coupon.couponName,
                  );

                  setBookingDetails({
                    ...bookingDetails,
                    coupon_id: res.coupan_id,
                    discount_amount: res.dis_amount,
                    total_amount: res.total_amount,
                  });
                  setCoupon({
                    ...coupon,
                    dis_amount: res.dis_amount,
                    total_amount: res.total_amount,
                  });
                }}
              />
              }
              
            </View>
          </View>
     
          <View>
            <Text className="mt-3 text-lg">
              {Lang_chg.wallet[config.language]} ({walletAmount} {Lang_chg.sar_txt[config.language]})
            </Text>
          </View>
          {
           <View
            className={
              'bg-white items-center w-full rounded mt-4 flex flex-row justify-between px-4 border-2 border-[#C3C3C3] mb-1'
            }>
            <TextInput
              onChange={(e)=>{
                setUserWalletAmount(e.nativeEvent.text)
              }}
             
             keyboardType="numeric"
              className={`h-[40px] text-black w-[70%] font-bold pr-4 border-r border-r-[#C3C3C3] placeholder:text-${config.textalign} text-${config.textalign} `}
              placeholder={Lang_chg.use_wallet_title[config.language]}
              placeholderTextColor={'#C3C3C3'}
              value={`${walletUserAmount}`}
              editable={!isWallet}
            />
            <View className={'w-[25%]'}>
              {
                isWallet ? <Button
                Title={Lang_chg.Remove[config.language]}
                onPress={async () => {
                  setIsWallet(false)
                   setBookingDetails({
                  ...bookingDetails,
                  redemwallet:0,
                });
                  setUserWalletAmount("")
                }}
              /> :<Button
                Title={Lang_chg.Apply[config.language]}
                onPress={async () => {
                
                    handleWalletAmount()
                }}
              />
              }
              
            </View>
          </View>
          }
        </>
        }
        <View
            className={
              'bg-white items-center w-full rounded mt-4 flex flex-row justify-between px-4 border-2 border-[#C3C3C3] mb-1'
            }>
            <TextInput
              className={`min-h-[60px] py-5  text-black font-bold pr-4  placeholder:text-${config.textalign} text-${config.textalign} `}
              placeholder={Lang_chg.emptyNotes[config.language]}
              placeholderTextColor={'#C3C3C3'}
              onChange={e => {
                setBookingDetails({
                  ...bookingDetails,
                  notes: e.nativeEvent.text,
                  
                });
              }}
              multiline={true}
              returnKeyType="done"
              blurOnSubmit={true}
            />
        
          </View>
        <Button
        isLoading={route.params.type == "package" ? isLoading :false}
          Title={Lang_chg.confirm_booking[config.language]}
          btnStyle={'font-semibold text-lg'}
          onPress={async() => {
            setIsLoading(true)
            if(route.params.type == "package") {
              create_package_booking(bookingDetails , navigation , setBookingDetails , setIsLoading, setIsPopUpOpen)
          
              
            } else {
              navigation.push('PaymentMethod')
            }
            
          }}
        />
        <Button
          Title={Lang_chg.cancelBooking_txt[config.language]}
          secondStyle={true}
          textColor={'#dd9923'}
          btnStyle={'font-semibold text-lg'}
          onPress={() => {
            let date = new Date();
            navigation.push('HomeScreen')
            setBookingDetails({
               booking_date: sortDate(date.toLocaleDateString("en-us"))
            })
          }}
        />
        <View className={'py-3'} />
      </ScrollView>
    </View>
  );
};

export default BookingOverview;
