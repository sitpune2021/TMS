/**

 * Sample React Native App

 * https://github.com/facebook/react-native

 *

 * @format

 */

import React, { useRef, useState, useEffect } from 'react';
import { validateNumber  , isObjectEmpty , Error} from '../../utils/validation';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Alert,
    Switch
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../component/HeaderComponent';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ResponsiveSize } from '../../utils/ResponsiveSize';
import InputText from '../../component/InputText';
import { IMAGES } from '../../assets';
import LoginHeaderComponent from '../../component/LoginHeaderComponent';

const ConfirmPassword = props => {
    const [show, setShow] = useState(true);
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [errors, setErrors] = useState({});
    const [temp, setTemp] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const onLogin = () => {
   
          // if textinput field matched with regex and condition
          props.navigation.navigate('OtpVerification');
        
      };

      

    const validate = () => {
        setTemp(!temp);
    
        if (mobileNumber?.length <= 0) {
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
        <View
            style={{ backgroundColor: "#fff" ,flex:1 , justifyContent:"space-between" }}>
              <View>
            <LoginHeaderComponent />
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: hp("6%") }}>
                <Image
                    style={{ height: hp("16%"), width: wp("52%") }}
                    source={IMAGES.header_logo}
                    resizeMode="contain"></Image>
<Text style={{color:"#000", fontSize:24 , marginTop:hp("4%")}}>Enter Your New Password</Text>
            </View>
            <View style={{ paddingHorizontal: 20 , marginTop:20 }}>
            <InputText
                        LeftImage={IMAGES.password_lock}
                        placeholder="Enter New Password"
                        value={password}
                        onChangeText={value => {
                            setPassword(value);
                            validate();
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
                <View style={{ paddingHorizontal: 20 , marginTop:20 }}>
            <InputText
                        LeftImage={IMAGES.password_lock}
                        placeholder="Re-enter New Password"
                        value={password}
                        onChangeText={value => {
                            setPassword(value);
                            validate();
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
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                    // onPress={onLogin} 
                    style={styles.button}>
                    <Text
                        style={{
                            fontSize: ResponsiveSize(16),
                            color: 'white',
                            // fontWeight: 'bold',
                        }}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
            <View>
<BottomScreen/>
</View>
        </View>
    );
};

export const BottomScreen = () => {
return(
<View style={{width:wp("100%") , height:hp("7%") , justifyContent:"center", borderTopLeftRadius:15 , borderTopRightRadius:15,position:"absolute" , bottom:0 , backgroundColor: '#1f51e5'}}>
<Text style={{textAlign:"center" , color:"#fff"}}>Powered by Nyati Technologies Pvt. Ltd.</Text>
</View>
)
}
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
        // flexDirection: 'row',
        width: '40%',
        height: ResponsiveSize(45),
        borderRadius: ResponsiveSize(20),
        alignItems: 'center',
        marginTop: ResponsiveSize(50),
        backgroundColor: '#1f51e5',
        justifyContent: 'center',
    },
});

export default ConfirmPassword;
