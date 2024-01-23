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
  TextInput,
  ScrollView
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
  getAllAssignedTask,
  getEmployeeList,
  getUserInfo,
} from '../../slice/ApiCalling';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';


const LocatinDetail = props => {
  // const [userData, setUserData] = useState(null)
  const [employeeList, setEmployeeList] = useState(null);
  const [checked, setChecked] = React.useState('first');
  const [assignedwork, setAssignedWork] = useState(true);
  const [assignwork, setAssignWork] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector(state => state);
  const userInfo = userData?.user?.user?.user_id;

  const isFocused = useIsFocused();

  const data = [
    {
      color: 'red',
      value: '#f00',
    },
    {
      color: 'green',
      value: '#0f0',
    },
    {
      color: 'blue',
      value: '#00f',
    },
    {
      color: 'red',
      value: '#f00',
    },
    {
      color: 'green',
      value: '#0f0',
    },
    {
      color: 'blue',
      value: '#00f',
    },
    {
      color: 'red',
      value: '#f00',
    },
    {
      color: 'green',
      value: '#0f0',
    },
    {
      color: 'blue',
      value: '#00f',
    },
  ];
  const getUserList = async () => {
    dispatch(getAllAssignedTask(userInfo)).then(result => {
      if (result?.payload) {
        setEmployeeList(result?.payload);
      }
    });
  };

  useEffect(() => {
    getUserList();
  }, [isFocused]);
  const ImageData = data => {
    console.log('data recieved , ============>>>', data);
    return (
      <View style={styles.ImageDataStyle}>
        <View>
        <Text style={{color: 'black', fontSize: 15, fontFamily:"Roboto-Medium"}}>
          Location : 
        </Text>
        <Text style={{color: 'black', fontSize: 15, fontFamily:"Roboto-Medium"}}>
          Due time : 
        </Text>
        <Text style={{color: 'black', fontSize: 15, fontFamily:"Roboto-Medium"}}>
          Remark : 
        </Text>
        </View>
        <View>
        <Text style={{color: 'black', fontSize: 15, fontFamily:"Roboto-Regular"}}>
         {data?.item?.restroom_id}
        </Text>
        <Text style={{color: 'black', fontSize: 15,fontFamily:"Roboto-Regular"}}>
          {data?.item?.due_time}
        </Text>
        <Text style={{color: 'black', fontSize: 15, fontFamily:"Roboto-Regular"}}>
         {data?.item?.remark}
        </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('EditAssignWork', data?.item);
            }}>
            <Image
              source={IMAGES.edit_employee}
              style={{
                height: ResponsiveSize(20),
                width: ResponsiveSize(20),
               
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#ffffff', height: hp('100%')}}>
      <HeaderComponent props={props} search logout />

      <View style={{padding: ResponsiveSize(20)}}>
        <Text
          style={{
            color: '#000',
            textAlign: 'left',
            fontFamily: 'Roboto-Medium',
            fontSize: ResponsiveSize(18),
          }}>
          Employee Name : {userData?.user?.user?.name}
        </Text>
     
      <View style={{flexDirection:'row' , justifyContent:"space-between" , alignItems:"center" , marginTop:ResponsiveSize(10)}}>
      <View style={{ flexDirection: 'row', alignItems: 'center'  }}>
        <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => {{setChecked('first') , setAssignedWork(true) , setAssignWork(false)}}}
        />
        <Text style={{color:'#000000', fontFamily:'Roboto-Regular' , fontSize:ResponsiveSize(18)}}>Assigned Work</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => {setChecked('second') , setAssignWork(true) , setAssignedWork(false)} }
        />
        <Text style={{color:'#000000', fontFamily:'Roboto-Regular' , fontSize:ResponsiveSize(18)}}>Assign Work</Text>
      </View>
    </View>
      {assignedwork && (
        <FlatList
          data={employeeList}
          renderItem={ImageData}
          style={{paddingHorizontal: 10}}
        />
      )}

 {assignwork && (
  <ScrollView>

        <View style={{marginTop: ResponsiveSize(20)}}>
        <Text
          style={{
            color: '#9D0700',
            fontFamily: 'Roboto-Regular',
            fontSize: ResponsiveSize(18),
            textAlign:"center"
          }}>
          Date  :  11 Nov 2023
        </Text>
        <Text
          style={{
            color: '#000',
            fontFamily: 'Roboto-Regular',
            fontSize: ResponsiveSize(15),
            marginTop:ResponsiveSize(20)
          }}>
          Restroom ID
        </Text>
        <TextInput
          placeholder="Select ID"
          placeholderTextColor={'grey'}
          // value={employee_id}
          // onChangeText={setEmployee_id}
          style={{
            borderWidth: 0.5,
            color: '#000000',
            borderColor: '#C4C4C4',
            marginTop: ResponsiveSize(5),
            borderRadius: ResponsiveSize(2),
          }}
        />
        <Text
          style={{
            color: '#000',
            fontFamily: 'Roboto-Regular',
            marginTop: ResponsiveSize(10),
            fontSize: ResponsiveSize(15),
          }}>
          Due Time
        </Text>
        <TextInput
          placeholder="Due time"
          placeholderTextColor={'grey'}
          // value={number}
          // onChangeText={setNumber}
          style={{
            borderWidth: 0.5,
            color: '#000000',
            borderColor: '#C4C4C4',
            marginTop: ResponsiveSize(5),
            borderRadius: ResponsiveSize(2),
          }}
        />
        <Text
          style={{
            color: '#000',
            fontFamily: 'Roboto-Regular',
            marginTop: ResponsiveSize(10),
            fontSize: ResponsiveSize(15),
          }}>
          Remark
        </Text>
        <TextInput
          placeholder="Remark"
          placeholderTextColor={'grey'}
          // value={employee_id}
          // onChangeText={setEmployee_id}
          style={{
            borderWidth: 0.5,
            color: '#000000',
            borderColor: '#C4C4C4',
            marginTop: ResponsiveSize(5),
            borderRadius: ResponsiveSize(2),
          }}
        />
          <TouchableOpacity  
          onPress={() => {
            setAssignWork(false),
            setAssignedWork(true),
            setChecked("first")
          }}
          style={styles.button}>
        <Text
          style={{
            fontSize: ResponsiveSize(16),
            color: '#FEFEFE',
            // fontWeight: 'bold',
          }}>
         Submit
        </Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
      )}
      {/* </View> */}
    </View>
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
    height: ResponsiveSize(45),
    borderRadius: ResponsiveSize(5),
    alignItems: 'center',
    marginTop: ResponsiveSize(80),
    backgroundColor: '#397421',
    justifyContent: 'center',
  },
  ImageDataStyle: {
    backgroundColor: '#f8f8ff',
    padding: ResponsiveSize(15),
    marginTop: 15,
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
    borderRadius: hp('1%'),
    height: hp('5%'),
    width: wp('10%'),
    marginLeft: wp('15%'),
  },
});

export default LocatinDetail;
