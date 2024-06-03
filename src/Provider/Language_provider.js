import { Alert, ToastAndroid, I18nManager, Platform } from 'react-native';
import { localStorage } from './localStorageProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from './configProvider';
import RNRestart from 'react-native-restart';

import { consolepro } from './Messageconsolevalidationprovider/Consoleprovider';

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
    if (languagem === 0) {
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
      localStorage.setItemObject('languagecathc');
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
  accepted_txt = ['Accepted', 'تم الموافقة عليه'];
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
  Home = ['SHINEFY', 'الرئيسية'];
  Message = ["Don't have an account?", 'ليس لديك حساب؟'];
  Signup = ['Signup', ' التسجيل  '];
  Forgot_password = ['Forgot Password?', 'هل نسيت كلمةالمرور؟'];
  Login_guest = ['Login as a guest', 'تسجيل الدخول كضيف'];
  New_password_placeholder = ['New Password', 'كلمة المرور الجديدة'];
  confirm_password_placeholder = [
    'Confirm New Password',
    'تأكيد كلمة المرور الجديدة',
  ];
  name_placeholder = ['Enter Name', 'أدخل الاسم'];
  company_email_txt = ['Company Email?', 'بريد الشركة الالكتروني؟'];
  Message_signup_page = ['Already have an account ?', 'هل لديك حساب ؟'];
  accept_all_terms = [
    'I accept all Terms & Conditions and Privacy',
    'أوافق على جميع الشروط والأحكام والخصوصية',
  ];
  dont_receive_otp = [
    'Don’t receive the OTP?',
    'ألم تتلق كلمة المرور لمرة واحدة (OTP)؟',
  ];
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
  Forgot_password_2 = ['Forgot Password', 'هل نسيت كلمة السر'];
  mobile_placeholder = ['Phone', 'رفم الجوال'];
  categories = ['Categories', 'فئات'];
  view = ['View All', 'عرض الكل'];
  English = ['English', 'إنجليزي'];
  Arabic = ['Arabic', 'عربي'];
  daily = ['Daily', 'اليومي'];
  week = ['Weekly', 'أسبوعي'];
  month = ['Monthly', 'شهريا'];
  login = ['Login To SHINEFY', 'تسجيل الدخول '];
  create_new_account = ['Create New Account', ' انشاء حساب جديد'];
  continue_agreement = [
    'By Continuing, you agree to our',
    'من خلال الاستمرار، فإنك توافق على لدينا',
  ];
  content_policy = ['Conent Policy', 'شروط الخدمة'];
  privacy_policy = ['Privacy Policy', 'سياسة الخصوصية'];
  terms_of_service = ['Terms Of Service', 'سياسة المحتوى'];
  login1 = ['Login', 'تسجيل الدخول'];
  signup = ['SIGNUP', 'سجل الآن'];
  mobile = ['Mobile', 'الموبيل'];
  Back = ['Back', 'عودة'];
  otp_verification = ['OTP Verification', 'التحقق من الرمز'];
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
  send = ['Send', 'أرسل'];
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
  savedlocation_txt = ['Saved Location', 'المواقع المحفوظة'];
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
  book_Now = ['Create Book Now', 'احجز الان'];
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
  mainservice_txt = ['Main Services', 'خدمات اساسية'];
  other_services = ['Other Services', 'خدمات اخري'];
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
  trackyourbooking_txt = ['Track Your Booking', 'تتبع الحجز الخاص بك'];
  ontheway_txt = ['On the way', 'في الطريق'];
  arrive_txt = ['Arrived', 'وصل'];
  startwashing_txt = ['Started washing', 'ابدأ الغسيل'];
  select_Location = ['Select Location', 'تحديد الموقع'];
  Cancellation_Reason = [
    'Please select the reason for cancellation',
    'الرجاء تحديد سبب الإلغاء',
  ];
  change_in_plans = ['Change in plans', 'التغيير في الخطط'];
  unexpected_words = ['Unexpected Words', 'كلمات غير متوقعة'];
  personal_reason = ['Personal Reason', 'سبب شخصي'];
  other_reason = ['Other', 'سبب آخر'];
  write_reason = ['Enter Your Reason', 'أدخل السبب الخاص بك'];
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
  booking_placeholder = [
    'Enter Name of Location (Home , Work ,etc...)',
    'أدخل اسم الموقع (المنزل، العمل، الخ...)',
  ];
  confirm_booking = ['Confirm Booking', 'تأكيد الحجز'];
  confirm_booking_location = [
    'Confirm Booking Location ?',
    'تأكيد موقع الحجز؟',
  ];
  Booking_overview = ['Booking Overview', 'مراجعة تفاصيل الحجز'];
  Booking_request = ['Request Details', 'تفاصيل طلبك'];
  enter_promo_code = ['Enter Promo Code', 'إدخال الكوبون'];
  Book = ['Book', 'احجز'];
  waiting = ['Waiting', 'انتظار'];
  Apply = ['Apply', 'تطبيق'];
  Payment_Option = ['Payment Options', 'خيارت الدفع'];
  debit_credit_card = ['Debit/Credit Card', 'بطاقة الخصم / الائتمان'];
  add_card = ['Add Card', 'اضافة بطاقة '];
  card_holder = ['Card Holder Name', 'اسم حامل البطاقة'];
  card_number = ['Card Number', 'رقم البطاقة '];
  expiry_date = ['Expiry Date', 'تاريخ الانتهاء'];

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
  review_txt = ['Review', 'تقييم'];
  your_review = ['Your Review', 'مراجعتك'];
  your_rating = [
    'Your Overall rating of this progress',
    'تقييمك العام لهذا التقدم',
  ];
  detailed_review = ['Add Detailed Review', 'إضافة مراجعة مفصلة'];
  enter_here = ['Enter Here', 'اكتب هنا'];
  edit_vehicle_head = ['Edit Vehicle', 'تعديل السيارة'];
  Select_service = ['Select Service', 'اختر الخدمة'];
  select_main_service = ['Select Main Service', 'حدد الخدمة الرئيسية'];
  select_extra_service = ['Select Extra Service', 'حدد خدمة اضافية'];
  back_safety = ['Back Safety', 'العودة بسلامة'];
  backone = ['Back', 'عودة'];
  Most_ordered = ['Most Ordered', 'الأكثر طلبًا'];
  order_id = ['Order ID', 'كود الطلب'];
  order_date = ['Order Date', 'تاريخ الطلب'];
  total_payment = ['Total Payment', 'اجمالي الدفع'];
  Interior_deodorizing = ['Interior deodorizing', 'إزالة الروائح الداخلية'];
  your_services = ['Your Services', 'خدماتك'];
  add_note_to_book = ['Add note to Book', 'أضف ملاحظة إلى الحجز'];
  note_txt = ['Note', 'ملحوظة'];
  Details = ['Details', 'تفاصيل'];
  save_location = ['Save Location', 'حفظ الموقع'];
  save_card = ['Save Card', 'حفظ الكارت'];
  add_location = ['Add Location', 'اضافه الموقع'];
  SelectVehicles = ['Select Vehicles', 'حدد السيارات'];
  add_your_vehicle = ['Add Your Vehicle', 'أضف سيارتك'];
  wash_fast_popup = [
    'Wash Fast , with SHINEFY',
    'اغسل سيارتك بسرعة باستخدام شاينفي',
  ];
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
  add_card = ['Add Card', 'اضف بطاقة'];
  paypal = ['Paypal', 'ياي بال'];
  apple_pay = ['Apple Pay', 'ابل باي'];
  google_pay = ['Google Pay', 'جوجل باي'];
  deactivate = ['deactivate', 'تعطيل'];
  Remove = ['Remove', 'إزالة'];
  waiting_time_slot = ['Waiting', 'Waiting'];

  //-------------------------------------new message----------------------//

  diffrentPassword = [
    'The current password and password must be different',
    'يجب أن تكون كلمة المرور وكلمة المرور الحالية مختلفتين',
  ];

  packages = ['Packages', 'الحزم'];
  package_details = ['Package Details', ' تفاصيل الحزم'];

  //-------------------------------------my subscriptions----------------------//

  mySubscriptions = ['My Subscriptions', 'اشتراكاتي'];

  //-------------------------------------Saved Location----------------------//

  add_new_location = ['Add New Location', 'اضافه موقع جديد'];
  delete_location = ['Delete Location ?', 'حذف الموقع ؟'];
  delete_location_confirmation = [
    'Are you sure , you want to Delete',
    'هل أنت متأكد أنك تريد حذف',
  ];
  wash_location = ['Car Wash Location', 'مكان غسيل السيارات'];

  what_looking_for_placholder = [
    'What are you looking for ?',
    'ما الذي تبحث عنه ؟',
  ];
  special_offers = ['Special Offers', 'عروض خاصة'];
  see_all = ['See All', 'عرض الكل'];
  location_text = ['Location', 'الموقع'];
  limited_time = ['limited time!', 'وقت محدود!'];
  up_to = ['Up To', 'يصل الي'];
  claim = ['Claim', 'طلب'];
  wash_services = ['Wash Services', 'خدمات الغسيل'];
  mins = ['Mins', 'دقائق'];
  no_vehicles_yet = ['No Vechicle Yet', 'لا توجد سيارة حتى الآن'];
  update_vechile = ['Update Vechile', 'تعديل السيارة'];
  sure_to_delete_car = [
    'Are you sure , you want to delete your car ?',
    'هل أنت متأكد أنك تريد حذف سيارتك؟',
  ];
  welcome_back = ['Welcome Back', 'مرحبًا بعودتك'];

  // Terms & Conditions
  titleTermscondition = ['Terms & Conditions', 'الشروط والأحكام'];
  termsConditionText = ['Terms and Conditions :', 'الأحكام والشروط :']
  terms1 = [
    'These terms and conditions constitute a legal agreement between you and SHINEFY Company, a limited liability company, based in Cairo. To use the service (specified below) and the associated application (defined below), you must agree to the terms and conditions described below. By using or receiving any services provided to you by the company, or downloading, installing, or using any related application provided by the company (collectively referred to as the application"), you expressly acknowledge and agree to be bound by the agreement, as well as any future amendments and additions to the agreement as they are published. From time to time on the website http://www.Shinfy.co/terms or through the electronic application. '
    ,
    'تشكل هذه الشروط والأحكام اتفاقية قانونية بينك وبين شركة SHINEFY، وهي شركة ذات مسؤولية محدودة مقرها القاهرة. لاستخدام الخدمة (المحددة أدناه) والتطبيق المرتبط بها (المحدد أدناه)، يجب عليك الموافقة على الشروط والأحكام الموضحة أدناه. باستخدام أو تلقي أي خدمات تقدمها لك الشركة، أو تنزيل أو تثبيت أو استخدام أي تطبيق ذي صلة تقدمها الشركة (يشار إليه إجمالاً بالتطبيق")، فإنك تقر وتوافق صراحةً على الالتزام بالاتفاقية، كما وكذلك أية تعديلات وإضافات مستقبلية على الاتفاقية حال نشرها من وقت لآخر على الموقع الإلكتروني http://www.Shinfy.co/terms أو من خلال التطبيق الإلكتروني.'
  ]
  terms2 = [
    '- The company reserves the right to amend the agreement, or its policies related to the service or application at any time, starting from the time of publishing an updated version of this agreement on http://www. SHINEFY.co/terms or through the platforms and application. Or if you book an appointment through the app, WhatsApp, or the online store, you are responsible for regularly reviewing this agreement. Continued use of the service or application after any such changes will constitute your acceptance of these changes.'
    ,
    '- تحتفظ الشركة بالحق في تعديل الاتفاقية، أو سياساتها المتعلقة بالخدمة أو التطبيق في أي وقت، وذلك اعتبارًا من وقت نشر نسخة محدثة من هذه الاتفاقية على http://www. SHINEFY.co/terms أو من خلال المنصات والتطبيق. أو إذا قمت بحجز موعد عبر التطبيق أو الواتساب أو المتجر الإلكتروني، فأنت مسؤول عن مراجعة هذه الاتفاقية بانتظام. إن الاستمرار في استخدام الخدمة أو التطبيق بعد أي تغييرات من هذا القبيل سيشكل موافقتك على هذه التغييرات.'
  ]
  terms3 = [
    'SHINEFY- is a car wash service that allows users to order a car care service via a mobile app. '
    ,
    'SHINEFY- هي خدمة غسيل سيارات تتيح للمستخدمين طلب خدمة العناية بالسيارة عبر تطبيق الهاتف المحمول.'
  ]
  basicTerms = ['Basic terms related to the content:', 'المصطلحات الأساسية المتعلقة بالمحتوى:']
  terms4 = [
    '-"Content" means text, graphics, images, music, software (excluding application), audio, video, information, or other materials. '
    ,
    '- "المحتوى" يعني النص أو الرسومات أو الصور أو الموسيقى أو البرامج (باستثناء التطبيق) أو الصوت أو الفيديو أو المعلومات أو المواد الأخرى.'
  ]
  terms5 = [
    '-"Company content" means the content provided by the company through the service or application, including any content licensed from a third party, excluding user content. '
    ,
    '- "محتوى الشركة" يعني المحتوى الذي تقدمه الشركة من خلال الخدمة أو التطبيق، بما في ذلك أي محتوى مرخص من طرف ثالث، باستثناء محتوى المستخدم.'
  ]
  terms6 = [
    '-"User" means the person who accesses or uses the service or application. '
    ,
    '- "المستخدم" يعني الشخص الذي يصل إلى الخدمة أو التطبيق أو يستخدمه.'
  ]
  terms7 = [
    '-"User content" means the content that the user publishes, uploads, sends or transfers to be made available through the service or application. '
    ,
    '- "محتوى المستخدم" يعني المحتوى الذي ينشره المستخدم أو يحمله أو يرسله أو ينقله ليكون متاحًا من خلال الخدمة أو التطبيق.'
  ]
  terms8 = [
    '-"Collective content" collectively means both company and user content. '
    ,
    '- "المحتوى الجماعي" يعني بشكل جماعي محتوى الشركة والمستخدم.'
  ]
  asuurance = ['Assurances and guarantees:', 'التأكيدات والضمانات:']
  terms9 = [
    'By using the application or service, you expressly acknowledge and undertake that you are legally entitled to enter into this agreement. If you are a resident of a jurisdiction that restricts use of the service because of age or limits the ability to enter into agreements such as this agreement due to age, you must adhere to these age limits and you must not use the application or service. By using the application or service, you acknowledge and undertake that you have the right, authority, and ability to enter into this agreement and be bound by the terms and conditions of this agreement. Your participation in the use of the service and / or the application is for your personal use and the use of others who have expressly authorized you. You may not authorize others to use your user status, nor may you assign or transfer your user account to any other person or entity. When using the application or service, you agree to comply with all applicable laws of your country, country, state, and the city in which you are located while using the application or service. '
    ,
    'باستخدام التطبيق أو الخدمة، فإنك تقر وتتعهد صراحةً أنه يحق لك قانونًا الدخول في هذه الاتفاقية. إذا كنت مقيمًا في ولاية قضائية تقيد استخدام الخدمة بسبب العمر أو تحد من القدرة على الدخول في اتفاقيات مثل هذه الاتفاقية بسبب العمر، فيجب عليك الالتزام بهذه الحدود العمرية ويجب عليك عدم استخدام التطبيق أو الخدمة. باستخدام التطبيق أو الخدمة، فإنك تقر وتتعهد بأن لديك الحق والسلطة والقدرة على الدخول في هذه الاتفاقية والالتزام بشروط وأحكام هذه الاتفاقية. إن مشاركتك في استخدام الخدمة و/أو التطبيق هي لاستخدامك الشخصي واستخدام الآخرين الذين صرحوا لك بذلك صراحة. لا يجوز لك السماح للآخرين باستخدام حالة المستخدم الخاصة بك، ولا يجوز لك تعيين أو نقل حساب المستخدم الخاص بك إلى أي شخص أو كيان آخر. عند استخدام التطبيق أو الخدمة، فإنك توافق على الالتزام بجميع القوانين المعمول بها في بلدك وبلدك وولايتك والمدينة التي تتواجد فيها أثناء استخدام التطبيق أو الخدمة.'
  ]
  terms10 = [
    '- You may only access the service by using approved means.The company reserves the right to terminate this agreement if you use the service or application with an incompatible or unauthorized device.'
    ,
    '-لا يجوز لك الوصول إلى الخدمة إلا باستخدام الوسائل المعتمدة. تحتفظ الشركة بالحق في إنهاء هذه الاتفاقية إذا كنت تستخدم الخدمة أو التطبيق مع جهاز غير متوافق أو غير مصرح به.'
  ]
  byUsing = [
    'By using the app or service, you:'
    ,
    'باستخدام التطبيق أو الخدمة، يمكنك:'
  ]
  terms11 = [
    'You will only use the service or app for legitimate purposes; you will not use the services to send or store any illegal materials or for fraudulent purposes. You will not use the service or app to annoy anyone. You should not impair the proper operation of the network. You will not attempt to harm the service or the application in any way. You will not copy or distribute the application or any other content without written permission from the company. You will only use the app and the service for your own use or resell it to a third party. You will maintain the security and confidentiality of your account password or any identity we provide to you that allows access to the service. You will provide us with any proof of identity that we may reasonably require. '
    ,
    'لن تستخدم الخدمة أو التطبيق إلا لأغراض مشروعة؛ لن تستخدم الخدمات لإرسال أو تخزين أي مواد غير قانونية أو لأغراض احتيالية. لن تستخدم الخدمة أو التطبيق لإزعاج أي شخص. يجب ألا تضعف التشغيل السليم للشبكة. لن تحاول الإضرار بالخدمة أو التطبيق بأي شكل من الأشكال. لا يجوز لك نسخ أو توزيع التطبيق أو أي محتوى آخر دون الحصول على إذن كتابي من الشركة. لن تستخدم التطبيق والخدمة إلا لاستخدامك الخاص أو تعيد بيعهما إلى طرف ثالث. ستحافظ على أمان وسرية كلمة المرور الخاصة بحسابك أو أي هوية نقدمها لك والتي تسمح لك بالوصول إلى الخدمة. سوف تزودنا بأي إثبات هوية قد نطلبه بشكل معقول.'
  ]
  licences = ['Licenses granted by the company for company content and user content.', 'التراخيص التي تمنحها الشركة لمحتوى الشركة ومحتوى المستخدم.']
  terms12 = [
    'Subject to your compliance with the terms and conditions of this agreement, the company grants you a limited, non-exclusive, non-transferable license: (1) to display, download and print any company content only for your personal and non-commercial purposes; and (2) to display any user content that you are permitted to access only for your personal, non-commercial purposes. You have no right to license the License rights granted in this agreement other than for their legitimate use.'
    ,
    'مع مراعاة امتثالك لشروط وأحكام هذه الاتفاقية، تمنحك الشركة ترخيصًا محدودًا وغير حصري وغير قابل للتحويل: (1) لعرض وتنزيل وطباعة أي محتوى خاص بالشركة فقط لأغراضك الشخصية وغير التجارية. ; و(2) عرض أي محتوى مستخدم يُسمح لك بالوصول إليه فقط لأغراضك الشخصية وغير التجارية. لا يحق لك ترخيص حقوق الترخيص الممنوحة في هذه الاتفاقية بخلاف استخدامها المشروع.'
  ]
  terms13 = [
    '- You may not use, copy, adapt, modify, or prepare derivative works based on, distribute, license, sell, transmit, public display, public performance, transmission, broadcast, or otherwise. '
    ,
    '- لا يجوز لك استخدام أو نسخ أو تكييف أو تعديل أو إعداد أعمال مشتقة تعتمد على أو توزيع أو ترخيص أو بيع أو نقل أو عرض عام أو أداء عام أو نقل أو بث أو غير ذلك.'
  ]
  terms14 = [
    '- You may not use, copy, adapt, modify, or prepare derivative works, distribute, license, sell, transmit, publicly display, publicly perform, transmit, broadcast, or otherwise exploit the content or the collective service, except as permitted in this agreement.No licenses or rights of any kind are granted to you by implication or otherwise by the company or its licensors, except for the licenses and rights expressly granted in this section.'
    ,
    '- لا يجوز لك استخدام أو نسخ أو تكييف أو تعديل أو إعداد أعمال مشتقة أو توزيع أو ترخيص أو بيع أو نقل أو عرض علني أو أداء علني أو نقل أو بث أو استغلال المحتوى أو الخدمة الجماعية، باستثناء ما هو مسموح به في هذه الاتفاقية. اتفاق. لا يتم منحك أي تراخيص أو حقوق من أي نوع ضمنيًا أو غير ذلك من قبل الشركة أو الجهات المرخصة لها، باستثناء التراخيص والحقوق الممنوحة صراحةً في هذا القسم.'
  ]
  userLicense = ['The license granted by the user.', 'الترخيص الممنوح من قبل المستخدم.']
  terms15 = [
    '-We may, at our sole discretion, allow user content to be published, uploaded, published, transmitted, or transmitted. By making any user content available on or through the service or application, you hereby grant the company a worldwide, irrevocable, permanent, non-exclusive, transferable, and royalty-free license, with the right to sublicense, use, watch, copy, adapt or modify, distribute, license, sell, transmit, publicly display, publicly execute, transmit, broadcast or otherwise exploit this user content in another way or through the service or application. The company does not claim any ownership rights in any user content, and nothing in this agreement will be considered a restriction of any rights that you may have to use and exploit any user content.'
    ,
    '- يجوز لنا، وفقًا لتقديرنا الخاص، السماح بنشر محتوى المستخدم أو تحميله أو نشره أو نقله أو نقله. من خلال إتاحة أي محتوى مستخدم على أو من خلال الخدمة أو التطبيق، فإنك تمنح الشركة ترخيصًا عالميًا وغير قابل للإلغاء ودائم وغير حصري وقابل للتحويل وخالي من حقوق الملكية، مع الحق في الترخيص من الباطن والاستخدام والمشاهدة والنسخ، تكييف محتوى المستخدم هذا أو تعديله أو توزيعه أو ترخيصه أو بيعه أو إرساله أو عرضه علنًا أو تنفيذه أو نقله أو بثه أو استغلاله بطريقة أخرى بطريقة أخرى أو من خلال الخدمة أو التطبيق. لا تطالب الشركة بأي حقوق ملكية في أي محتوى مستخدم، ولن يعتبر أي شيء في هذه الاتفاقية تقييدًا لأي حقوق قد تضطر إلى استخدام واستغلال أي محتوى مستخدم.'
  ]
  terms16 = [
    "You acknowledge and agree that you are solely responsible for all user content that you provide through the service or application. Accordingly, you acknowledge and undertake the following: (1) Either you are the sole and exclusive owner of all user content that you provide through the service or application or that you have all rights, licenses, approvals, and versions necessary to grant the company the rights to user content, as provided in this Convention; And (2) does not violate user content nor do we post, upload, publish, transmit, or transmit user content, or the company's use of user content(or any part of it) through, by, or through the service or application does not violate the abuse or infringement of patent rights.Or copyright, trademark, trade secrets, moral rights, other intellectual property rights, rights of publicity, privacy, or violation of the rights of any applicable law or regulation."
    ,
    "أنت تقر وتوافق على أنك المسؤول الوحيد عن جميع محتويات المستخدم التي تقدمها من خلال الخدمة أو التطبيق. وعليه، فإنك تقر وتتعهد بما يلي: (1) إما أنك المالك الوحيد والحصري لجميع محتوى المستخدم الذي تقدمه من خلال الخدمة أو التطبيق أو أن لديك جميع الحقوق والتراخيص والموافقات والإصدارات اللازمة لمنح الشركة حقوق محتوى المستخدم، على النحو المنصوص عليه في هذه الاتفاقية؛ و(2) لا ينتهك محتوى المستخدم ولا نقوم بنشر محتوى المستخدم أو تحميله أو نشره أو إرساله أو نقله، أو أن استخدام الشركة لمحتوى المستخدم (أو أي جزء منه) من خلال الخدمة أو التطبيق أو بواسطتهما أو من خلالهما لا يشكل انتهاكًا لا تنتهك إساءة أو التعدي على حقوق براءات الاختراع. أو حقوق النشر أو العلامة التجارية أو الأسرار التجارية أو الحقوق الأخلاقية أو حقوق الملكية الفكرية الأخرى أو حقوق الدعاية أو الخصوصية أو انتهاك حقوق أي قانون أو لائحة معمول بها."
  ]
  terms17 = [
    `In accordance with your commitment to this agreement, the company grants you a limited, non-exclusive, non-downloadable license to download and install a copy of the application on a single mobile device or computer that you own or control and to run this copy of the application only for your personal use. Further, with respect to any application accessed through the Apple App Store ("App Store Sourced Application"), you will only use the App Store Sourced Application: (i) on an Apple-branded product that administers iOS (Apple's proprietary ownership) system software Employment); And(2) as permitted by the "Rules of Use" set forth in the Apple App Store Terms of Service.The company reserves all rights in the application and are not expressly granted to you under this agreement.`
    ,
    `بموجب التزامك بهذه الاتفاقية، تمنحك الشركة ترخيصًا محدودًا وغير حصري وغير قابل للتنزيل لتنزيل نسخة من التطبيق وتثبيتها على جهاز محمول واحد أو جهاز كمبيوتر واحد تملكه أو تتحكم فيه وتشغيل هذه النسخة. من التطبيق فقط لاستخدامك الشخصي. علاوة على ذلك، فيما يتعلق بأي تطبيق يمكن الوصول إليه من خلال متجر تطبيقات Apple ("التطبيق المصدر من متجر التطبيقات")، فلن تستخدم سوى التطبيق المصدر من متجر التطبيقات: (1) على منتج يحمل علامة Apple التجارية ويدير نظام iOS (ملكية Apple) توظيف البرمجيات)؛ و(2) وفقًا لما تسمح به "قواعد الاستخدام" المنصوص عليها في شروط خدمة متجر تطبيقات Apple. تحتفظ الشركة بجميع الحقوق في التطبيق ولا تمنح لك صراحة بموجب هذه الاتفاقية.`
  ]
  applyAppStore = [
    'The following applies to any App Store app:'
    ,
    'ينطبق ما يلي على أي تطبيق من تطبيقات App Store:'
  ]
  terms18 = [
    '- You acknowledge and agree that: (1) This agreement is entered into between you and the company only, and not Apple, and (ii) the company, not Apple, is solely responsible for the app sourced from the App Store and its content. Your use of the App Store Sourced app must comply with the App Store Terms of Service.'
    ,
    '- أنت تقر وتوافق على ما يلي: (1) تم إبرام هذه الاتفاقية بينك وبين الشركة فقط، وليس Apple، و(2) الشركة، وليس Apple، هي المسؤولة الوحيدة عن التطبيق الذي تم الحصول عليه من App Store ومحتواه. . يجب أن يتوافق استخدامك لتطبيق App Store Sourced مع شروط خدمة App Store.'
  ]
  terms19 = [
    '-You acknowledge that Apple is under no obligation to provide any maintenance or support services with respect to the App Store Sourced Application.'
    ,
    '- أنت تقر بأن شركة Apple ليست ملزمة بتقديم أي خدمات صيانة أو دعم فيما يتعلق بالتطبيق المصدر من متجر التطبيقات.'
  ]
  terms20 = [
    "- In the event that the App Store Sourced application fails to comply with any valid warranty, you can notify Apple, and Apple will refund the purchase price of the App Store Sourced application to you to the maximum extent permitted by applicable law, Apple shall have no warranty obligation whatsoever regarding App Store Sourced app, as the case between the company and Apple, any claims, losses, liabilities, damages, costs or other expenses attributable to any failure to comply with any warranty will be the company's sole responsibility."
    ,
    '- في حالة فشل تطبيق App Store Sourced في الامتثال لأي ضمان صالح، يمكنك إخطار Apple، وسوف تقوم Apple برد سعر شراء التطبيق App Store Sourced إليك إلى الحد الأقصى الذي يسمح به القانون المعمول به، ويجب أن يكون لدى Apple لا يوجد أي التزام بالضمان على الإطلاق فيما يتعلق بتطبيق App Store Sourced، كما هو الحال بين الشركة وApple، فإن أي مطالبات أو خسائر أو التزامات أو أضرار أو تكاليف أو نفقات أخرى تعزى إلى أي فشل في الامتثال لأي ضمان ستكون مسؤولية الشركة وحدها.'
  ]
  terms21 = [
    '-You and the company acknowledge that, between the company and Apple, Apple is not responsible for processing any claims you have or any claims from any third party relating to the source application from the App Store or your possession and use of the App Store source application, including, but not limited to: (1) Product Liability Claims; (ii) Any claim the app from App Store Sourced fails to comply with any applicable legal or regulatory requirements; and (3) claims arising under consumer protection or similar legislation.'
    ,
    '-تقر أنت والشركة بأنه، بين الشركة وApple، فإن Apple ليست مسؤولة عن معالجة أي مطالبات لديك أو أي مطالبات من أي طرف ثالث فيما يتعلق بالتطبيق المصدر من متجر التطبيقات أو امتلاكك واستخدامك لمصدر متجر التطبيقات. التطبيق، بما في ذلك، على سبيل المثال لا الحصر: (1) مطالبات المسؤولية عن المنتج؛ (2) أي مطالبة بأن التطبيق من App Store Sourced يفشل في الالتزام بأي متطلبات قانونية أو تنظيمية معمول بها؛ و(3) المطالبات الناشئة بموجب تشريعات حماية المستهلك أو التشريعات المماثلة.'
  ]
  terms22 = [
    '-You and the company acknowledge that if any third party claims that the application Store Sourced or that your owning and usage of App Store Sourced application violates the intellectual property rights of the third party, as is the case between the company and Apple, the company, not Apple, it will be solely responsible for the investigation and defense, settlement and disclosure of any claim related to infringement of intellectual property rights to the extent required by this agreement.'
    ,
    '-تقر أنت والشركة بأنه إذا ادعى أي طرف ثالث أن التطبيق Store Sourced أو أن امتلاكك واستخدامك لتطبيق App Store Sourced ينتهك حقوق الملكية الفكرية للطرف الثالث، كما هو الحال بين الشركة وشركة Apple، فإن الشركة وليست شركة Apple، فهي ستكون وحدها المسؤولة عن التحقيق والدفاع والتسوية والكشف عن أي مطالبة تتعلق بانتهاك حقوق الملكية الفكرية إلى الحد الذي تقتضيه هذه الاتفاقية.'
  ]
  terms23 = [
    'Without limiting any other terms of this agreement, you must comply with all applicable third-party terms of agreement when using the App Store Sourced app.'
    ,
    'دون تقييد أي شروط أخرى لهذه الاتفاقية، يجب عليك الالتزام بجميع شروط اتفاقية الطرف الثالث المعمول بها عند استخدام التطبيق App Store Sourced.'
  ]
  terms24 = [
    'You may not (1) license, sublicense, sell, resell, transfer, assign, distribute, commercialize or apply in any other way for commercial purposes or make them available to any third party; (2) Modify or create a derivative business based on the service or application; (3) Creating online "links" to the service, "frame" or "mirroring" of any application on any other server, wireless device, or Internet-based device; (4) Reverse engineer or access to the application in order to (a) build a competitive product or service, (b) build a product using ideas, features, functionality, or graphics similar to the service or application, or (c) copy any ideas, features, functions, or Service or application graphics, or (5) Automatic program or script startup, including but not limited to network web, web crawlers, web bots, web indexer, bots, viruses or worms. Or any program that may present multiple server requests per second, or overburden or hinder the operation and / or performance of the service or application.'
    ,
    'لا يجوز لك (1) ترخيص أو ترخيص من الباطن أو بيع أو إعادة بيع أو نقل أو تعيين أو توزيع أو تسويق أو تقديم طلب بأي طريقة أخرى لأغراض تجارية أو إتاحتها لأي طرف ثالث؛ (2) تعديل أو إنشاء أعمال مشتقة بناءً على الخدمة أو التطبيق؛ (3) إنشاء "روابط" عبر الإنترنت للخدمة أو "إطار" أو "نسخ" لأي تطبيق على أي خادم آخر أو جهاز لاسلكي أو جهاز قائم على الإنترنت؛ (4) إجراء هندسة عكسية للتطبيق أو الوصول إليه من أجل (أ) إنشاء منتج أو خدمة تنافسية، (ب) إنشاء منتج باستخدام أفكار أو ميزات أو وظائف أو رسومات مشابهة للخدمة أو التطبيق، أو (ج) النسخ أي أفكار أو ميزات أو وظائف أو رسومات الخدمة أو التطبيق، أو (5) بدء تشغيل البرنامج أو البرنامج النصي تلقائيًا، بما في ذلك على سبيل المثال لا الحصر شبكة الويب أو برامج زحف الويب أو روبوتات الويب أو مفهرس الويب أو الروبوتات أو الفيروسات أو الديدان. أو أي برنامج قد يقدم طلبات خادم متعددة في الثانية، أو يثقل أو يعيق تشغيل و/أو أداء الخدمة أو التطبيق.'
  ]
  terms25 = [
    'You may not: (1) Send unwanted or duplicate or unwanted messages in a manner that violates applicable laws; (2) Sending or storing material that is infringing, obscene, threatening, defamatory, illegal, or harmful in any other way, including material harmful to children or that violates the privacy rights of a third party; (3) Sending or storing material that contains software viruses, worms, Trojans or other harmful code, files, scripts or malicious software; (4) Interferes with or disrupts the integrity or performance of the application or service or the data contained therein; Or (5) Attempting to gain unauthorized access to the application, service, systems, or related networks.'
    ,
    'لا يجوز لك: (1) إرسال رسائل غير مرغوب فيها أو مكررة أو غير مرغوب فيها بطريقة تنتهك القوانين المعمول بها؛ (2) إرسال أو تخزين مواد تنتهك أو فاحشة أو تهديدية أو تشهيرية أو غير قانونية أو ضارة بأي طريقة أخرى، بما في ذلك المواد الضارة بالأطفال أو التي تنتهك حقوق الخصوصية لطرف ثالث؛ (3) إرسال أو تخزين المواد التي تحتوي على فيروسات برمجية أو ديدان أو أحصنة طروادة أو غيرها من التعليمات البرمجية الضارة أو الملفات أو البرامج النصية أو البرامج الضارة؛ (4) يتعارض مع أو يعطل سلامة أو أداء التطبيق أو الخدمة أو البيانات الواردة فيها؛ أو (5) محاولة الوصول غير المصرح به إلى التطبيق أو الخدمة أو الأنظمة أو الشبكات ذات الصلة.'
  ]
  terms26 = [
    '-The company will have the right to investigate and prosecute violations of any of the above to the maximum extent permitted by law. The Company may engage and cooperate with law enforcement authorities in prosecuting users who violate this agreement. You acknowledge that the company is not obligated to monitor your access to the service, application, or collective content, or its use, or review or edit any collective content, but it is entitled to do so for the purpose of operating the service and the application, to ensure your compliance with this agreement, or compliance with applicable law or an order or condition from a court Or an administrative agency or other government agency. The company reserves the right, at any time and without prior notice, to remove or disable access to any group content that the company considers, in its absolute discretion, to violate this agreement or otherwise harm the service or application.'
    ,
    '- يحق للشركة التحقيق في انتهاكات أي مما ورد أعلاه ومقاضاة مرتكبيها إلى أقصى حد يسمح به القانون. يجوز للشركة المشاركة والتعاون مع سلطات إنفاذ القانون في مقاضاة المستخدمين الذين ينتهكون هذه الاتفاقية. أنت تقر بأن الشركة غير ملزمة بمراقبة وصولك إلى الخدمة أو التطبيق أو المحتوى الجماعي أو استخدامه أو مراجعة أو تحرير أي محتوى جماعي، ولكن يحق لها القيام بذلك لغرض تشغيل الخدمة والموقع. التطبيق، لضمان امتثالك لهذه الاتفاقية، أو الامتثال للقانون المعمول به أو أمر أو شرط من محكمة أو وكالة إدارية أو وكالة حكومية أخرى. تحتفظ الشركة بالحق، في أي وقت ودون إشعار مسبق، في إزالة أو تعطيل الوصول إلى أي محتوى جماعي تعتبره الشركة، وفقًا لتقديرها المطلق، ينتهك هذه الاتفاقية أو يضر بالخدمة أو التطبيق.'
  ]
  copyRightPolicy = [
    'Copyright policy'
    ,
    'سياسة حقوق النشر'
  ]
  terms27 = [
    "-The company respects copyright law and expects its users to do the same. It is company policy to terminate service in appropriate circumstances for users or other account holders who repeatedly infringe or are believed to be repeatedly violating the rights of copyright owners."
    ,
    '-تحترم الشركة قانون حقوق الطبع والنشر وتتوقع من مستخدميها أن يفعلوا الشيء نفسه. تتمثل سياسة الشركة في إنهاء الخدمة في الظروف المناسبة للمستخدمين أو أصحاب الحسابات الآخرين الذين ينتهكون حقوق أصحاب حقوق الطبع والنشر بشكل متكرر أو يُعتقد أنهم ينتهكونها بشكل متكرر.'
  ]
  terms28 = [
    "- You are not entitled to abuse the application in any way for a personal purpose. When you encounter any problem, you can contact the official communication platforms by email: care@Shinfy.co, and the company has the right to take the necessary measures regarding the customer's violation of that."
    ,
    "- لا يحق لك إساءة استخدام التطبيق بأي شكل من الأشكال لغرض شخصي. عند مواجهة أي مشكلة يمكنك التواصل مع منصات التواصل الرسمية عبر البريد الإلكتروني:care@Shinfy.co، وللشركة الحق في اتخاذ الإجراءات اللازمة بشأن مخالفة العميل لذلك."
  ]
  grantedByUser = ['The license granted by the user.', 'الترخيص الممنوح من قبل المستخدم.']
  terms29 = [
    '- Any fees that the company may impose on your request or service, are due immediately and are not refundable, and the company has the right to impose a fee 100% on reservations not provided due to postponement, cancellation, or non-response of the customer one hour before the service'
    ,
    '- أي رسوم قد تفرضها الشركة على طلبك أو خدمتك، تكون مستحقة فورًا وغير قابلة للاسترداد، ويحق للشركة فرض رسوم بنسبة 100% على الحجوزات التي لم يتم تقديمها بسبب التأجيل أو الإلغاء أو عدم الاستجابة العميل قبل ساعة من الخدمة'
  ]
  terms30 = [
    '- This refund policy does not always apply regardless of your decision to terminate your use or our decision to terminate your use or disrupt our application or service, whether planned, incidental, or intended, for any reason. The company reserves the right to set the final prevailing price. Please note that the pricing information published on the Site may not reflect the prevailing price.'
    ,
    '- لا تنطبق سياسة استرداد الأموال هذه دائمًا بغض النظر عن قرارك بإنهاء استخدامك أو قرارنا بإنهاء استخدامك أو تعطيل تطبيقنا أو خدمتنا، سواء كان مخططًا أو عرضيًا أو مقصودًا، لأي سبب من الأسباب. تحتفظ الشركة بالحق في تحديد السعر السائد النهائي. يرجى ملاحظة أن معلومات التسعير المنشورة على الموقع قد لا تعكس السعر السائد.'
  ]
  terms31 = [
    '- the company has the right to amend or update prices from time to time, and it must be kept up to date.'
    ,
    '- يحق للشركة تعديل أو تحديث الأسعار من وقت لآخر، ويجب أن تبقى محدثة.'
  ]
  terms32 = [
    '- The company, at its sole discretion, offers promotions with different features and different prices to any of our customers. These promotions, unless provided to you, will have no effect on your offer or any contract with the company. The company may change the service or application fees, as we deem necessary for our business. We encourage you to periodically check our website if you are interested in company fees for the service or application. Any coupon exceeding the specified date will not be accepted.'
    ,
    '- تقدم الشركة، وفقًا لتقديرها الخاص، عروضًا ترويجية بمميزات مختلفة وأسعار مختلفة لأي من عملائنا. لن يكون لهذه العروض الترويجية، ما لم يتم تقديمها لك، أي تأثير على عرضك أو أي عقد مع الشركة. يجوز للشركة تغيير رسوم الخدمة أو الطلب، حسبما نراه ضروريًا لأعمالنا. نحن نشجعك على مراجعة موقعنا بشكل دوري إذا كنت مهتمًا برسوم الشركة مقابل الخدمة أو التطبيق. لن يتم قبول أي قسيمة تتجاوز التاريخ المحدد.'
  ]
  terms33 = [
    '- We accept online payment using Visa and MasterCard credit/debit card and we are not responsible in the event of system or network failure of one of the existing payment solutions.'
    ,
    '- نحن نقبل الدفع عبر الإنترنت باستخدام بطاقة الائتمان/الخصم Visa وMasterCard ولا نتحمل المسؤولية في حالة تعطل النظام أو الشبكة لأحد حلول الدفع الحالية.'
  ]
  terms34 = [
    '* If you do not pay the due service, this exposes you to legal accountability.'
    ,
    '* عدم سداد الخدمة المستحقة يعرضك للمساءلة القانونية.'
  ]
  terms35 = [
    'http://Shinfy.co will NOT deal or provide any services or products to any of the OFAC (Office of Foreign Assets Control) sanctions countries in accordance with the law of Egypt.'
    ,
    'http://Shinfy.co لن يتعامل أو يقدم أي خدمات أو منتجات لأي من الدول الخاضعة لعقوبات مكتب مراقبة الأصول الأجنبية (OFAC) وفقًا للقانون المصري.'
  ]
  vehcileAccessories = ['Vehicle accessories and damages policy.', 'سياسة ملحقات السيارة والأضرار.']
  terms36 = [
    '-If you have requested any SHINEFY interior cleaning service for your vehicle it is your responsibility to remove and return additional accessories. SHINEFY personnel will not remove or reposition child seats or other things, even if requested by the customer. The company is not and will not be held responsible for any undesirable event arising from improper handling of child seats before and after service, and the customer has no right to request that from the service provider.'
    ,
    '-إذا كنت قد طلبت أي خدمة تنظيف داخلي من SHINEFY لسيارتك، فمن مسؤوليتك إزالة الملحقات الإضافية وإعادتها. لن يقوم موظفو SHINEFY بإزالة مقاعد الأطفال أو أشياء أخرى أو تغيير موضعها، حتى إذا طلب العميل ذلك. الشركة ليست ولن تكون مسؤولة عن أي حدث غير مرغوب فيه ينشأ عن التعامل غير السليم مع مقاعد الأطفال قبل وبعد الخدمة، ولا يحق للعميل طلب ذلك من مزود الخدمة.'
  ]
  terms37 = [
    '- If you have requested an external or internal cleaning service from a SHINEFY for your car, and there is a piece that has been installed inside the car such as installing a curtain, camera, or company others, the staff will not remove, hatch, or close any of the mentioned even if the customer requests so, as it is your responsibility to remove, open, or close and the customer has no right to request that of the service provider.'
    ,
    '- إذا كنت قد طلبت خدمة تنظيف خارجية أو داخلية من شركة SHINEFY لسيارتك، ويوجد قطعة تم تركيبها داخل السيارة مثل تركيب ستارة أو كاميرا أو شركة أخرى، فلن يقوم الموظفون بإزالة أو تفقيس أو أو إغلاق أي مما ذكر حتى لو طلب العميل ذلك، حيث أن الإزالة أو الفتح أو الإغلاق تقع على عاتقك ولا يحق للعميل طلب ذلك من مزود الخدمة.'
  ]
  terms38 = [
    '-If there is any kind of protection outside the car such as (nano ceramic) and many others, the customer service personnel must be informed before the appointment.'
    ,
    '-في حالة وجود أي نوع من أنواع الحماية خارج السيارة مثل (النانو سيراميك) وغيرها الكثير يجب إبلاغ موظفي خدمة العملاء قبل الموعد.'
  ]
  terms39 = [
    "-SHINEFY will not bear any responsibility for the loss or damage of the client's property that he did not remove in advance and does not provide any compensation for that"
    ,
    "- لن تتحمل SHINEFY أي مسؤولية عن فقدان أو تلف ممتلكات العميل التي لم يقوم بإزالتها مقدما ولا تقدم أي تعويض عن ذلك"
  ]
  terms40 = [
    '- SHINEFY will not bear any responsibility for any damage created by parts or materials provided by the customer to the biker to do any cleaning or work.'
    ,
    '- لن تتحمل SHINEFY أي مسؤولية عن أي ضرر يحدث بسبب الأجزاء أو المواد التي يقدمها العميل لراكب الدراجة للقيام بأي تنظيف أو عمل.'
  ]
  terms41 = [
    "-SHINEFY does not bear responsibility for any undesirable event arising from incorrect handling of internal or external damage to the car's parts, nor does it bear responsibility for the service provider's violation of any damage that occurred after the customer requested to act within the aforementioned."
    ,
    "- لا تتحمل SHINEFY مسؤولية أي حدث غير مرغوب فيه ينشأ عن التعامل غير الصحيح مع الأضرار الداخلية أو الخارجية التي تلحق بأجزاء السيارة، كما أنها لا تتحمل مسؤولية مخالفة مزود الخدمة لأي ضرر حدث بعد طلب العميل التصرف ضمن ما سبق ذكره."
  ]
  terms42 = [
    '-We consider all observations and complaints submitted via the system within 24 hours maximum of the appointment (you are not entitled to claim after 24 hours)'
    ,
    '-ننظر في كافة الملاحظات والشكاوى المقدمة عبر النظام خلال 24 ساعة كحد أقصى من الموعد (لا يحق لك المطالبة بعد 24 ساعة)'
  ]
  terms43 = [
    '- We note the importance of ensuring the quality provided before the service provider (Biker) goes.'
    ,
    '- ننوه إلى أهمية التأكد من الجودة المقدمة قبل رحيل مقدم الخدمة (الدراج).'
  ]
  terms44 = [
    '- All materials used are appropriate and intended for laundry uses, and your waiving of one of the services provided does not mean a difference in the value of the service'
    ,
    '- جميع المواد المستخدمة مناسبة ومخصصة لاستخدامات الغسيل، وتنازلك عن إحدى الخدمات المقدمة لا يعني اختلافاً في قيمة الخدمة'
  ]
  intellectualProperty = ['Intellectual property', 'الملكية الفكرية']
  terms45 = [
    '-The company solely (and its licensors, where applicable) must have all rights, ownership, and interests, including all related intellectual property rights, in the application and the service and any suggestions, ideas, requests for improvement, comments, recommendations, or other information provided by you or any other party related to the application or service. This agreement is not a sale and does not transfer to you any ownership rights related to the application or service or any intellectual property rights owned by the company. The company name, company logo, and product names associated with the application and service are trademarks of the company.'
    ,
    '- يجب أن تتمتع الشركة وحدها (والجهات المرخصة لها، حيثما ينطبق ذلك) بجميع الحقوق والملكية والمصالح، بما في ذلك جميع حقوق الملكية الفكرية ذات الصلة، في التطبيق والخدمة وأي اقتراحات أو أفكار أو طلبات للتحسين أو التعليقات أو التوصيات أو المعلومات الأخرى التي تقدمها أنت أو أي طرف آخر يتعلق بالتطبيق أو الخدمة. هذه الاتفاقية ليست بيعًا ولا تنقل لك أي حقوق ملكية تتعلق بالتطبيق أو الخدمة أو أي حقوق ملكية فكرية مملوكة للشركة. اسم الشركة وشعارها وأسماء المنتجات المرتبطة بالتطبيق والخدمة هي علامات تجارية مملوكة للشركة.'
  ]
  terms46 = [
    "-The company may rely on advertisements and marketing of third parties provided through the application or service and other mechanisms to support the application or service. By agreeing to these terms and conditions, you agree to receive these advertisements and marketing. If you do not wish to receive such advertisements, you must notify us in writing. The company reserves the right to impose higher fees on the service or application if you choose not to receive these advertising services. These fees, if any, will be published on the company's website at http://www .Shinfy.co. The company may collect and release information about you and your use of the application or service on an anonymous basis as part of a customer profile, report, or similar analysis. You agree that it is your responsibility to take reasonable precautions in all actions and interactions with any third party with whom you interact through the service."
    ,
    "- يجوز للشركة الاعتماد على إعلانات وتسويق الطرف الثالث المقدمة من خلال التطبيق أو الخدمة وغيرها من الآليات لدعم التطبيق أو الخدمة. بموافقتك على هذه الشروط والأحكام، فإنك توافق على تلقي هذه الإعلانات والتسويق. إذا كنت لا ترغب في تلقي مثل هذه الإعلانات، فيجب عليك إخطارنا كتابيًا. تحتفظ الشركة بالحق في فرض رسوم أعلى على الخدمة أو التطبيق إذا اخترت عدم تلقي هذه الخدمات الإعلانية. وسيتم نشر هذه الرسوم، إن وجدت، على موقع الشركة على الويب http://www .Shinfy.co. يجوز للشركة جمع وإصدار معلومات عنك وعن استخدامك للتطبيق أو الخدمة على أساس مجهول كجزء من ملف تعريف العميل أو التقرير أو التحليل المماثل. أنت توافق على أنه يقع على عاتقك مسؤولية اتخاذ الاحتياطات المعقولة في جميع الإجراءات والتفاعلات مع أي طرف ثالث تتفاعل معه من خلال الخدمة."
  ]
  terms47 = [
    '-The company may send a notice to your email address registered in the company account information, or via the contact number written in your information (this notification is considered in advance when it is received by the company)'
    ,
    '-قد ترسل الشركة إشعارًا إلى عنوان بريدك الإلكتروني المسجل في معلومات حساب الشركة، أو عبر رقم الاتصال المكتوب في معلوماتك (يؤخذ هذا الإشعار في الاعتبار مسبقًا عند استلامه من قبل الشركة)'
  ]
  notice = ['Notice', 'ملاحظة']
  terms48 = [
    '- If the event that the customer does not respond to any action taken within 24 hours max, the company (SHINEFY) has the right to close the complaint.'
    ,
    '- في حالة عدم استجابة العميل لأي إجراء تم اتخاذه خلال 24 ساعة كحد أقصى، يحق لشركة (SHINEFY) إغلاق الشكوى.'
  ]
  terms49 = [
    '-The company is not responsible for your unawareness/ prior knowledge of the washing method or the service price.'
    ,
    '- الشركة غير مسئولة عن عدم علمك/معرفتك المسبقة بطريقة الغسيل أو سعر الخدمة.'
  ]
  terms50 = [
    '- Any dispute, claim, or dispute arises out of or in connection with this agreement, including dispute, claim, or dispute that arises in connection with its interpretation or in relation to any non-contractual obligations arising out of or in relation to this agreement shall be settled amicably between the parties, upon receipt of written notice by a party from the other party about the dispute. If it is not possible to settle the dispute amicably within a period of 60 days from the date on which the concerned party notifies the other party in writing from the date such dispute has risen, the two parties agree to refer it to the Egyptian Commercial Arbitration for final settlement in accordance with the special arbitration rules in force in Egypt.'
    ,
    '- أي نزاع أو مطالبة أو نزاع ينشأ عن أو فيما يتعلق بهذه الاتفاقية، بما في ذلك النزاع أو المطالبة أو النزاع الذي ينشأ فيما يتعلق بتفسيرها أو فيما يتعلق بأي التزامات غير تعاقدية تنشأ عن أو فيما يتعلق بهذه الاتفاقية تتم تسويته ودياً بين الطرفين، عند استلام إشعار كتابي من أحد الطرفين من الطرف الآخر بشأن النزاع. وإذا لم يمكن تسوية النزاع ودياً خلال مدة 60 يوماً من تاريخ قيام الطرف المعني بإخطار الطرف الآخر كتابياً من تاريخ نشوء النزاع، اتفق الطرفان على إحالته إلى التحكيم التجاري المصري. للتسوية النهائية وفقا لقواعد التحكيم الخاصة المعمول بها في مصر.'
  ]
  terms51 = [
    '- Users can book appointments for the upcoming 7 days. Each day there are available time slots that are free to book. - Users may book any time slots available as soon as 1 hour before the appointment. - In case of canceling the booking, users are still allowed to cancel bookings 1 hour before the appointment starts. - In case a user cancels a booking within one hour or less before the appointments start, there will be a penalty of %100 of the transaction amount that will be deducted from the user'
    ,
    '- يمكن للمستخدمين حجز المواعيد للأيام السبعة القادمة. هناك فترات زمنية متاحة يمكن حجزها مجانًا كل يوم. - يمكن للمستخدمين حجز أي فترات زمنية متاحة قبل ساعة واحدة من الموعد. - في حالة إلغاء الحجز، لا يزال يُسمح للمستخدمين بإلغاء الحجوزات قبل ساعة واحدة من بدء الموعد. - في حالة قيام المستخدم بإلغاء الحجز خلال ساعة واحدة أو أقل قبل بدء المواعيد، سيتم فرض غرامة قدرها 100% من مبلغ المعاملة التي سيتم خصمها من المستخدم'
  ]
  terms52 = [
    '*All credit/debit card details and personally identifiable information will NOT be stored, sold, shared, rented, or leased to any third parties.'
    ,
    '*لن يتم تخزين جميع تفاصيل بطاقة الائتمان/الخصم ومعلومات التعريف الشخصية، أو بيعها، أو مشاركتها، أو تأجيرها، أو تأجيرها لأي طرف ثالث.'
  ]
  terms53 = [
    '*Any dispute or claim arising out of or in connection with this website shall be governed and construed in accordance with the laws of Egypt.'
    ,
    '* أي نزاع أو مطالبة تنشأ عن أو فيما يتعلق بهذا الموقع يجب أن يخضع ويفسر وفقًا لقوانين مصر.'
  ]
  terms54 = [
    '*We accept payments online using Visa and MasterCard credit/debit card'
    ,
    '*نحن نقبل الدفع عبر الإنترنت باستخدام بطاقة الائتمان/الخصم Visa وMasterCard'
  ]
  refundPolicy = ['Refund Policy', 'سياسة الاسترجاع']
  terms55 = [
    "Refunds will be made onto the customer's Wallet and will be processed within 10 days Maximum."
    ,
    "سيتم رد المبالغ المستردة إلى محفظة العميل وستتم معالجتها خلال 10 أيام كحد أقصى."
  ]
  terms56 = [
    'And The customer can use the credit for any transactions later.'
    ,
    'ويمكن للعميل استخدام الرصيد في أي معاملات لاحقًا.'
  ]
  // 
  policy1 = [
    'We, SHINEFY Corporation are committed to protecting the privacy of our visitors and members. The Privacy Policy sets out the following information that it may collect and how we can use the same to better serve visitors and members while using our website www. SHINEFY.co and the mobile application.'
    ,
    'نحن، شركة SHINEFY، ملتزمون بحماية خصوصية زوارنا وأعضائنا. تحدد سياسة الخصوصية المعلومات التالية التي قد تجمعها وكيف يمكننا استخدامها لتقديم خدمة أفضل للزوار والأعضاء أثناء استخدام موقعنا الإلكتروني www. SHINEFY.co وتطبيقات الهاتف المحمول.'
  ]

  policy2 = [
    'Please read this Privacy Policy carefully to understand our policies and practices regarding your information and how we will treat it. By accessing or using our website and mobile application (the combined service), you agree to the terms of this Privacy Policy, this Privacy Policy may change from time to time. Please review the following carefully so that you understand our privacy practices.'
    ,
    'يرجى قراءة سياسة الخصوصية هذه بعناية لفهم سياساتنا وممارساتنا المتعلقة بمعلوماتك وكيف سنتعامل معها. من خلال الوصول إلى أو استخدام موقعنا الإلكتروني وتطبيق الهاتف المحمول (الخدمة المدمجة)، فإنك توافق على شروط سياسة الخصوصية هذه، وقد تتغير سياسة الخصوصية هذه من وقت لآخر. يرجى مراجعة ما يلي بعناية حتى تتمكن من فهم ممارسات الخصوصية لدينا.'
  ]

  policy3 = [
    'If you have queries about this Privacy Policy, please contact us at info@ SHINEFY.co.'
    ,
    'إذا كانت لديك استفسارات حول سياسة الخصوصية هذه، فيرجى الاتصال بنا على info@SHINEFY.co.'
  ]

  informationWeCollect = [
    'The information we collect:'
    ,
    'المعلومات التي نجمعها:'
  ]

  policy4 = [
    'Upon registering for a service (whether as a customer, partner, or service provider), a user profile is developed to further customize the user experience. The current required data fields are:'
    ,
    'عند التسجيل للحصول على خدمة (سواء كعميل أو شريك أو مزود خدمة)، يتم تطوير ملف تعريف المستخدم لمزيد من تخصيص تجربة المستخدم. حقول البيانات المطلوبة الحالية هي:'
  ]

  policy5 = [
    'Email-password-name-mobile number-date of birth-gender-car-type-color-size'
    ,
    'البريد الإلكتروني-كلمة المرور-الاسم-رقم الموبايل-تاريخ الميلاد-الجنس-نوع السيارة-اللون-الحجم'
  ]

  policy6 = [
    "In addition, tracking information collection is made while navigating across our application or using the service, including, but not limited to, geographic regions. If you request wash through the service, the driver's mobile phone will record your GPS coordinates."
    ,
    "بالإضافة إلى ذلك، يتم جمع معلومات التتبع أثناء التنقل عبر تطبيقنا أو استخدام الخدمة، بما في ذلك، على سبيل المثال لا الحصر، المناطق الجغرافية. إذا طلبت الغسيل من خلال الخدمة، فسيقوم الهاتف المحمول الخاص بالسائق بتسجيل إحداثيات نظام تحديد المواقع العالمي (GPS) الخاص بك."
  ]

  policy7 = [
    'When you use our mobile application, we also collect the device type and unique identifier, we only use this information for the sole purpose of providing you with the latest apps and features. You can also choose to upload images while using the site or the app, if you wish to do so, this may be viewable by car wash service providers so that they can verify your vehicle. You can remove or update the photos at any time by logging into your account. If you use our services through your mobile device, we will track your geolocation information so that you are able to view the car wash service providers in your area near your location, and set the location of your laundry, and our service providers can find the location where you want to wash your car. We will not share this information with other parties for whatsoever purpose and we will only use this information solely to fulfill your request.'
    ,
    'عند استخدام تطبيق الهاتف المحمول الخاص بنا، نقوم أيضًا بجمع نوع الجهاز والمعرف الفريد، ونستخدم هذه المعلومات فقط لغرض وحيد هو تزويدك بأحدث التطبيقات والميزات. يمكنك أيضًا اختيار تحميل الصور أثناء استخدام الموقع أو التطبيق، إذا كنت ترغب في القيام بذلك، فقد يكون ذلك قابلاً للعرض من قبل مقدمي خدمة غسيل السيارات حتى يتمكنوا من التحقق من سيارتك. يمكنك إزالة الصور أو تحديثها في أي وقت عن طريق تسجيل الدخول إلى حسابك. إذا كنت تستخدم خدماتنا من خلال جهازك المحمول، فسنتتبع معلومات موقعك الجغرافي حتى تتمكن من عرض مقدمي خدمة غسيل السيارات في منطقتك القريبة من موقعك، وتعيين موقع مغسلتك، ويمكن لمقدمي الخدمة لدينا العثور على المكان الذي تريد غسل سيارتك فيه. لن نشارك هذه المعلومات مع أطراف أخرى لأي غرض كان ولن نستخدم هذه المعلومات إلا لتلبية طلبك.'
  ]

  policy8 = [
    `To help us better meet your needs, we use "cookies" to store and sometimes track user information. A cookie is a small amount of data that is sent to your browser from a web server and stored on your computer's hard drive.Cookies can be disabled or controlled by selecting the preference within your web browser.`
    ,
    `لمساعدتنا على تلبية احتياجاتك بشكل أفضل، نستخدم "ملفات تعريف الارتباط" لتخزين معلومات المستخدم وتتبعها أحيانًا. ملف تعريف الارتباط هو كمية صغيرة من البيانات التي يتم إرسالها إلى متصفحك من خادم الويب وتخزينها على القرص الصلب بجهاز الكمبيوتر الخاص بك. يمكن تعطيل ملفات تعريف الارتباط أو التحكم فيها عن طريق تحديد التفضيل داخل متصفح الويب الخاص بك.`
  ]

  policy9 = [
    `Users of the website and application should be aware that non-personal information and data may be collected automatically by virtue of the standard operation of the company's computer servers or using "cookies".Cookies are files that a website can use to identify frequent users, and to allow the website to track web usage behavior.Cookies take up little space on your computer and cannot damage computer files.Cookies work by assigning a number to an old user outside the assignment site.Users should be aware that the company cannot control the use of cookies(or the resulting information) by third parties.If you do not want information to be collected using cookies, your browser allows you to refuse or accept the use of cookies.However, there may be some features of the Service that require the use of cookies to customize the delivery of information to you.`
    ,
    `يجب أن يدرك مستخدمو الموقع والتطبيق أنه قد يتم جمع المعلومات والبيانات غير الشخصية تلقائيًا بموجب التشغيل القياسي لخوادم الكمبيوتر الخاصة بالشركة أو باستخدام "ملفات تعريف الارتباط". ملفات تعريف الارتباط هي ملفات يمكن لموقع الويب استخدامها لتحديد المستخدمين المتكررين، وللسماح للموقع بتتبع سلوك استخدام الويب. تشغل ملفات تعريف الارتباط مساحة صغيرة على جهاز الكمبيوتر الخاص بك ولا يمكنها إتلاف ملفات الكمبيوتر. تعمل ملفات تعريف الارتباط عن طريق تعيين رقم لمستخدم قديم خارج موقع التعيين. يجب أن يدرك المستخدمون أن الشركة لا يمكنها التحكم في استخدام ملفات تعريف الارتباط (أو المعلومات الناتجة) من قبل أطراف ثالثة. إذا كنت لا ترغب في جمع المعلومات باستخدام ملفات تعريف الارتباط، فإن متصفحك يسمح لك برفض أو قبول استخدام ملفات تعريف الارتباط. ومع ذلك، قد تكون هناك بعض ميزات الخدمة التي تتطلب استخدام ملفات تعريف الارتباط لتخصيص تسليم المعلومات لك.`
  ]
  policy10 = [
    'Some of the ads that you may see on the site are selected and delivered by third parties, such as ad networks, advertising agencies, advertisers, and audience segment providers. These third parties may collect information about you and your online activities, either on the site or on other sites through cookies, web beacons and other technologies to understand your interests and deliver advertisements that suit your interests. Please remember that we do not have access to or control over the information these third parties may collect. This Privacy Policy does not cover the information practices of these third parties.'
    ,
    'يتم اختيار بعض الإعلانات التي قد تراها على الموقع وتسليمها بواسطة أطراف ثالثة، مثل شبكات الإعلانات ووكالات الإعلان والمعلنين ومقدمي شرائح الجمهور. قد تقوم هذه الأطراف الثالثة بجمع معلومات عنك وعن أنشطتك عبر الإنترنت، سواء على الموقع أو على مواقع أخرى من خلال ملفات تعريف الارتباط وإشارات الويب والتقنيات الأخرى لفهم اهتماماتك وتقديم الإعلانات التي تناسب اهتماماتك. يرجى تذكر أننا لا نستطيع الوصول إلى المعلومات التي قد تجمعها هذه الأطراف الثالثة أو التحكم فيها. لا تغطي سياسة الخصوصية هذه ممارسات المعلومات الخاصة بهذه الأطراف الثالثة.'
  ]

  howUseInformation = ['How do we use your information?', 'كيف نستعمل معلوماتك؟']

  policy11 = [
    "Our primary goal in collecting information is to provide you with an enhanced experience when using the service. We use this information to closely monitor the service's most used features, to allow you to view your laundry history, store your credit card information with an approved payment partner, view any promotions we may currently run, price trips, and to identify the features we need to focus on, including in addition to usage patterns and geographical locations to determine where we should provide or focus the services, features and / or resources.We use the mobile information collected to be able to serve you."
    ,
    "هدفنا الأساسي في جمع المعلومات هو تزويدك بتجربة محسنة عند استخدام الخدمة. نحن نستخدم هذه المعلومات لمراقبة ميزات الخدمة الأكثر استخدامًا عن كثب، وللسماح لك بعرض سجل الغسيل الخاص بك، وتخزين معلومات بطاقتك الائتمانية مع شريك دفع معتمد، وعرض أي عروض ترويجية قد نقوم بتشغيلها حاليًا، وأسعار الرحلات، وتحديد الميزات التي نوفرها نحتاج إلى التركيز عليها، بما في ذلك بالإضافة إلى أنماط الاستخدام والمواقع الجغرافية لتحديد المكان الذي يجب أن نقدم فيه الخدمات و/أو الميزات و/أو الموارد أو نركز عليها. نحن نستخدم معلومات الهاتف المحمول التي تم جمعها حتى نتمكن من خدمتك."
  ]

  policy12 = [
    "The company uses your Internet Protocol (IP) address to help diagnose problems with our computer's server, and to administer the website.Your IP address is used to help identify you and collect broad demographic data.Your IP address does not contain any personal information about you."
    ,
    "تستخدم الشركة عنوان بروتوكول الإنترنت (IP) الخاص بك للمساعدة في تشخيص المشكلات المتعلقة بخادم جهاز الكمبيوتر الخاص بنا وإدارة موقع الويب. يتم استخدام عنوان IP الخاص بك للمساعدة في التعرف عليك وجمع بيانات ديموغرافية واسعة النطاق. لا يحتوي عنوان IP الخاص بك على أي معلومات شخصية عنك."
  ]

  customerService = ['Customers service', 'خدمة العملاء']

  policy13 = [
    'Based on the personal information you provide us with, we will send you a welcome email to verify your username and password. We will also contact you in response to your inquiries, and to provide the services you request, we will contact you via e-mail, phone or application, according to your wishes.'
    ,
    'بناءً على المعلومات الشخصية التي تقدمها لنا، سنرسل إليك بريدًا إلكترونيًا ترحيبيًا للتحقق من اسم المستخدم وكلمة المرور الخاصة بك. كما سنتواصل معك للرد على استفساراتك، ولتقديم الخدمات التي تطلبها سنتواصل معك عبر البريد الإلكتروني أو الهاتف أو التطبيق حسب رغبتك.'
  ]

  behaviourAds = ['Targeted or behavioral ads', 'الإعلانات المستهدفة أو السلوكية']

  policy14 = [
    "Targeted advertising (also known as behavioral advertising) uses information gathered on an individual's web browsing behavior, such as the pages he visited or the searches he has performed.This information is then used to determine which SHINEFY ad should be shown to a specific individual on websites, for example, if you have demonstrated a travel preference while visiting a SHINEFY site, an advertisement from SHINEFY for travel - related programs may be displayed when visiting a site other than the SHINEFY site.The information collected is linked only to an anonymous cookie ID(alphanumeric number); It does not include any information that can be linked back to a specific person, such as name, address, or credit card number.The information used for targeted ads comes either from the SHINEFY or through third - party website publishers."
    ,
    "تستخدم الإعلانات المستهدفة (المعروفة أيضًا باسم الإعلانات السلوكية) المعلومات التي تم جمعها عن سلوك تصفح الويب للفرد، مثل الصفحات التي زارها أو عمليات البحث التي أجراها. يتم بعد ذلك استخدام هذه المعلومات لتحديد إعلان SHINEFY الذي يجب عرضه لشخص معين على مواقع الويب، على سبيل المثال، إذا أظهرت تفضيل السفر أثناء زيارة موقع SHINEFY، فقد يتم عرض إعلان من SHINEFY للبرامج المتعلقة بالسفر عند الزيارة موقع آخر غير موقع SHINEFY. ترتبط المعلومات التي تم جمعها فقط بمعرف ملف تعريف الارتباط المجهول (رقم أبجدي رقمي)؛ ولا تتضمن أي معلومات يمكن ربطها بشخص معين، مثل الاسم أو العنوان أو رقم بطاقة الائتمان. تأتي المعلومات المستخدمة للإعلانات المستهدفة إما من SHINEFY أو من خلال ناشري مواقع الويب التابعة لجهات خارجية."
  ]

  yourInformation = ['Your information', 'معلوماتك']

  policy15 = [
    'We do not sell, rent, or share your personal information or geolocation information. We will only use this information as described in this Privacy Policy.'
    ,
    'نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية أو معلومات تحديد الموقع الجغرافي. لن نستخدم هذه المعلومات إلا كما هو موضح في سياسة الخصوصية هذه.'
  ]

  policy16 = [
    'The company may share aggregate information that includes unspecified information and log data with third parties for industry analysis, demographic characterization and to provide targeted advertisements about other products and services.'
    ,
    'يجوز للشركة مشاركة المعلومات المجمعة التي تتضمن معلومات غير محددة وبيانات السجل مع أطراف ثالثة لتحليل الصناعة والتوصيف الديموغرافي وتقديم إعلانات مستهدفة حول المنتجات والخدمات الأخرى.'
  ]

  policy17 = [
    'We may employ third parties as companies or individuals to facilitate our service, to provide the service on our behalf, process payment, provide customer support, provide geolocation information to our service providers, to host our employment application form, to perform website-related services (for example, on For example, maintenance services, database management, web analytics and optimizing website features) or to help us analyze how our website and service is used. These third parties have no right to access your personal information except to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. We may also provide personal information to our business partners or other trusted entities for the purpose of providing you with information about goods or services that we think are of interest to you. You can, at any time, opt not to receive such communications by contacting those third parties directly.'
    ,
    'قد نقوم بتوظيف أطراف ثالثة كشركات أو أفراد لتسهيل خدمتنا، ولتقديم الخدمة نيابة عنا، ومعالجة الدفع، وتقديم دعم العملاء، وتوفير معلومات تحديد الموقع الجغرافي لمقدمي الخدمات لدينا، ولاستضافة نموذج طلب التوظيف الخاص بنا، ولأداء الخدمات المتعلقة بالموقع الإلكتروني. (على سبيل المثال، خدمات الصيانة وإدارة قواعد البيانات وتحليلات الويب وتحسين ميزات موقع الويب) أو لمساعدتنا في تحليل كيفية استخدام موقعنا وخدمتنا. لا يحق لهذه الأطراف الثالثة الوصول إلى معلوماتك الشخصية إلا لأداء هذه المهام نيابة عنا، وهي ملزمة بعدم الكشف عنها أو استخدامها لأي غرض آخر. قد نقوم أيضًا بتقديم معلومات شخصية لشركائنا التجاريين أو الكيانات الموثوقة الأخرى بغرض تزويدك بمعلومات حول البضائع أو الخدمات التي نعتقد أنها تهمك. يمكنك، في أي وقت، اختيار عدم تلقي مثل هذه الاتصالات عن طريق الاتصال بهذه الأطراف الثالثة مباشرة.'
  ]

  policy18 = [
    'The company cooperates with government, law enforcement personnel, and private parties to enforce and comply with the law. We will disclose any information about you to the government, law enforcement officials or private parties because, in our absolute discretion, we believe it is necessary or appropriate to respond to legal claims and actions (including but not limited to subpoenas), to protect property and rights of the company or any third party, to protect the safety of the public or anyone, or to prevent or discontinue the activity that we may consider, or pose a risk that we are, an illegal, unethical or legally enforceable activity.'
    ,
    'تتعاون الشركة مع الحكومة وموظفي إنفاذ القانون والجهات الخاصة لإنفاذ القانون والامتثال له. سنقوم بالكشف عن أي معلومات عنك للحكومة أو مسؤولي إنفاذ القانون أو الأطراف الخاصة لأننا، وفقًا لتقديرنا المطلق، نعتقد أنه من الضروري أو المناسب الرد على المطالبات والإجراءات القانونية (بما في ذلك على سبيل المثال لا الحصر مذكرات الاستدعاء)، لحماية الممتلكات. وحقوق الشركة أو أي طرف ثالث، لحماية سلامة الجمهور أو أي شخص، أو لمنع أو إيقاف النشاط الذي قد نعتبره، أو يشكل خطرًا، نشاطًا غير قانوني أو غير أخلاقي أو قابل للتنفيذ قانونًا.'
  ]

  policy19 = [
    'We may use a third-party hosting provider to host our support section on the site. The information collected within this section of the website is subject to our privacy policy. Our third-party service provider does not have access to this information.'
    ,
    'قد نستخدم مزود استضافة تابع لجهة خارجية لاستضافة قسم الدعم الخاص بنا على الموقع. المعلومات التي تم جمعها في هذا القسم من الموقع تخضع لسياسة الخصوصية الخاصة بنا. لا يستطيع مزود خدمة الطرف الثالث لدينا الوصول إلى هذه المعلومات.'
  ]

  security = ['Security', 'حماية']

  policy20 = [
    'The personal and geo-location identification information we collect are securely stored in our database, and we use industry-standard and commercially reasonable security practices such as encryption, firewalls, and SSL (Secure Socket Layers) to protect your information. However, with the effectiveness of encryption technology, no security system is impenetrable. We cannot guarantee the security of our database, and we cannot guarantee that the information you provide will not be intercepted while it is being sent to us over the Internet, and any information you send to the company you do at your own risk. We recommend that you do not disclose your password to anyone.'
    ,
    'يتم تخزين معلومات التعريف الشخصية ومعلومات الموقع الجغرافي التي نجمعها بشكل آمن في قاعدة بياناتنا، ونستخدم ممارسات أمنية متوافقة مع معايير الصناعة ومعقولة تجاريًا مثل التشفير وجدران الحماية وSSL (طبقات المقابس الآمنة) لحماية معلوماتك. ومع ذلك، مع فعالية تقنية التشفير، لا يوجد نظام أمني غير قابل للاختراق. لا يمكننا ضمان أمان قاعدة البيانات الخاصة بنا، ولا يمكننا ضمان عدم اعتراض المعلومات التي تقدمها أثناء إرسالها إلينا عبر الإنترنت، وأي معلومات ترسلها إلى الشركة تقوم بها على مسؤوليتك الخاصة. ننصحك بعدم الكشف عن كلمة المرور الخاصة بك لأي شخص.'
  ]

  inviteFriends = ['Inviting friends', 'دعوة الأصدقاء']

  policy21 = [
    "If you choose to use our referral service to tell a friend about our site, we will ask of you your friend's name and email address.We will automatically send your friend a one - time email inviting him to visit the site.We store this information for the sole purpose of sending this one - time email and tracking the success of our referral program."
    ,
    "إذا اخترت استخدام خدمة الإحالة الخاصة بنا لإخبار صديق عن موقعنا، فسنطلب منك اسم صديقك وعنوان بريده الإلكتروني. سنرسل تلقائيًا إلى صديقك بريدًا إلكترونيًا لمرة واحدة لدعوته لزيارة الموقع. نقوم بتخزين هذه المعلومات لغرض وحيد هو إرسال هذه الرسالة الإلكترونية لمرة واحدة وتتبع نجاح برنامج الإحالة الخاص بنا."
  ]

  policy22 = [
    'Our site contains social media features, such as the Facebook Like button and Widgets, such as the Share this button, or the mini programs running on our site. These features may collect your IP address, the page you visit on our site, and you may set a cookie to enable the feature to function properly. Social media features and widgets are either hosted by a third party or hosted directly on our website. Your interactions with these features are governed by the privacy policy of the company providing them.'
    ,
    'يحتوي موقعنا على ميزات وسائل التواصل الاجتماعي، مثل زر Facebook Like وعناصر واجهة المستخدم، مثل زر Share this، أو البرامج الصغيرة التي تعمل على موقعنا. قد تقوم هذه الميزات بجمع عنوان IP الخاص بك والصفحة التي تزورها على موقعنا، ويمكنك تعيين ملف تعريف ارتباط لتمكين الميزة من العمل بشكل صحيح. تتم استضافة ميزات وعناصر واجهة المستخدم الخاصة بالوسائط الاجتماعية إما بواسطة طرف ثالث أو يتم استضافتها مباشرة على موقعنا الإلكتروني. تخضع تفاعلاتك مع هذه الميزات لسياسة الخصوصية الخاصة بالشركة التي توفرها.'
  ]

  changePrivacyPolicy = ['Changes in Privacy Policy', 'التغييرات في سياسة الخصوصية']

  policy23 = [
    'We may update this privacy statement to reflect changes in our information practices, if we make any material changes. We encourage you to periodically review this page for the latest information on our privacy practices.'
    ,
    'يجوز لنا تحديث بيان الخصوصية هذا ليعكس التغييرات في ممارسات المعلومات لدينا، إذا قمنا بإجراء أي تغييرات جوهرية. نحن نشجعك على مراجعة هذه الصفحة بشكل دوري للحصول على أحدث المعلومات حول ممارسات الخصوصية لدينا.'
  ]

  paymentPrivacy = ['Payment Privacy', 'خصوصية الدفع']

  policy24 = [
    "All credit/debit cards' details and personally identifiable information will NOT be stored, sold, shared, rented, or leased to any third parties."
    ,
    "لن يتم تخزين جميع تفاصيل بطاقات الائتمان/الخصم ومعلومات التعريف الشخصية، أو بيعها، أو مشاركتها، أو تأجيرها، أو تأجيرها لأي طرف ثالث."
  ]

  policy25 = [
    'If you make a payment for our products or services on our website, the details you are asked to submit will be provided directly to our payment provider via a secured connection.'
    ,
    'إذا قمت بالدفع مقابل منتجاتنا أو خدماتنا على موقعنا، فسيتم تقديم التفاصيل التي يُطلب منك إرسالها مباشرة إلى مزود الدفع لدينا عبر اتصال آمن.'
  ]

  policy26 = [
    'Merchant will not pass any debit/credit card details to third parties.'
    ,
    'لن يقوم التاجر بتمرير أي تفاصيل لبطاقة الخصم/الائتمان إلى أطراف ثالثة.'
  ]

  policy27 = [
    'Merchant takes appropriate steps to ensure data privacy and security including through various hardware and software methodologies. However, (COMPANYWEBSITE.COM) cannot guarantee the security of any information that is disclosed online.'
    ,
    'يتخذ التاجر الخطوات المناسبة لضمان خصوصية البيانات وأمانها، بما في ذلك من خلال منهجيات الأجهزة والبرامج المختلفة. ومع ذلك، لا يمكن لـ (COMPANYWEBSITE.COM) ضمان أمان أي معلومات يتم الكشف عنها عبر الإنترنت.'
  ]

  policy28 = [
    'The merchant is not responsible for the privacy policies of websites to which it links. If you provide any information to such third parties different rules regarding the collection and use of your personal information may apply. You should contact these entities directly if you have any questions about their use of the information that they collect.'
    ,
    'التاجر ليس مسؤولاً عن سياسات الخصوصية للمواقع التي يرتبط بها. إذا قمت بتقديم أي معلومات إلى هذه الأطراف الثالثة، فقد يتم تطبيق قواعد مختلفة فيما يتعلق بجمع واستخدام معلوماتك الشخصية. ويجب عليك الاتصال بهذه الكيانات مباشرة إذا كانت لديك أي أسئلة حول استخدامها للمعلومات التي تجمعها.'
  ]

  policy29 = [
    'Some of the advertisements you see on the Site are selected and delivered by third parties, such as ad networks, advertising agencies, advertisers, and audience segment providers. These third parties may collect information about you and your online activities, either on the Site or on other websites, through cookies, web beacons, and other technologies to understand your interests and deliver to your advertisements that are tailored to your interests. Please remember that we do not have access to, or control over, the information these third parties may collect. The information practices of these third parties are not covered by this privacy policy. Kindly remove any other statements that contradicts with the above statements.'
    ,
    'يتم اختيار بعض الإعلانات التي تراها على الموقع وتسليمها بواسطة أطراف ثالثة، مثل شبكات الإعلانات ووكالات الإعلان والمعلنين ومقدمي شرائح الجمهور. قد تقوم هذه الأطراف الثالثة بجمع معلومات عنك وعن أنشطتك عبر الإنترنت، سواء على الموقع أو على مواقع الويب الأخرى، من خلال ملفات تعريف الارتباط وإشارات الويب والتقنيات الأخرى لفهم اهتماماتك وتقديم إعلاناتك المصممة خصيصًا لتناسب اهتماماتك. يرجى تذكر أننا لا نستطيع الوصول إلى المعلومات التي قد تجمعها هذه الأطراف الثالثة أو التحكم فيها. لا تغطي سياسة الخصوصية هذه ممارسات المعلومات الخاصة بهذه الأطراف الثالثة. يرجى حذف أية بيانات أخرى تتعارض مع البيانات المذكورة أعلاه.'
  ]

  contactAbout = ['Contact us about.', 'اتصل بنا بخصوص.']

  policy30 = ['(SHINEFY) P.O. Box () Cairo Postal Code ()', '(شينفي) ص.ب. صندوق () الرمز البريدي للقاهرة ()']

  policy31 = ['Our contact: (info@ SHINEFY.co).', 'جهة الاتصال لدينا: (info@SHINEFY.co).']
}


export const Lang_chg = new Language_provider();
