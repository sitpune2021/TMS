/**

 * Sample React Native App

 * https://github.com/facebook/react-native

 *

 * @format

 */

import React, {useRef, Component, useState, useEffect} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../component/HeaderComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ResponsiveSize} from '../../utils/ResponsiveSize';
import InputText from '../../component/InputText';
import {IMAGES} from '../../assets';
import PieChart from 'react-native-pie-chart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteEmployee,
  fetchData,
  getEmployeeList,
  getUserInfo,
} from '../../slice/ApiCalling';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const EmployeeList = props => {
  console.log("props========>> " , props)
  // const EmployeeCount = props?.route?.params?.employeeCount
  const [employeeList, setEmployeeList] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector(state => state);
  const userInfo = userData?.user?.user?.user_id;
  const EmployeeCount = useSelector(state => state?.dashboardCount?.employeeCount)
  console.log(EmployeeCount , "props we are recieving")

  const isFocused = useIsFocused();
  console.log('++++++++++++++', userInfo);

  const data = [
    {
      color: 'red',
      value: 'Ketan Undale',
    },
    {
      color: 'green',
      value: 'Pranali',
    },
    {
      color: 'blue',
      value: 'Santosh Kadam',
    },
    {
      color: 'red',
      value: 'Mayur',
    },
    {
      color: 'green',
      value: 'Santosh Kadam',
    },
    {
      color: 'blue',
      value: 'Pranali',
    },
  ];

  const deleteUser = item => {
    console.log('user iddd recieved', item);

    dispatch(deleteEmployee(item)).then(result => {
      console.log('delete status =======>>>>>', result);
      if (result?.type === 'deleteEmployee/fulfilled') {
        Alert.alert(result?.payload);
        getUserList();
      } else {
        Alert.alert('Unable to delete the User');
      }
      // } else if(result?.payload?.position_status === "employee"){
      //   setLoading(false);
      //   props.navigation.replace("Home");
      // }else{
      //   setLoading(false);
      //   setErrorMessage(result?.payload);
      // }
    });
  };

  const getUserList = async () => {
    dispatch(getEmployeeList(userInfo)).then(result => {
      console.log('result recieved==== user dar4dkdkdk', result);
      if (result?.payload) {
        setEmployeeList(result?.payload);
      }
    });
  };

  useEffect(() => {
    getUserList();
  }, [isFocused]);
  const ImageData = data => {
    console.log('data recieved here====>>>>>>', data);
    return (
      <View 
      // onPress={() => {
      //   props.navigation.navigate("EmployeeLocation"  , data)
      // }}
      style={styles.ImageDataStyle}>
        <Text
          style={{
            color: 'black',
            fontSize: ResponsiveSize(16),
            fontFamily: 'Roboto-Regular',
          }}>
          {data?.item?.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('EditEmployee', data);
            }}>
            <Image
              source={IMAGES.edit_employee}
              style={{
                height: ResponsiveSize(18),
                width: ResponsiveSize(18),
                marginRight: 15,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteUser(data?.item?.user_id);
            }}
            // onPress={deleteUser(data?.item?.user_id)}
          >
            <Image
              source={IMAGES.delete_employee}
              style={{height: ResponsiveSize(18), width: ResponsiveSize(18)}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#ffffff', height: hp('100%')}}>
      <HeaderComponent props={props}   />
      <ScrollView>
      <View style={{padding: ResponsiveSize(20)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Roboto-Medium',
                fontSize: ResponsiveSize(18),
              }}>
              No. of employee's
            </Text>
            <Text
              style={{
                color: '#2689BD',
                fontFamily: 'Roboto-Medium',
                fontSize: ResponsiveSize(30),
              }}>
              {EmployeeCount}
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{alignItems: 'center'}}
            // onPress={() => {
            //   props.navigation.navigate("AddEmployee")
            // }}
          >
            <Image
              style={styles.ImageView}
              source={IMAGES.add_employee}
              resizeMode="contain"></Image>

            <Text
              style={{
                color: '#000000',
                fontFamily: 'Roboto-Regular',
                fontSize: ResponsiveSize(12),
              }}>
              Add Employee
            </Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          data={employeeList}
          renderItem={ImageData}
          style={{paddingHorizontal: 10}}
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
    width: ResponsiveSize(70),
    height: ResponsiveSize(70),
  },
});

export default EmployeeList;
