import React, {useEffect, useState} from 'react';
import {View} from 'react-native-ui-lib';
import FAOComponent from '../../components/FAO/FAOComponent';
import setFAQS from '../../Features/getFAQs/getFAQs';
import {config} from '../../Provider/configProvider';
import {ScrollView} from 'react-native-gesture-handler';

const FAQ = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await setFAQS();
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <View className={'mt-[90px] mx-5'}>
      <ScrollView>
        {data?.map((faq, index) => {
          return (
            <FAOComponent
              question={`${index + 1}-${faq.question[config.language]}`}
              content={faq.answer[config.language]}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FAQ;
