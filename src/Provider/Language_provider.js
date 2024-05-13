import {Alert, ToastAndroid, I18nManager, Platform} from 'react-native';
import {localStorage} from './localStorageProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from './configProvider';
import RNRestart from 'react-native-restart';

import {consolepro} from './Messageconsolevalidationprovider/Consoleprovider';

global.language_key = 1;
class Language_provider {
  language_get = async () => {
    var item = await localStorage.getItemObject('language');

    if (item != null) {
      config.language = item;
    }
    if (item != null) {
      if (item == 0) {
        // I18nManager.forceRTL(false);
        // I18nManager.allowRTL(false);
        //  config.textRotate='left'
        config.textalign = 'left';
        config.inverted = false;
      } else {
        //  I18nManager.forceRTL(true);
        // I18nManager.allowRTL(true);
        config.textalign = 'right';
        // config.textRotate='right'
        config.inverted = true;
      }
      // config.language = item;
    } else {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      config.textalign = 'left';
      // config.textRotate='left'
      config.inverted = false;
      localStorage.setItemObject('language', 0);
      //config.language = 0;
    }
  };

  language_set = async languagem => {
    // var item = await AsyncStorage.getItem('language');
    // localStorage.setItemObject('language', 1)
    if (languagem == 0) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      config.textalign = 'left';
      config.textRotate = 'left';
      config.inverted = false;
      localStorage.setItemObject('language', 0);
      localStorage.removeItem('languagecathc');
      localStorage.removeItem('languagesetenglish');
      config.language = 0;
    } else {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      config.textalign = 'right';
      // config.textRotate='right'
      config.inverted = true;
      localStorage.setItemObject('language', 1);
      localStorage.setItemObject('languagecathc', 0);
      config.language = 1;
    }

    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };
  // Media option ///////////////////
  MediaCamera = ['Camera', 'كاميرا'];
  Mediagallery = ['Gallery', 'ألبوم الصور'];
  cancelmedia = ['Cancel', 'إلغاء'];
  // Map Provider /////////////////////

  titlesearchlocation = ['Search Location', 'البحث عن موقع '];
  // last name====================
  //Otp provider +++++++++++++++++

  Enter_otp = [
    'OTP can not ne less than 4 digit',
    'لا يجوز أن تقل كلمة المرور عن 4 أرقام',
  ];
  phoneotp = ['Otp Number', 'رمز سري لمرة واحدة'];
  OTP = ['OTP', 'OTP'];
  alert_txt = ['Alert', 'انذار'];
  Optional_txt = ['Optional', 'اختياري'];
  edit = ['Edit', 'تعديل'];
  enterAddress = ['Enter Address', 'أدخل العنوان'];
  enterAddressName = ['Enter Address Name', 'أدخل اسم العنوان'];
  homeOfficeEtc = ['home, Office etc', 'المنزل والمكتب وما إلى ذلك'];
  edit_location = ['Edit Location', 'عدل الموقع'];
  verificationotp = ['ENTER VERIFICATION code', 'أدخل رمزالتحقق'];
  code = ['CODE', 'الرمز'];
  verificationcodeheding = [
    'Please enter the verification code ',
    'الرجاء إدخال رمز التحقق المرسل',
  ];
  Otp_validation = ['Please enter OTP', 'الرجاء إدخال الرمز السري لمرة واحدة'];
  resend = ['Resend OTP', 'إعادة إرسال الرمز السري لمرة واحدة'];
  verify = ['VERIFY', 'تحقق'];
  Login = ['Log In', 'تسجيل الدخول'];
  emptyFirstName = ['Please enter first name', 'الرجاء إدخال الاسم الاول'];
  emptyLastName = ['Please enter last name', 'الرجاء إدخال الاسم الاخير'];
  emptyName = ['Please enter full name', 'الرجاء إدخال الاسم بالكامل'];
  emptyCarCategory = [
    'Please select vehicle category',
    'الرجاء تحديد فئة السيارة',
  ];
  emptyTimeSlot = [
    'Please select time slot',
    'الرجاء تحديد وقت الخدمة المناسب',
  ];
  emptyCarMake = ['Please select vehicle brand', 'الرجاء تحديد ماركة السيارة'];
  emptyCarModal = ['Please select vehicle model', 'الرجاء تحديد طراز السيارة'];
  emptyCarColor = ['Please select vehicle color', 'الرجاء تحديد لون السيارة'];
  NameMinLength = [
    'Name must be at least 3 characters',
    'يجب ألا يقل الاسم عن 3 أحرف',
  ];
  NameMaxLength = [
    'Name cannot be more than 50 characters.',
    'لا يجوز أن يكون الاسم أكثر من 50 حرفًا.',
  ];
  validName = ['Enter valid  name', 'أدخل اسمًا صالحًا'];
  validFirstName = ['Enter First  name', 'أدخل الإسم الأول'];
  validLastName = ['Enter last  name', 'أدخل الإسم الأخير'];
  //email============================
  emptyEmail = ['Please enter email', 'الرجاء إدخال البريد الإلكتروني'];
  emailMaxLength = [
    'Email cannot be more than 100 characters',
    'لا يجوز أن يكون البريد الإلكتروني أكثر من 100 حرف',
  ];
  validEmail = [
    'Email address is not correct, please enter a valid email address',
    'عنوان البريد الإلكتروني غير صحيح ، برجاء إدخال عنوان بريد إلكتروني صحيح',
  ];

  //password=========================
  PasswordSpace = ['Spaces not allowed', 'لا يسمح باستخدام المسافات'];
  emptyPassword = ['Please enter password', 'الرجاء إدخال كلمة المرور'];
  PasswordMinLength = [
    'Password must be at least 6 characters',
    'يجب ألا تقل كلمة المرور عن 6 أحرف',
  ];
  PasswordMaxLength = [
    'Password cannot be more than 16 characters',
    'لا يجوز أن تكون كلمة المرور أكثر من 16 حرفًا',
  ];
  successUpdatePass = [
    'Password updated successfully',
    'تم تحديث كلمة السر بنجاح',
  ];
  //cpassword=====================
  emptyConfirmNewPWD = [
    'Please enter confirm new password',
    'الرجاء إدخال تأكيد كلمة المرور الجديدة',
  ]; 
  // For Confirm Password
  emptyConfirmPWD = [
    'Please enter confirm password',
    'الرجاء إدخال تأكيد كلمة المرور',
  ];
  ConfirmPWDMatch = [
    'Password and confirm password fields must be equal',
    'يجب أن يكون عدد حروف كلمة المرور و تأكيد كلمة المرور متساوي',
  ];
  ConfirmPWDMinLength = [
    'Confirm password must be at least 6 characters',
    'يجب ألا يقل عدد حروف تأكيد كلمة المرور عن 6 أحرف',
  ];
  ConfirmPWDMaxLength = [
    'Confirm password cannot be more than 16 characters',
    'لا يمكن أن يكون عدد حروف تأكيد كلمة المرور أكثر من 16 حرفًا',
  ];

  emptyNotes = ['Please enter notes', 'برجاء إدخال الملاحظات'];
  notesMinLength = [
    'Notes must must be at least 3 characters',
    'يجب ألا تقل عدد حروف الملاحظات عن 3 أحرف',
  ];

  acceptTermsPolicy = [
    'Please accept terms & conditions and privacy policy to continue',
    'يرجى قبول الشروط والأحكام وسياسة الخصوصية للمتابعة',
  ];
  coupanCode = ['Please enter coupan code', 'برجاء إدخال رمز الكوبون '];
  invalidCoupanCode = [
    'Please enter valid coupan code.',
    'برجاءإدخال رمز صالح للكوبون',
  ];
  //phone no===============
  emptyMobile = ['Please enter Phone number', 'برجاء إدخال رقم الهاتف'];
  MobileMinLength = [
    'Phone number must be at least 7 digits',
    'يجب ألا يقل رقم الهاتف عن 7 أرقام',
  ];
  MobileMaxLength = [
    'Phone number cannot be more than 15 digits',
    'لا يجوز أن يكون رقم الهاتف أكثر من 15 رقمًا',
  ];
  validMobile = [
    'Please enter valid Phone number ',
    'برجاء إدخال رقم هاتف صحيح',
  ];
  //boat add=============
  emptyPlateNo = ['Please enter plate number', 'برجاء إدخال رقم اللوحة'];
  plateNoMinLength = [
    'Plate number must be at least 6 characters',
    'يجب ألا يقل رقم اللوحة عن 6 أحرف',
  ];

  //about==========
  // emptyabout = ['Please enter about text', "برجاء إدخال النص"]
  // maxlenabout = ['About cannot be more than 250 characters.', "لا يجوز ان يكون عدد أحرف النص أكثر من 250 حرف"]
  // minlenabout = ['About  must be at least 3 characters.', "يجب ألا يقل عدد الحروف عن 3 أحرف"]
  //address==========
  emptyaddress = ['Please enter address', 'الرجاء إدخال العنوان'];
  maxlenaddress = [
    'Address cannot be more than 250 characters.',
    'لا يجوز أن تكن عدد حروف العنوان أكثر من 250 حرفًا',
  ];
  minlenaddress = [
    'Address must be at least 3 characters .',
    'يجب ألا يقل العنوان عن 3 أحرف',
  ];
  // For old Password
  emptyoldPassword = [
    'Please enter old password',
    'برجاء إدخال كلمة المرور القديمة',
    'Please enter new password',
  ];
  PasswordoldMinLength = [
    'Old password  must be at least  6 characters',
    'يجب ألا تقل كلمة المرور القديمة عن 6 أحرف',
  ];
  PasswordoldMaxLength = [
    'Old password cannot be more than 16 characters',
    'لا يمكن أن تكون كلمة المرور القديمة أكثر من 16 حرفًا',
  ];
  // For New Password
  emptyNewPassword = [
    'Please enter new password',
    'الرجاء إدخال كلمة المرور الجديدة',
  ];
  PasswordNewMinLength = [
    'New password  must be at least 6 characters',
    'يجب ألا تقل كلمة المرور الجديدة عن 6 أحرف',
  ];
  PasswordNewMaxLength = [
    'New password cannot be more than 16 characters',
    'لا يمكن أن تكون كلمة المرور الجديدة أكثر من 16 حرفًا',
  ];
  //Message====
  emptyMessage = ['Please enter message', 'الرجاء إدخال الرسالة'];
  maxlenMessage = [
    'Message cannot be more than 250 characters.',
    'لا يمكن أن تكون الرسالة أكثر من 250 حرفًا.',
  ];
  minlenMessage = [
    'Message must be at least 3 characters.',
    'يجب ألا تقل الرسالة عن 3 أحرف',
  ];
  //---------------------------share app page---------------------------//
  vehicleUpdateSuccess = [
    'Vehicle updated successfully',
    'تم تحديث السيارة بنجاح',
  ];
  vehicleaddSuccess = ['Vehicle Added successfully', 'تم إضافة السيارة بنجاح'];

  //-------------------------Rating-------------------------------------//
  emptyRating = ['Please give Rating', 'برجاء إعطاء تقييم للخدمة'];

  //------------------------Location msg------------------
  LocationaddSuccess = ['Location added successfully', 'تم إضافة الموقع بنجاح'];
  LocationUpdateSuccess = [
    'Location updated successfully',
    'تم تحديث الموقع بنجاح',
  ];

  //===========================signup========================
  validataionnewpass = [
    'Please enter your password',
    'من فضلك أدخل رقمك السري',
    'Por favor insira uma nova senha',
  ];
  validataionnewpasslength = [
    'password length should be minimum 6 character',
    'يجب ألا يقل طول كلمة المرور عن 6 أحرف',
    'O comprimento da senha deve ter no mínimo 6 caracteres',
  ];
  validataionconfirmpass = [
    'Please enter confirm password',
    'الرجاء إدخال تأكيد كلمة المرور',
    'Por favor digite a senha de confirmação',
  ];
  validationnotmatchpass = [
    'Password does not match',
    'كلمة المرور غير متطابقة',
    'sua senha não é igual',
  ];
  Signup_sucess = ['Signup sucessfully', 'تم الاشتراك بنجاح'];
  login_sucess = ['Login sucessfully', 'تم التسجيل بنجاح'];
  //==========================Confirmation Messages=============================
  cancel = ['Cancel', 'إلغاء'];
  Yes = ['Yes', 'نعم'];
  yes_confirm = ['Yes, Confirm', 'نعم ، قم بالتأكيد'];
  No = ['No', 'لا'];
  ok = ['Ok', 'موافق'];
  or = ['Or', 'أو'];
  Pirce = ['Price', 'سعر'];
  save = ['Save', 'حفظ'];
  Done = ['Done', 'تم'];
  Confirm = ['Confirm', 'تأكيد'];
  Save = ['Save', 'حفظ'];
  Skip = ['Skip', 'تخطي'];
  Clear = ['Clear', 'مسح'];
  Clear_all = ['Clear All', ' مسح الكل'];
  titleexitapp = ['Exip App', 'الخروج من التطبيق'];
  titleDelete = ['Delete', 'حذف'];
  exitappmessage = [
    'Do you want to exit app ? ',
    'هل تريد الخروج من التطبيق؟',
    'Você quer sair do aplicativo',
  ];
  msgConfirmTextLogoutMsg = [
    'Are you sure you want to go out?',
    'هل تريد تسجيل الخروج؟',
  ];
  msgConfirmvehicleDelete = [
    'Are you sure you want to delete ?',
    'هل تريد الحذف ؟',
  ];
  msgConfirmBookingReschedule = [
    'Are you sure you want to Reschedule your booking ?',
    'هل تريد إعادة جدولة حجزك؟',
  ];

  msgLoginError = ['Please login first?', 'برجاء تسجيل الدخول أولا؟'];
  //===========static text change
  password_placeholder = ['Password', 'كلمة المرور'];
  email_placeholder = ['Email', 'البريد الإلكتروني'];
  Home = ['Home', 'الرئيسية'];
  Message = ["You don't have an account?", 'ليس لديك حساب؟'];
  Signup = ['Signup', ' التسجيل  '];
  Forgot_password = ['Forgot Password?', 'هل نسيت كلمةالمرور؟'];
  Login_guest = ['Login as a guest', 'تسجيل الدخول كضيف'];
  New_password_placeholder = ['New Password', 'كلمة المرور الجديدة'];
  confirm_password_placeholder = [
    'Confirm New Password',
    'تأكيد كلمة المرور الجديدة',
  ];
  name_placeholder = ['Enter Name', 'أدخل الاسم'];
  Message_signup_page = ['Already have an account ?', 'هل لديك حساب ؟'];
  verifyEmail = ['Corporate email?', 'البريد الكتروني تابع لشركة؟'];
  verifyEmailDesc = [
    "Please check if you are an employee of an authorized company. Then enter the company's email and check to enjoy unprecedented discounts.",
    'من فضلك، ضع علامة صح لو انت موظف شركة معتمدة لدينا. ثم قم بإدخال إيميل الشركة وقم بالتحقق لتتمتع بخصومات غير مسبوقة.',
  ];
  donthaveDomainEmail = [
    "If your company don't have domain registered please enter company code",
    'اذا لم يكن لديك بريد الكتروني خاص بالشركة يمكنك ادخل كود الشركة',
  ];
  companyCodeTitle = ['Company Code (optional)', 'كود الشركة (اختياري)'];
  clicking_signup_btn = ['I accept all', 'أنا أقبل كل شيء'];
  tearmsetting = ['Terms & Conditions', 'الشروط والأحكام'];
  and = ['and', 'و'];
  privacy = ['Privacy Policy', 'سياسة الخصوصية'];
  Submit = ['Submit', 'اشترك'];
  Setting = ['Settings', 'إعدادات'];
  about_us = ['About Us', 'معلومات عنا'];
  titleTermscondition = ['Terms & Conditions', 'الشروط والأحكام'];
  CandidateDetails = ['Candidate Details', 'تفاصيل عن المرشح'];
  InterviewVideo = ['Interview Video', 'مقابلة فيديو'];
  email = ['Email', 'البريد الإلكتروني'];
  password = ['Password', 'كلمة المرور'];
  confirmpassword = ['Confirm Password', 'تأكيد كلمة المرور'];
  remember = ['Remember me', 'تذكرنى'];
  forgot = ['Forgot Password?', 'هل نسيت كلمة السر؟'];
  mobile_placeholder = ['Email', 'البريد الإلكتروني'];
  categories = ['Categories', 'فئات'];
  view = ['View All', 'عرض الكل'];
  English = ['English', 'إنجليزي'];
  Arabic = ['Arabic', 'عربي'];
  daily = ['Daily', 'اليومي'];
  week = ['Weekly', 'أسبوعي'];
  month = ['Monthly', 'شهريا'];
  login = ['LOGIN', 'تسجيل الدخول'];
  login1 = ['Login', 'تسجيل الدخول'];
  signup = ['SIGNUP', 'سجل الآن'];
  mobile = ['Mobile', 'الموبيل'];
  otp_verification = ['OTP Verification', 'التحقق من الرمز الري لمرة واحدة'];
  otp_verification_msg = [
    'Please type the verification code sent to you',
    'الرجاء كتابة رمز التحقق المرسل إليك',
  ];
  Edit_text = ['Edit', 'تعديل'];
  verify_text = ['VERIFY', 'تحقق'];
  resend_text = ['Resend', 'إعادة إرسال'];
  show = ['Show', 'عرض'];
  Hide = ['Hide', 'إخفاء'];
  facebook = ['Facebook', 'فيسبوك'];
  google = ['Google', 'جوجل'];
  description = ['Description', 'الوصف'];
  add = ['Add Video / Image', 'أضف فيديو / صورة'];
  name = ['Name', 'الاسم'];
  continue = ['Continue', 'استمر'];
  previous = ['Previous', 'السابق'];
  gallary = ['Gallary', 'ألبوم الصور'];
  gallary1 = ['photos From Gallery', 'صورة من البوم الصور'];
  camera = ['Camera', 'كاميرا'];
  cancel = ['Cancel', 'إلغاء'];
  Select_Option = ['Select Option', 'حدد خيار'];
  update = ['Save & Update', '"حفظ وتحديث'];
  block = ['Block', 'إخفاء'];
  report = ['Report', 'تقرير'];
  send = ['Sent', 'أرسلت'];
  doyou = ["Don't have an account ?", 'ليس لديك حساب؟'];
  already = ['Already have an account ?', 'هل لديك حساب بالفعل؟'];

  // ---------------Atul Texts--------------
  //===========14-03-2022------------
  myvehicles_txt = ['My Vehicles', 'سياراتي'];
  Vehicles_txt = ['Vehicles', 'سيارات'];
  hyundai_txt = ['Hyundai Tucson', 'هيونداي توسان'];
  microcar_txt = ['Micro Car', 'سيارة صغيرة'];
  platenumber_txt = ['Plate Number', 'رقم اللوحة'];
  btn_txt = ['375 BTN', '375 BTN'];
  make_txt = ['Make', 'نوع'];
  color1_txt = ['Color', 'اللون'];
  suv_txt = ['SUV Car', 'سيارة دفع رباعي'];
  addvechicle_txt = ['Add Vehicle', 'أضف سيارة'];
  add_another_vehicle = ['Add another vehicle', 'أضف سيارة أخرى'];
  giulia_txt = ['Giulia', 'جوليا'];
  editvechile_txt = ['Edit My Vehicle', 'تعديل سيارتي'];
  selectcategory_txt = ['Select Category', 'اختر الفئة'];
  selectmake_txt = ['Select Brand', 'اختر الماركة'];
  brand_txt = ['Brand', 'الماركة'];
  hyundai2_txt = ['Hyundai', 'هيونداي'];
  selectmodel_txt = ['Select Model', 'حدد الطراز'];
  model_txt = [' Model', ' الطراز'];
  selectcolor_txt = ['Select Color', 'إختر اللون'];
  enterplatenumber_txt = ['Enter Plate Number', 'أدخل رقم اللوحة'];
  update_txt = ['Update', 'تحديث'];
  red_txt = ['Red', 'أحمر'];
  profile_txt = ['Profile', 'الملف الشخصي'];
  asimsheikh_txt = ['Asim Sheikh', 'عاصم شيخ'];
  asimsheikh1_txt = ['+20 0837920271', '+20 0837920271'];
  asimsheikh2_txt = ['Asimsheikh@gmail.com', 'Asimsheikh@gmail.com'];
  editprofile_txt = ['Edit Profile', 'تعديل الملف الشخصي'];
  savedlocation_txt = ['Saved Location', 'الموقع المحفوظ'];
  delete_acc_title = ['Delete Account?', 'حذف الحساب؟'];
  delete_acc_msg = [
    'Are You Sure, You Want to Delete Account',
    'هل تريد حذف الحساب',
  ];
  delete_success_txt = [
    'You have successfully deleted your',
    'لقد نجحت في حذف الحساب ',
  ];
  account = ['account', 'الحساب'];
  mywallet_txt = ['My Wallet', 'محفظتي'];
  language_txt = ['Language', 'لغة'];
  setting_txt = ['Settings', 'إعدادات'];
  fullname_txt = ['Full Name', ' الاسم الكامل  '];
  firstname_txt = ['First Name', ' الاسم الاول  '];
  lastname_txt = ['Last Name', ' الاسم الاخير  '];

  mobile_txt = ['Mobile', 'التليفون المحمول'];
  twenty_txt = ['+20', '+20'];
  Yes = ['Yes', 'نعم'];
  No = ['No', 'لا'];
  email_txt = ['Email', 'البريد الإلكتروني'];
  savedlocation = ['Saved Location', 'المواقع المحفوظة'];
  home_txt = ['Home', 'المنزل'];
  office_txt = ['Office', 'المكتب'];
  sar_txt = ['EGP', 'جنيه مصري'];
  sar1_txt = ['28', '28'];
  totalamount_txt = ['(Total Amount)', '(المبلغ الإجمالي)'];
  language_txt = ['Language', 'لغة'];
  english_txt = ['English', 'إنجليزي'];
  arabic_txt = ['Arabic', 'عربي'];
  settings1_txt = ['Settings', 'إعدادات'];
  notification_txt = ['Notifications', 'إشعارات'];
  password1_txt = ['Change Password ', 'غير كلمة المرور'];
  contactus_txt = ['Contact Us', 'اتصل بنا'];
  Reason_heading = ['Reason', 'سبب'];
  faqs_txt = ["FAQ's", 'الأسئلة الشائعة'];
  term2_txt = ['Term & Condition', 'الشروط و الأحكام'];
  privacy_txt = ['Privacy Policy', 'سياسة الخصوصية'];
  about_txt = ['About US', 'معلومات عنا'];
  logout_txt = ['Logout', 'تسجيل خروج'];
  rate_txt = ['Rate App', 'قيم التطبيق'];
  share_txt = ['Share App', 'شارك التطبيق'];
  deleteaccount_txt = ['Delete Account', 'حذف الحساب'];
  emptyOrderLocation = [
    'Please select place, if no places exist enter one from favorite in the home',
    'من فضلك اختر مكان واذا لا يوجد يمكنك اضافة مكان من المفضلة بالرئيسية',
  ];
  logout1_txt = ['Logout', 'تسجيل خروج'];
  changepassword_txt = ['Change Password', 'غير كلمة المرور'];
  New_password_heading = ['New Password', 'كلمة مرور جديدة'];
  oldPassword_txt = ['Old Password', 'كلمة المرور القديمة'];
  show_txt = ['Show', 'عرض'];
  newpassword_txt = ['New Password', 'كلمة مرور جديدة'];
  placeholder_name = ['Benjamin Smith', 'بنيامين سميث'];
  placeholder_email = ['benjaminsmith@gmail.com', 'benjaminsmith@gmail.com'];
  conformpassword_txt = ['Confirm New Password', 'تأكيد كلمة المرور الجديدة'];
  resetpassword_txt = ['Reset Password', 'إعادة تعيين كلمة المرور'];
  contact_txt = ['Contact Us', 'اتصل بنا'];
  message_txt = ['Message', 'رسالة'];
  howoften_txt = [
    'How often should I wash my car?',
    'كم مرة يجب أن أغسل سيارتي؟',
  ];
  howoften_txt_open = [
    'Weekly. Washing once a week will properly maintain the paint and exterior of your vehicle.',
    'أسبوعياً. الغسل مرة واحدة في الأسبوع سيحافظ على الطلاء والهيكل الخارجي لسيارتك بشكل صحيح.',
  ];
  whydid_txt = [
    'Why did my front license plate get bent?',
    'لماذا تنحني لوحة سيارتي الأمامية؟',
  ];
  isthiswash_txt = [
    'Is the wash safe for alloy wheels?',
    'هل الغسيل آمن للعجلات المعدنية؟',
  ];
  termcondition_txt = ['Term & Condition', 'الشروط و الأحكام'];
  privacypolicy_txt = ['Privacy Policy', 'سياسة الخصوصية'];
  terms_txt = ['Privacy Policy', 'سياسة الخصوصية'];
  mybookings_txt = ['My Bookings', 'حجوزاتي'];
  bookings_txt = ['Bookings', 'الحجوزات'];
  bookingid_txt = ['Booking ID: #7899302010', 'رقم الحجز: # 7899302010'];
  time_txt = ['15/Feb/22, 10:00AM', '15 / فبراير / 22 ، 10:00 صباحًا'];
  service_txt = ['Service', 'خدمة'];
  services = ['Services', 'خدمات'];
  dry_txt = ['Dry Wash', 'غسيل جاف'];
  Stream_wash = ['Steam Wash', 'غسيل بخار'];
  time_slot = ['Time Slot', 'المواعيد'];
  time2_txt = ['02:00AM', '02:00 صباحا'];
  date_txt = ['Date', 'تاريخ'];
  today_txt = ['Today', 'اليوم'];
  tomorrow_txt = ['Tomorrow', 'الغد'];
  number1_txt = ['395', 'ثلاثة مائة وخمسة وتسعون'];
  btn1_txt = ['BtN', 'BtN'];
  payment_txt = ['Payment By', 'الدفع بواسطة'];
  cash_txt = ['Cash', 'نقدي'];
  pending_txt = ['Pending', 'قيد الانتظار'];
  inprogress_txt = ['Inprogress', 'قيد التنفيذ'];
  completed_txt = ['Completed', 'مكتمل'];
  complete_txt = ['Completed', 'مكتمل'];
  adress_txt = ['Address', 'العنوان'];
  home1_txt = ['Home', 'الرئيسية'];
  //==========================25/03/2022,atul texts
  navigatelocation_txt = ['Navigate Location', 'انتقل للموقع'];
  cardetails_txt = ['Your Car Details', 'تفاصيل سيارتك'];
  extraservice_txt = ['Extra Services', 'خدمات إضافية'];
  //==========================26/03/2022,atul texts
  subtotal_txt = ['Sub Total', 'المجموع الفرعي'];
  subTotal = ['Subtotal', 'المجموع الفرعي'];
  vat_txt = ['VAT', 'ضريبة القيمة المضافة'];
  varid_txt = ['VAT ID :', 'VAT ID:'];
  totalservicecharges_txt = ['Total Service Charge', 'إجمالي رسوم الخدمة'];
  coupon_txt = ['Coupon Applied', 'تم تطبيق الكوبون'];
  wallet_txt = ['Wallet Applied', 'تطبيق المحفظة'];
  wallet = ['Wallet', 'محفظة'];
  wallet_balance = ['Wallet Blance', 'ميزانية المحفظة'];
  use_wallet = ['Use wallet', 'استخدام المحفظة'];
  use_wallet_title = ['Enter wallet amount', 'ادخل القيمة المراد استخدامها'];

  grand_txt = ['Total amount', 'المبلغ الإجمالي'];
  paymentby_txt = ['Payment By', 'الدفع بواسطة'];
  cancel1_txt = ['Cancelled', 'إلغاء'];
  cancel_new_txt = ['Cancel', 'يلغي'];
  reschedule_txt = ['Reschedule', 'إعادة الجدولة'];
  //==========================28/03/2022,atul texts
  goback_txt = ['yes', 'نعم'];
  Doyouwanttoexitapp_txt = [
    'Do you want to exit app',
    'هل تريد الخروج من التطبيق؟',
  ];
  serviceboy_txt = ['Service Boy', 'سيرفس بوي'];
  //  No_Txt=['No']
  //  yes_txt=['Yes']
  trackyourbooking_txt = ['Track Your Booking', 'تتبع الحجز الخاص بك'];
  ontheway_txt = ['On the way', 'في الطريق'];
  arrive_txt = ['Arrived', 'وصل'];
  startwashing_txt = ['Started washing', 'ابدأ الغسيل'];
  Cancellation_Reason = ['Cancellation Reason', 'سبب الإلغاء'];
  Cancellation_Reason_details = [
    'I am not able due to some urgent work sorry for the inconvenience.',
    'أنا غير قادر بسبب بعض الأعمال العاجلة ,آسف للإزعاج.',
  ];
  cancelBooking_txt = ['Cancel Booking', 'إلغاء الحجز'];
  cancelservice_txt = ['Cancel Service', 'إلغاء الخدمة'];
  submit1_txt = ['Submit', 'تقديم'];
  selectdate_txt = ['Select Date', 'حدد تاريخ'];
  Selectdatetime_txt = ['Select Date & Time', 'حدد التاريخ والوقت'];
  continue_txt = ['Continue', 'استمر'];
  sucess1_txt = ['Success', 'تم بنجاح'];
  youhavesuceessfully_txt = [
    'You have successfully Rescheduled',
    'تمت إعادة الجدولة بنجاح',
  ];
  yourbooking_txt = ['Your booking', 'حجزك'];
  bookingid1_txt = ['Booking ID', 'رقم الحجز'];
  done_txt = ['Done', 'تم'];
  selecttime1_txt = ['Select Time', 'حدد الوقت'];
  //==========================31/03/2022,atul texts
  photosworking_txt = ['Photos of working', 'صور العمل'];
  ratenow_txt = ['Rate Now', 'قيم الخدمة الآن'];

  //==========================Delete Acc
  information = ['Information Message', 'رسالة'];
  verifyCompanyEmailMsg = [
    'Please Verify Your Company Account First',
    'قم بتفعيل بريدك الالكتروني اولا',
  ];
  msgTitleServerNotRespond = ['Connection Error', 'خطأ في الإتصال'];
  noNetwork = ['No Network', 'لا يوجد شبكة'];
  msgTitleNoNetwork = ['Connection Error', 'خطأ في الإتصال'];
  serverNotRespond = ['Server Not Respond', 'الخادم لا يستجيب'];
  no_txt = ['No', 'لا'];
  yes_txt = ['Yes', 'نعم'];
  You = ['You', 'أنت'];
  SHINEFY = ['SHINEFY', 'شاين-فاي'];
  Alfa_Romeo_car = ['Alfa Romeo', 'الفا روميو'];
  Afzai_Sheikh = ['Afzai Sheikh', 'أAfzai Sheikh'];
  cancel_by_you = ['Cancelled', 'تم الغاء'];
  arsalan_sheikh = ['Arsalan Sheikh', 'شيخ أرسلان'];
  slotNot_avialable = [
    'They are no slots available. Please create booking for waiting.',
    'لا توجد مواعيد متاحة. الرجاء إنشاء الحجز للانتظار.',
  ];
  slotNot_avialableTomarrow = [
    'They are no slots available. Please create booking for another day.',
    'لا توجد مواعيد متاحة. الرجاء إنشاء الحجز ليوم آخر.',
  ];
  another_day_booking_msg = [
    'Please create booking for another day',
    'الرجاء إنشاء الحجز ليوم آخر',
  ];
  shopClose = [
    'Service is closed. Please create booking for another day.',
    'الخدمة مغلقة. الرجاء إنشاء الحجز ليوم آخر.',
  ];
  noAreaFound = [
    'Your booking out of range.Please select booking in range',
    'حجزك خارج النطاق يرجى تحديد الحجز في النطاق',
  ];
  msgBookingCancel = [
    'Your Booking Cancelled successfully',
    'تم إلغاء حجزك بنجاح',
  ];
  msgReportSend = ['Report sent successfully', 'تم إرسال التقرير بنجاح'];
  booking_location = ['Booking Loction', 'موقع الحجز'];
  booking_placeholder = ['Enter Name of Location (Home , Work ,etc...)', 'أدخل اسم الموقع (المنزل، العمل، الخ...)'];
  confirm_booking = ['Confirm Booking', 'تأكيد الحجز'];
  confirm_booking_location = [
    'Confirm Booking Location ?',
    'تأكيد موقع الحجز؟',
  ];
  Booking_overview = ['Booking Overview', 'مراجعة تفاصيل الحجز'];
  enter_promo_code = ['Enter Promo Code', 'إدخال الكوبون'];
  Book = ['Book', 'احجز'];
  waiting = ['Waiting', 'انتظار'];
  Apply = ['Apply', 'تطبيق'];
  Payment_Option = ['Payment Options', 'خيارت الدفع'];
  debit_credit_card = ['Debit/Credit Card', 'بطاقة الخصم / الائتمان'];
  add_card = ['Add Card', 'اضافة بطاقة '];
  select_payment_method = ['Select Payment Method', 'اختار طريقة الدفع'];
  select_payment_method_for_bills = [
    'Select Payment Method for Paying bills',
    'حدد طريقة الدفع لسداد الفواتير',
  ];
  Congratulations = ['Congratulations', 'تهانينا'];
  successbookingTxt = [
    'Your booking is successfully booked',
    'تم تأكيد الحجز بنجاح',
  ];
  select_your_car = ['Select Your Car', 'اختر سيارتك'];
  your_satisfied_with_work = [
    'Are you satisfied with SHINEFY Experience?',
    'هل أنت راض عن الخدمة؟',
  ];
  agian_serive_with_worker = ['Is the work of', 'هل عمل'];
  agian_serive_with_worker2 = ['meet your expectations?', 'يلبي توقعاتك؟'];
  worker_nature_txt = ['Does', 'هل'];
  worker_nature_txt2 = ['asked for accepted tips?', 'طلب إكرامية أو قبلها؟'];
  istxt = ['Is', 'هو'];
  your_review = ['Your Review', 'مراجعتك'];
  edit_vehicle_head = ['Edit Vehicle', 'تعديل السيارة'];
  Select_service = ['Select Service', 'اختر الخدمة'];
  select_main_service = ['Select Main Service', 'حدد الخدمة الرئيسية'];
  select_extra_service = ['Select Extra Service', 'حدد خدمة اضافية'];
  back_safety = ['Back Safety', 'العودة بسلامة'];
  backone = ['Back', 'عودة'];
  Most_ordered = ['Most Ordered', 'الأكثر طلبًا'];
  Interior_deodorizing = ['Interior deodorizing', 'إزالة الروائح الداخلية'];
  your_services = ['Your Services', 'خدماتك'];
  add_note_to_book = ['Add note to Book', 'أضف ملاحظة إلى الحجز'];
  note_txt = ['Note', 'ملحوظة'];
  Details = ['Details', 'تفاصيل'];
  save_location = ['Save Location', 'حفظ الموقع'];
  add_location = ['Add Location', 'اضافه الموقع'];
  SelectVehicles = ['Select Vehicles', 'حدد السيارات'];
  add_your_vehicle = ['Add Your Vehicle', 'أضف سيارتك'];
  vehicle_added_success_msg = [
    'Your vehicle added successfully',
    'تم إضافة سيارتك بنجاح',
  ];
  logout_success = ['Logout successfully', 'تم تسجيل الخروج بنجاح '];
  vehicle_add_alert = [
    'Please add your vehicle first',
    'الرجاء إضافة سيارتك أولاً',
  ];
  nextBooking_txt = [
    'Your Next Booking will be come in',
    ' الحجز الخاص بك سيبدأ خلال',
  ];
  language_change = ['language Change', 'تغير اللغة'];
  Lang_change_msg = [
    'To change language you need to restart the app',
    'لتغيير اللغة تحتاج إلى إعادة تشغيل التطبيق؟  ',
  ];
  or_txt = ['OR', 'أو'];
  search_txt = ['Search', 'بحث'];
  clear_notification_detail = [
    'Do you want to clear your notifications ?',
    'هل تريد مسح إشعاراتك؟',
  ];
  delete = ['Delete', 'حذف'];
  is_loading = ['Loading', 'تحميل'];

  delete_noti_detail = [
    'Do you want to delete this notification ?',
    'هل تريد حذف هذا الإخطار؟',
  ];
  dont_press_back = [
    "Please don't press back until the payment process is complete",
    'من فضلك لا تضغط على رجوع حتى تكتمل عملية الدفع',
  ];
  payment_txt = ['Payment', 'دفع'];
  payment_fail = [
    'Payment fail ,please try again',
    'فشل الدفع ، يرجى المحاولة مرة أخرى',
  ];
  add_card = ['Add Card' , 'اضف بطاقة']
  paypal = ['Paypal' , 'ياي بال']
  apple_pay = ['Apple Pay' , 'ابل باي']
  google_pay = ['Google Pay' , 'جوجل باي']
  deactivate = ['deactivate', 'تعطيل'];
  Remove = ['Remove', 'إزالة'];
  waiting_time_slot = ['Waiting', 'Waiting'];

  //-------------------------------------new message----------------------//

  diffrentPassword = [
    'The current password and password must be different',
    'يجب أن تكون كلمة المرور وكلمة المرور الحالية مختلفتين',
  ];

  packages =['Packages', 'الحزم']

//-------------------------------------my subscriptions----------------------//

  mySubscriptions= ['My Subscriptions', 'اشتراكاتي']

  //-------------------------------------Saved Location----------------------//

  add_new_location = ['Add New Location', 'اضافه موقع جديد']
  delete_location = ['Delete Location ?', 'حذف الموقع ؟']
  delete_location_confirmation = ['Are you sure , you want to Delete', 'هل أنت متأكد أنك تريد حذف']
  wash_location = ['Car Wash Location', 'مكان غسيل السيارات']

  what_looking_for_placholder = ['What are you looking for ?', 'ما الذي تبحث عنه ؟']
  special_offers = ['Special Offers', 'عروض خاصة']
  see_all = ['See All', 'عرض الكل']
  location_text = ['Location', 'الموقع']
  limited_time = ['limited time!', 'وقت محدود!']
  up_to = ['Up To', 'يصل الي']
  claim = ['Claim', 'طلب']
  wash_services = ['Wash Services', 'خدمات الغسيل']
  mins = ['Mins', 'دقائق']
  no_vehicles_yet = ['No Vechicle Yet', 'لا توجد سيارة حتى الآن']
  update_vechile = ['Update Vechile', 'تعديل السيارة']
  sure_to_delete_car = ['Are you sure , you want to delete your car ?' , 'هل أنت متأكد أنك تريد حذف سيارتك؟']

}
export const Lang_chg = new Language_provider();
