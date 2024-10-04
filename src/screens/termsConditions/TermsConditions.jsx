import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

const TermsConditions = () => {
  return (
    <View className="pt-[10] px-5">
      <ScrollView>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.termsConditionText[config.language]}
        </Text>
        <Text style={styles.paragraph}>{Lang_chg.terms1[config.language]}</Text>
        <Text style={styles.paragraph}>{Lang_chg.terms2[config.language]}</Text>
        <Text style={styles.paragraph}>{Lang_chg.terms3[config.language]}</Text>
        {/*  */}
        <Text style={styles.title}>{Lang_chg.basicTerms[config.language]}</Text>
        <Text style={styles.paragraph}>{Lang_chg.terms4[config.language]}</Text>
        <Text style={styles.paragraph}>{Lang_chg.terms5[config.language]}</Text>
        <Text style={styles.paragraph}>{Lang_chg.terms6[config.language]}</Text>
        <Text style={styles.paragraph}>{Lang_chg.terms7[config.language]}</Text>
        <Text style={styles.paragraph}>{Lang_chg.terms8[config.language]}</Text>
        {/*  */}
        <Text style={styles.title}>{Lang_chg.asuurance[config.language]}</Text>
        <Text style={styles.paragraph}>{Lang_chg.terms9[config.language]}</Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms10[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>{Lang_chg.byUsing[config.language]}</Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms11[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>{Lang_chg.licences[config.language]}</Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms12[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms13[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms14[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.userLicense[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms15[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms16[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms17[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.applyAppStore[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms18[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms19[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms20[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms21[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms22[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms23[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms24[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms25[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms26[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.copyRightPolicy[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms27[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms28[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.grantedByUser[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms29[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms30[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms31[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms32[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms33[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms34[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms35[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.vehcileAccessories[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms36[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms37[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms38[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms39[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms40[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms41[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms42[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms43[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms44[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.intellectualProperty[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms45[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms46[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms47[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>{Lang_chg.notice[config.language]}</Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms48[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms49[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms50[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms51[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms52[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms53[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms54[config.language]}
        </Text>
        {/*  */}
        <Text style={styles.title}>
          {Lang_chg.refundPolicy[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms55[config.language]}
        </Text>
        <Text style={styles.paragraph}>
          {Lang_chg.terms56[config.language]}
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 14,
  },
});
