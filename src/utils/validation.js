export const validateNumber = number => {
    const re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    // console.log(re.test(number));
    return re.test(number);
  };
  
  export const validatePassword = password => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    // const re = /^[6789]\d{9}$/;
    // console.log(re.test(password));
    return re.test(password);
  };
  
  export const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:!\s@\"]+(\.[^<>()[\]\\.,;:!\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //NOSONAR
    return re.test(String(email).toLowerCase());
  };
  export const isObjectEmpty = objectName => {
    for (let prop in objectName) {
      if (objectName.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  };

  export const Error = {
    passwordEmpty: 'Please enter your password',
    passwordValidate: 'Please enter your  valid password',
    mobileEmpty: 'Please enter your employee ID',
    mobileValidate: 'Please enter your mobile number',
    otpEmpty: 'Please enter OTP',
    otpValidate: 'Invalid Otp Provide!',
    confPassword: 'Confirm password and New Password must be same',
    passcodeEmpty: 'Please enter Passcode',
    passcodeValidate: 'Invalid Passcode Provide!',
    emailEmpty: 'Please enter your Email ID',
    emailValidate: 'Please enter valid email id',
    userEmpty: 'Please enter your user name',
  };