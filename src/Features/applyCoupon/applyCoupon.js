import {Keyboard} from 'react-native';
import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function applyCoupon(service_amount, coupan_code) {
  Keyboard.dismiss();
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  let amount = (service_amount);
  // let coupan_code = coupan_code;
  let vat_amount = 0;
  //-----------------Coupan code--------------------
  if (coupan_code.length <= 0) {
    msgProvider.toast(Lang_chg.coupanCode[config.language], 'center');
    return false;
  }
  var data = new FormData();
  data.append('user_id', user_id);
  data.append('amount', amount);
  data.append('coupan_code', coupan_code);
  data.append('vat_amount', vat_amount);
  let url = config.baseURL + 'apply_coupan';
  console.log(service_amount)

  try {
    let obj = await apifuntion.postApi(url, data);
    if (obj.success == 'true') {
      console.log(obj)
      return obj;
      if (obj.coupan_id == 'NA' && obj.status == false) {
        this.setState({
          validStatus: false,
          dis_amount: parseFloat(parseFloat(obj.dis_amount)),
          new_grand_total_amount: parseFloat(
            parseFloat(obj.total_amount) +
              parseFloat(this.state.extra_service_amount),
          ),
          coupan_id: obj.coupan_id,
          discountApplied: true,
        });
      } else {
        let walletAmount = this.state.redemwallet;
        this.removeWallet(async () => {
          global.props.showLoader();
          localStorage.setItemObject('user_arr', obj.user_details);
          this.setState(
            {
              validStatus: true,
              dis_amount: parseFloat(obj.dis_amount),
              new_grand_total_amount:
                parseFloat(obj.total_amount) +
                parseFloat(this.state.extra_service_amount),
              netpay:
                parseFloat(obj.total_amount) +
                parseFloat(this.state.extra_service_amount) -
                parseFloat(this.state.wallet_amount),
              coupan_id: obj.coupan_id,
              discountApplied: true,
            },
            () => {
              if (walletAmount > 0) {
                this.state.wallet_amount = walletAmount;
                this.checkwalletamount(walletAmount);
                setTimeout(() => {
                  this.setState({wallet_apply: true});
                  global.props.hideLoader();
                }, 500);
              } else {
                global.props.hideLoader();
              }
            },
          );
        });
      }
    } else {
      msgProvider.alert(
        Lang_chg.information[config.language],
        obj.msg[config.language],
        false,
      );
      if (obj.acount_delete_status == 'deactivate') {
        config.checkUserDelete(this.props.navigation);
        return false;
      }
      if (obj.account_active_status == 'deactivate') {
        config.checkUserDeactivate(this.props.navigation);
        return false;
      }
      return false;
    }
  } catch (err) {
    if (err == 'noNetwork') {
      msgProvider.alert(
        Lang_chg.msgTitleNoNetwork[config.language],
        Lang_chg.noNetwork[config.language],
        false,
      );
      return false;
    } else {
      msgProvider.alert(
        Lang_chg.msgTitleServerNotRespond[config.language],
        Lang_chg.serverNotRespond[config.language],
        false,
      );
      return false;
    }
  }
}
