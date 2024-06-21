import { localStorage } from "../../Provider/localStorageProvider";

export default async function setOTP (phoneNumber) {
    let user_value = await localStorage.getItemObject('user_value');
    this.setText(user_value.otp);
    this.setState({
      phone_number: user_value.phone_number,
      user_id: user_value.user_id,
    });
  };