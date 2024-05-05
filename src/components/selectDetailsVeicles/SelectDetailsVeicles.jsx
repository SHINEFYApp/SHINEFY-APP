import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import SearchInput from '../searchInput/searchInput';
import {ScrollView} from 'react-native-gesture-handler';
import img from '../../assets/icons/selectIcon.png';
import SelectCardDetails from '../selectCardDetails/selectCardDetails';
import Input from '../inputs/input';
import getBrand from '../../Features/getBrandCar/getBrandCar';
import {useEffect, useMemo, useState} from 'react';
import getModelData from '../../Features/getModelData/getModelData';
export default function SelectDetailsVeicles({title}) {
  const [data, setDate] = useState([]);
  const [search, setSearch] = useState('');
  const searchResult = useMemo(() => {
    return data.filter(ele => {
      return title.includes('Model')
      ? ele.modal[0].toLowerCase().includes(search)
      : ele[handleTitleData()][0].toLowerCase().includes(search)
    });
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

  useEffect(() => {
    handleApiData();
    const fetchData = async () => {
      let data = title.includes('Model')
        ? await getModelData(60)
        : await getBrand();
      console.log(data);
      title.includes('Model')
        ? setDate(data.modal_arr)
        : setDate(data.car_arr[handleApiData()]);
    };
    fetchData();
  }, []);

  console.log(title.includes('plate'));
  return (
    <View className={'bg-white p-4 rounded border border-[#ccc] rounded-lg'}>
      <View>
        <Text className="text-xl font-bold text-center mb-4">{title}</Text>
      </View>
      {title.includes('plate') ? (
        <View className="h-[80]">
          <Input placeholder={'Enter Your Plate Number Car'} />
        </View>
      ) : (
        <>
          <SearchInput placeholder={title} onChange={setSearch} />
          <ScrollView
            className="mt-5 h-[calc(60vh)]"
            showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap justify-between">
              {searchResult.map(ele => {
                return (
                  <SelectCardDetails
                    title={title.includes('Model') ? ele.modal[0] :ele[handleTitleData()][0]}
                    img={img}
                  />
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
