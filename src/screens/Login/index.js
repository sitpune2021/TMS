/**

 * Sample React Native App

 * https://github.com/facebook/react-native

 *

 * @format

 */

import React, {useRef, useState, useEffect} from 'react';
import {
  validateNumber,
  isObjectEmpty,
  Error,
  validateEmail,
} from '../../utils/validation';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../component/HeaderComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ResponsiveSize} from '../../utils/ResponsiveSize';
import InputText from '../../component/InputText';
import {IMAGES} from '../../assets';
import LoginHeaderComponent from '../../component/LoginHeaderComponent';
import {fetchData} from '../../slice/ApiCalling';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {ErrorBox} from '../../component/ErrorBox/errorBox';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = props => {
  const [show, setShow] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('8329236958');
  const [password, setPassword] = useState('s@123');
  const [isEnabled, setIsEnabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [temp, setTemp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const dispatch = useDispatch();
  const onLogin = async () => {
    setLoading(true);
    const userCredentials = JSON.stringify({
      contact_no: mobileNumber,
      password: password,
    });
    console.log('userddddddd', userCredentials);
    const isValid = validate();
    // if (isValid) {
    // if textinput field matched with regex and condition
    dispatch(fetchData(userCredentials)).then(result => {
      console.log('result recieved logoin======', result);
      if (result?.payload?.user?.position_status === 'vendor') {
        setLoading(false);
        Alert.alert('Logged in Successfully');
        props.navigation.navigate('Home');
      } else if (result?.payload?.user?.position_status === 'employee') {
        setLoading(false);
        props.navigation.replace('EmployeeLoginScreen');
      } else {
        setLoading(false);
        setErrorMessage(result?.payload);
      }
    });
    // }
    // props.navigation.navigate("AssignWork")
  };

  const validate = () => {
    setTemp(!temp);

    if (!mobileNumber?.length) {
      errors['mobileNumber'] = Error.mobileEmpty;
      setErrors(errors);
      // validate mobileNumber <=0  and cannot be empty
    } else if (!validateNumber(mobileNumber)) {
      errors['mobileNumber'] = Error.mobileValidate;
      setErrors(errors);
      // validate if mobileNumber not matching with regex
    } else {
      delete errors?.mobileNumber;
      setErrors(errors);
      // remove error if mobileNumber field is >0 and match with regex
    }
    if (password?.length <= 0) {
      errors['password'] = Error.passwordEmpty;
      setErrors(errors);
      // validate password <=0  and cannot be empty
    } else {
      delete errors?.password;
      setErrors(errors);
    }
    // remove error if password field is >0 and match with regex
    return isObjectEmpty(errors);
  };
  const usePreviousMobile = value => {
    //callback with usestate if field is taking automatically space
    const ref = useRef();
    // useRef is used for reference
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevMobile = usePreviousMobile(mobileNumber);

  const usePreviousPassword = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevPassword = usePreviousPassword(password);

  useEffect(() => {
    if (prevMobile <= mobileNumber) {
      validate(mobileNumber);
    }
    if (prevPassword <= password) {
      validate(password);
    }
  }, [mobileNumber, password]);

  return (
    <ScrollView>
    <View
      style={{
        flex: 1,
        padding: ResponsiveSize(20),
      }}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp('6%'),
          }}>
          <Image
            style={{height: ResponsiveSize(210), width: ResponsiveSize(204)}}
            source={IMAGES.login_logo}
            resizeMode="contain"></Image>
         
        </View>

        <View style={{flexDirection:"row" , justifyContent:"space-between" , marginTop:ResponsiveSize(16) , alignItems:"center"}}>
          <Image
            style={{height: ResponsiveSize(49), width: ResponsiveSize(62)}}
            source={IMAGES.login_imgone}
            resizeMode="contain"></Image>
          <Image
            style={{height: ResponsiveSize(26), width: ResponsiveSize(81)}}
            source={IMAGES.login_imgtwo}
            resizeMode="contain"></Image>
          <Image
            style={{height: ResponsiveSize(43), width: ResponsiveSize(99)}}
            source={IMAGES.login_imgthree}
            resizeMode="contain"></Image>
          <Image
            style={{height: ResponsiveSize(47), width: ResponsiveSize(61)}}
            source={IMAGES.login_imgfour}
            resizeMode="contain"></Image>
        </View>
        <Text style={{color: '#000', fontSize: ResponsiveSize(22), marginTop: hp('4%') , textAlign:"center" , fontFamily:"Roboto-Medium"}}>
            Login
          </Text>
        {errorMessage !== null && errorMessage !== undefined && (
          <ErrorBox errMsg={errorMessage} />
        )}
        <View>
        <Text style={{color: '#000', fontSize: ResponsiveSize(18), marginTop: ResponsiveSize(15) , fontFamily:"Roboto-Regular"}}>
            Enter your mobile number
          </Text>
          <InputText
            placeholder="Mobile number"
            value={mobileNumber}
            onChangeText={value => {
              setMobileNumber(value);
              // validate();
            }}
            rightImage
          />
          {errors?.mobileNumber?.length > 0 && (
            <Text style={{color: '#A6192E', padding: 3}}>
              {errors?.mobileNumber}
            </Text>
          )}

          <View>
          <Text style={{color: '#000', fontSize: ResponsiveSize(18), marginTop: ResponsiveSize(15) , fontFamily:"Roboto-Regular"}}>
            Enter your password
          </Text>
            <InputText
              placeholder="Password"
              value={password}
              onChangeText={value => {
                setPassword(value);
                // validate();
              }}
              rightIcon={true}
              onRightIconPressed={() => {
                setShow(!show);
              }}
              secureTextEntry={show}></InputText>
            {errors?.password?.length > 0 && (
              <Text style={{color: '#A6192E', padding: 3}}>
                {errors?.password}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp('2%'),
            alignItems:"center",
            paddingHorizontal: wp('4.5%'),
          }}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
       
      
              <Text
                style={{
                  fontSize: ResponsiveSize(16),
                  color: '#22215B',
                  fontFamily:"Roboto-Regular"
                }}>
                Remember Me
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ForgotPassword');
            }}>
            <Text
              style={{
                fontSize: ResponsiveSize(16),
                color: '#397421',
                fontFamily:"Roboto-Regular"
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={onLogin} style={styles.button}>
            <Text
              style={{
                fontSize: ResponsiveSize(16),
                color: '#FEFEFE',
                // fontWeight: 'bold',
              }}>
              {loading ? <ActivityIndicator /> : 'Login'}
            </Text>
          </TouchableOpacity>
        
      </View>
      <View>
        {/* <BottomScreen /> */}
      </View>
    </View>
    </ScrollView>
  );
};

export const BottomScreen = () => {
  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('7%'),
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#1f51e5',
      }}>
     <Image
            style={{height: ResponsiveSize(59)}}
            source={IMAGES.footerImage}
            resizeMode="contain"></Image>
    </View>
  );
};
const styles = StyleSheet.create({
  welcomeBack: {
    color: '#848484',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Raleway',
    marginTop: 24,
    fontSize: 16,
  },

  loginAcc: {
    color: '#333333',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    fontSize: 24,
    marginTop: 7,
  },

  button: {
    height: ResponsiveSize(45),
    borderRadius: ResponsiveSize(5),
    alignItems: 'center',
    marginTop: ResponsiveSize(30),
    backgroundColor: '#397421',
    justifyContent: 'center',
  },
  Vendorbutton: {
    // flexDirection: 'row',
    width: '40%',
    height: ResponsiveSize(45),
    borderRadius: ResponsiveSize(20),
    alignItems: 'center',
    backgroundColor: '#1f51e5',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default Login;
