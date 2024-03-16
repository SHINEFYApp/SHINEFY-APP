import React, {Component} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider, AppConsumer} from './src/Provider/context/AppProvider';
import Stacknav from './src/Provider/Routenavigation';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import {
  Colors,
  localimag,
  Font,
  mobileH,
  Mapprovider,
  msgProvider,
  msgText,
  config,
  mobileW,
  localStorage,
  handleback,
  Lang_chg,
  apifuntion,
  msgTitle,
  consolepro,
} from './src/Provider/utilslib/Utils';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);
global.MapAddress = 'NA';
global.pushRedirection = 0;
class App extends Component {
  componentDidMount = () => {
    this.language_set();
  };

  language_set = async () => {
    let languagecathc = await localStorage.getItemObject('languagecathc');
    let languagesetenglish = await localStorage.getItemObject(
      'languagesetenglish',
    );

    if (languagecathc == 0) {
      if (languagesetenglish == 3) {
        if (I18nManager.isRTL) {
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
        } else {
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
        }
        localStorage.removeItem('languagecathc');
        localStorage.setItemObject('language', 1);
        localStorage.removeItem('languagesetenglish');
        RNRestart.Restart();
      }

      localStorage.setItemObject('languagesetenglish', 3);
    }
  };
  render() {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <AppProvider {...this.props}>
            <AppConsumer>
              {funcs => {
                global.props = {...funcs};
                return <Stacknav {...funcs} />;
              }}
            </AppConsumer>
          </AppProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }
}

export default App;
