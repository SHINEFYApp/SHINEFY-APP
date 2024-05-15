import {ScrollView} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import RadioButton from '../../components/RadioButton/RadioButton';
import SelectVechileCard from '../../components/selectVechileCard.jsx/selectVechileCard';
import {useState} from 'react';
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

export default function PaymentMethod({navigation}) {
  const [activePayment, setActivePayment] = useState(0);
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

  return (
    <View className="pt-[80] px-5">
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
                payment_method: 1,
              });
              setActivePayment(activeElement);
            }}
          />
        </View>
        <View>
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
        </View>
        <View>
          <Text className={'mt-4 mb-3 font-semibold'}>
            {Lang_chg.debit_credit_card[config.language]}
          </Text>
          <SelectVechileCard
            text={Lang_chg.add_card[config.language]}
            navigation={navigation}
            screen={'AddCardScreen'}
            icon={creditIcon}
          />
        </View>
        <View>
          <Text className={'mt-4 mb-3 font-semibold'}>
            {Lang_chg.Payment_Option[config.language]}
          </Text>

          <RadioButton
            buttons={paymentMethodsOptions}
            currentActive={activePayment}
            set={setActivePayment}
          />
        </View>
        <Button
          Title={Lang_chg.Confirm[config.language]}
          onPress={() => {
            cashBooking(bookingDetails , navigation);
          }}
        />
      </ScrollView>
    </View>
  );
}
