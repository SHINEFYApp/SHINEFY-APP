import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

const PrivacyPolicy = () => {
  return (
    <View className="pt-[80] px-5">
      <ScrollView>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.privacypolicy_txt[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy1[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy2[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy3[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.informationWeCollect[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy4[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy5[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy6[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy7[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy8[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy9[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy10[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.howUseInformation[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy11[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy12[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.customerService[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy13[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.behaviourAds[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy14[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.yourInformation[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy15[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy16[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy17[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy18[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy19[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>{Lang_chg.security[config.language]}</Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy20[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.inviteFriends[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy21[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy22[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.changePrivacyPolicy[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy23[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.paymentPrivacy[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy24[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy25[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy26[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy27[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy28[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy29[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.contactAbout[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy30[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.policy31[config.language]}
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 14,
  },
});
