import {Image, View} from 'react-native-ui-lib';
import React from 'react';
import emptyImg from '../../assets/icons/notficationEmpty.png';
import NotficationCard from '../../components/notficationCard/notficationCard';
import {useEffect, useState} from 'react';
import getNotification from '../../Features/getNotfication/getNotfication';
import {FlatList} from 'react-native';
import SafeAreaView from '../../components/SafeAreaView';

export default function NotficationScreen() {
  const [notfi, setNotfi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getNotification();
      setNotfi(res.notification_arr);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View className="flex-1 flex px-4 items-stretch pt-[60px]">
        <FlatList
          ListEmptyComponent={
            <View className="w-full items-center p-10">
              <Image source={emptyImg} />
            </View>
          }
          data={notfi}
          keyExtractor={item => item.notification_message_id}
          renderItem={({item}) => <NotficationCard notfi={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
