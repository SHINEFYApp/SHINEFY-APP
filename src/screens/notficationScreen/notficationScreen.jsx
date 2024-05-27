import {Image, Text, View} from 'react-native-ui-lib';
import emptyImg from '../../assets/icons/notficationEmpty.png';
import NotficationCard from '../../components/notficationCard/notficationCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {useEffect, useState} from 'react';
import getNotification from '../../Features/getNotfication/getNotfication';
import {FlatList} from 'react-native';

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
    <View className="flex-1 pt-[80px]">
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
  );
}
