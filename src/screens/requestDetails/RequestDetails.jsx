import { Image, Text, View } from "react-native-ui-lib";
import SelectExtraService from "../../components/selectExtraService/selectExtraService";
import SelectMainService from "../../components/selectMainService/selectMainService";
import { useEffect, useState } from "react";
import SelectVehicle from "../../components/selectVehicle/SelectVehicle";
import { ScrollView } from "react-native-gesture-handler";
import AddOtherVehicle from "../../components/addOtherVehicle/addOtherVehicle";
import Button from "../../components/mainButton/Button";
import { SelectList } from "react-native-dropdown-select-list";
import { localStorage } from "../../Provider/localStorageProvider";
import locationMark from '../../assets/icons/bookingOverview/locationMark.png'
import { useRecoilState } from "recoil";
import bookingDetailsAtom from "../../atoms/bookingDetails/bookingDetails.atom";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";

export default function RequestDetails({ navigation , route }) {
    console.log(route.params)
    const [selectMain, setSelectMain] = useState("")
    const [selectLocation, setSelectLocation] = useState("")
    const [cars , setCars] = useState([])
    const [selectCar , setSelectCars] = useState()
    const [services , setServices] = useState()
    const [bookingDetails , setBookingDetails] = useRecoilState(bookingDetailsAtom)
    useEffect(()=>{
        let fetchData = async ()=>{
            setCars(await localStorage.getItemObject('userCars'))
            setServices(await localStorage.getItemObject('services'))
        }
        setBookingDetails({
            location :route.params, 
        })
        fetchData()

    },[])

    console.log(bookingDetails)

    const data = [
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]

    return (
        <>
            <ScrollView className="pt-[80] px-5 overflow-y-scroll h-fit">
                <View>
                    <Text className="text-xl mb-3">Car wash location</Text>
                    <View className={'bg-white py-4 px-3 w-full rounded my-2 flex flex-row items-center'}>
                <Image source={locationMark} className={'w-6 h-6 mr-4'} />
                <Text className={'font-bold text-lg mr-2'}>Location:</Text>
                <Text className={'text-mainColor'}>
                {route.params.location.length > 45 ? route.params.location.split(" ").slice(0 , 6).join(" ") + "....." : route.params.location}
                </Text>
            </View>
                </View>
                <View>
                    <Text className="text-xl mb-3">Select Vehicle</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                         {cars?.map((car)=>{
                    return (
                        <SelectVehicle car={car} selected={selectCar} onPress={()=>{
                            setBookingDetails({
                                ...bookingDetails , 
                                car
                            })
                            setSelectCars(car.vehicle_id)
                        }} />
                    )
                })}
                        <AddOtherVehicle navigation={navigation}/>
                    </ScrollView>
                </View>
                <View>

                    <Text className="text-xl mb-3">Select Main Services</Text>
                      {
                services?.service_arr?.map((service)=>{
                    // <SaleBox offer={offer} />
                  
                  return(
                    <SelectMainService service={service} selected={selectMain} onPress={(id)=>{
                        setSelectMain(id)
                        setBookingDetails({
                                ...bookingDetails , 
                                mainSevice : service
                            })
                    }} />
                  )
                })
              }
                </View>
                <View>
                    <Text className="text-xl mb-3">Select Extra Services</Text>
                        {
                services?.extra_service_arr?.map((extra)=>{
                    // <SaleBox offer={offer} />
                    // <SelectMainService title={service.service_name[0]} selected={selectMain} onPress={setSelectMain} id={service.service_id}/>
                  return(
                    <SelectExtraService extraService={extra}/>
                  )
                })
              }
                </View>
                {/* <View>
                    <Text className="text-xl mb-3">Select Package</Text>
                    <SelectExtraService />
                </View> */}

            </ScrollView>
            <View className="flex-row bg-white justify-between absolute bottom-0 w-full rounded-t-3xl p-5">
                <View>
                    <Text className="text-md">SubTotal</Text>
                    <Text className="font-bold text-xl">200 EGP</Text>
                </View>
                <Button Title={"continue"} smallButton onPress={() => {
                    if(!bookingDetails["car"]) {
                        msgProvider.toast("Please Select Car", 'center');
                    } else if(!bookingDetails["mainSevice"]) {
                        msgProvider.toast("Please Select Service", 'center');
                    }else {
                        navigation.navigate('SelectDateTime')
                    }
                
                }} />
            </View>
        </>

    )
}