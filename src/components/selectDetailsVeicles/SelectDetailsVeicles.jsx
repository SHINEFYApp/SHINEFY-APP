import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import SearchInput from '../searchInput/searchInput';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import img from '../../assets/icons/selectIcon.png';
import SelectCardDetails from '../selectCardDetails/selectCardDetails';
import Input from '../inputs/input';
import getBrand from '../../Features/getBrandCar/getBrandCar';
import {useEffect, useMemo, useState} from 'react';
import getModelData from '../../Features/getModelData/getModelData';
import {useRecoilState, useRecoilValue} from 'recoil';
import addNewCar from '../../atoms/addNewCar/addNewCar';
import updateCar from "../../atoms/currentCar/currentCar";

import {config} from '../../Provider/configProvider';
export default function SelectDetailsVeicles({title}) {
  const [data, setDate] = useState([]);
  const currentCar = useRecoilValue(updateCar)
  const [currentActive , setCurrentActive] = useState()
  const [search, setSearch] = useState('');
    const [newCar , setNewCar] = useRecoilState(addNewCar) 
   
  function handleTitleData() {
    switch (title) {
      case 'Select Brand':
        return 'car_make';
      case 'Select Category':
        return 'car_category';
      case 'Select Color':
        return 'car_color';
    }
  }
  const searchResult = useMemo(() => {
    if (!title.includes('plate')) {
      return data?.filter(ele => {
        return title.includes('Model')
          ? ele.modal[0].toLowerCase().includes(search)
          : ele[handleTitleData()][config.language]
              .toLowerCase()
              .includes(search);
      });
    }
  }, [search, data]);

  function handleApiData() {
    switch (title) {
      case 'Select Brand':
        return 'make_arr';
      case 'Select Category':
        return 'category_arr';
      case 'Select Color':
        return 'color_arr';
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let data = title.includes('Model')
        ? await getModelData(newCar.car_make.make_id)
        : await getBrand();
      title.includes('Model')
        ? setDate(data.modal_arr)
        : setDate(data.car_arr[handleApiData()]);
    };
    if (!title.includes('plate')) {
      fetchData();
    }
  }, []);
  return (
    <View className={'bg-white p-4 rounded border border-[#ccc] rounded-lg'}>
      <View>
        <Text className="text-xl font-bold text-center mb-4">{title}</Text>
      </View>
      {title.includes('Plate') ? (
        <View className="h-[80]">
          <Input placeholder={'Enter Your Plate Number Car'} onChange={(e)=>{
            setNewCar({
              ...newCar , 
              plate_number : e.nativeEvent.text
            })
          }}/>
        </View>
      ) : (
        <>
          <SearchInput placeholder={title} onChange={setSearch} />
          <ScrollView
            className="mt-5 h-[calc(60vh)]"
            showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap justify-between">
              <FlatList
                data={searchResult}
                renderItem={({index, item: ele}) => {
                  return (
                    <SelectCardDetails
                      onPress={() => {
                        setCurrentActive(index);
                      }}
                      active={currentActive}
                      id={index}
                      ele={ele}
                      keyObj={
                        title.includes('Model') ? 'modal' : handleTitleData()
                      }
                      key={index}
                      title={
                        title.includes('Model')
                          ? ele.modal[0]
                          : ele[handleTitleData()][0]
                      }
                      color={ele.color_code}
                      img={
                        title.includes('Model')
                          ? ele.modal[0]
                          : ele.image
                          ? ele.image
                          : ele[`${handleTitleData()}_image`]
                      }
                    />
                  );
                }}
              />
              {/* {searchResult.map((ele , index) => {
                return (
                  
                    
                  
                );
              })} */}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
