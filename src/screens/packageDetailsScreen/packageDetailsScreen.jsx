import React, {useEffect, useState} from 'react';
import {Image, Modal, Text, View} from 'react-native-ui-lib';
import img from '../../assets/detailsCar.png';
import Button from '../../components/mainButton/Button';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {ScrollView} from 'react-native-gesture-handler';
import apiSauce from '../../API/apiSauce';
import PayTabs from '../../components/payTabs/payTabs';
import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import subscripePackage from '../../Features/subscripePackage/subscripePackage';
import SuccessAddVehicle from '../../components/successAddVehicle/successAddVehicle';
import {Alert} from 'react-native';
import paymentTab from '../../Features/paymentTab/paymntTab';
import { msgProvider } from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import { localStorage } from '../../Provider/localStorageProvider';
import isGuestAtom from '../../atoms/isGuest';
import { useRecoilValue } from 'recoil';

export default function PackageDetailsScreen({navigation, route}) {
  const [data, setData] = useState();
  const [isPayment, setIsPayment] = useState(false);
  const [isPaymentURL, setIsPaymentURL] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [webView, setWebView] = useState(false);
  const isGuest = useRecoilValue(isGuestAtom)

  useEffect(() => {
    const fetchData = async()=>{
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    apiSauce.get(`/get_package_details/${route.params}` , {user_id}).then(res => {
      if (res.status === 423) {
                msgProvider.alert('Must update app version first');
                return false
              } 
      setData(res.data.data);
    }); 
    }
    fetchData()
  }, []);
  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }

  return (
    <View className="flex-1">
      {webView && (
        <PayTabs
          url={isPaymentURL}
          setWebView={setWebView}
          webView={webView}
          navigation={navigation}
          amount={data.package.price}
            success= {()=>{
            setIsPopUpOpen(true)
            navigation.navigate('HomeScreen')
          }}
        />
      )}
      <Modal
        swipeDirection={'down'}
        onSwipeMove={handleClosePopUp}
        avoidKeyboard={true}
        hasBackdrop={true}
        isVisible={isPopUpOpen}>
        <SuccessAddVehicle closePopUp={handleClosePopUp} />
      </Modal>
      <ScrollView>
        <Image source={{uri:data?.package.package_img}} className="w-full h-[180px]" />
        <View className="bg-white flex-1 rounded-3xl px-5 py-10 -mt-2 justify-between">
          <View>
                <Text className="text-2xl font-bold text-mainColor">

                  {
                    config.language == 0 ?
                      data?.package?.name.split(" ").slice(-2).join(" ")
                    :  data?.package?.name_ar.split(" ").slice(-2).join(" ")
                    }
                </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-semibold  w-[70%]">
                {config.language == 0
                  ? data?.package?.name.split(" ").slice(0 , data?.package?.name.split(" ").length - 2).join(" ")
                  :data?.package?.name_ar.split(" ").slice(0 , data?.package?.name_ar.split(" ").length - 2).join(" ")}
              </Text>
              <Text className="bg-mainColor text-white py-1 px-2 rounded-lg font-bold text-xl">
                {data?.package?.price} EGP
              </Text>
            </View>
           
            <View className="py-2 border-y border-[#ccc] my-5">
              <Text>{data?.package?.description}</Text>
            </View>
            <View>
              <Text className="text-xl font-bold mb-5">
                {data?.extra_services?.length}{' '}
                {Lang_chg.extraservice_txt[config.language]}
              </Text>
              {data?.extra_services?.map(service => {
                return (
                  <Text>
                    {service.quantity  && `${service.quantity} X `} 

                    {config.language == 0
                      ? service.extra_service_name
                      : service.extra_service_name_arabic}
                  </Text>
                );
              })}
            </View>
            <View className="gap-3 mt-5">
              <Text className="text-xl font-bold">
                {data?.main_services?.length}{' '}
                {Lang_chg.mainservice_txt[config.language]}
              </Text>
              {data?.main_services?.map(service => {
                return (
                  <Text className="mb-3">
                    {service.quantity  && `${service.quantity} X `} 
                    {config.language == 0
                      ? service.service_name
                      : service.service_name_ar}
                  </Text>
                );
              })}
            </View>
          </View>
          {
            !isGuest &&
          <Button
            Title={Lang_chg.claim[config.language]}
            onPress={async () => {
              navigation.navigate("PaymentMethodPackage" , {packId :route.params })
            }}
          />
          }
        </View>
      </ScrollView>
    </View>
  );
}
