/**

 * Sample React Native App

 * https://github.com/facebook/react-native

 *

 * @format

 */

import React, { useRef, Component, useState, useEffect } from 'react';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Switch,
  FlatList,
  ScrollView,
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
import PieChart from 'react-native-pie-chart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteEmployee, fetchData, getEmployeeList, getUserInfo } from '../../slice/ApiCalling';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const DelayWorkList = props => {
  console.log(props , "===========>>>>>>>>>> completeee workrrr")
  // const [userData, setUserData] = useState(null)
  const DelayCount = props?.route?.params?.delayCount
  const [employeeList, setEmployeeList] = useState(null)
  const dispatch = useDispatch();
  const userData = useSelector(state => state)
  const userInfo = userData?.user?.user?.user_id

  const isFocused = useIsFocused()
console.log("++++++++++++++"  , userInfo)

  const data = [
    {
      colorvalue : "#AB2B25",
      color: 'Late Mark',
      value: 'PCMC Center',
    },
    {
      colorvalue : "#AB2B25",
      color: 'Late Mark',
      value: 'PCMC building',
    },
    {
      colorvalue : "#AB2B25",
      color: 'Late Mark',
      value: 'Test Location - H office',
    },
    {
      colorvalue : "#AB2B25",
      color: 'Late Mark',
      value: 'Westeria',
    },

  
  ];

  const getUserList = async () => {
    dispatch(getEmployeeList(userInfo)).then(result => {
      console.log("result recieved==== user dar4dkdkdk", result)
      if (result?.payload) {
    
        setEmployeeList(result?.payload)
      }
    });
  }

  useEffect(() => {
    getUserList()
  }, [isFocused])
  const ImageData = (data) => {
    console.log("data recieved here====>>>>>>", data)
    return (
      <TouchableOpacity 
      onPress={()  => {
        props.navigation.navigate("LocationDetail")
      }}
      style={styles.ImageDataStyle}>
        <Text style={{ color: 'black', fontSize: ResponsiveSize(16), fontFamily:"Roboto-Regular" }}>
          {data?.item?.value}
        </Text>
        <Text style={{ color: data?.item?.colorvalue, fontSize: ResponsiveSize(16), fontFamily:"Roboto-Regular" }}>
          {data?.item?.color}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: '#ffffff', height: hp('100%') }}>
      <HeaderComponent  props={props} search logout/>
      <ScrollView>
<View style={{padding:ResponsiveSize(20)}}>
      <View style={{flexDirection:"row"  , justifyContent:"space-between"}}>
        <View>
        <Text
          style={{
            color: '#000000',
            fontFamily:"Roboto-Medium" ,
            fontSize: ResponsiveSize(18),
          }}>
          Today's delay work
        </Text>
        <Text
          style={{
            color: '#2689BD',
            fontFamily: "Roboto-Medium" , 
            fontSize: ResponsiveSize(30),
          }}>
          {DelayCount}
        </Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={ImageData}
        // style={{ paddingHorizontal: 10 }}
      />
      {/* </View> */}
    </View>
    </ScrollView>
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
  container: {
    alignItems: 'center',
    paddingTop: hp('5%'),
  },
  title: {
    fontSize: 30,
    margin: 10,
    color: '#1F51E5',
    position: 'absolute',
    top: 100,
  },

  button: {
    // flexDirection: 'row',
    width: '40%',
    height: ResponsiveSize(50),
    borderRadius: ResponsiveSize(24),
    alignItems: 'center',
    marginTop: ResponsiveSize(50),
    backgroundColor: '#1f51e5',
    justifyContent: 'center',
  },
  ImageDataStyle: {
    backgroundColor: '#f8f8ff',
    height: ResponsiveSize(60),
    padding: 10,
    marginTop: 15,
    borderRadius: ResponsiveSize(2),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    justifyContent: 'space-between',
  },
  starImageStyle: {
    borderRadius: 5,
    marginLeft: 40,
    height: hp('3%'),
    width: wp('5%'),
  },
  shareImageStyle: {
    borderRadius: 5,
    height: hp('3%'),
    marginLeft: 15,
    width: wp('5%'),
  },
  threeDotImageStyle: {
    borderRadius: 5,
    height: hp('3%'),
    marginLeft: 15,
    width: wp('5%'),
  },
  ImageView: {
    width:ResponsiveSize(70),
    height:ResponsiveSize(70)
  },
});

export default DelayWorkList;
