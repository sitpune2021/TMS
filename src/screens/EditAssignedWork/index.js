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
  TextInput,
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
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllEmployeeLocationInVendor,
  getEmployeeList,
  getLocation,
  getUserInfo,
  updateAssignedWork,
  workAssign,
} from '../../slice/ApiCalling';
import {useIsFocused} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const EditAssignWork = props => {
  const employeeData = props?.route?.params
  console.log(employeeData , "props data we are gettinggggggg")
  const [employee, setEmployee] = useState(null);
  const [restroom_id, setRestroom_id] = useState(null);
  const [due_time, setDue_time] = useState(props?.route?.params?.due_time);
  const [isEnabled, setIsEnabled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [value, setValue] = useState(null);
  const [remark, setRemark] = useState(null);
  const [employeeID, setEmployeeID] = useState(null);
  const [restroom, setRestroom] = useState(props?.route?.params?.restroom_id);
  const dispatch = useDispatch();
  const assignID = props?.route?.params?.assign_id;
  const widthAndHeight = 180;
  const series = [140, 321, 80];
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const sliceColor = ['orange', '#1f51e5', '#ffffff'];
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const userNewData = useSelector(state => state);
  const userName = userNewData?.user?.user?.name;
  const newuserdata = useSelector(state => state);
  const userInfo = newuserdata?.user?.user?.user_id;
  const isFocused = useIsFocused();

  const employee_ID = useSelector(state => state);

  const userId = employee_ID?.user?.user?.user_id;
  const getUserDetail = async () => {
    let value = await AsyncStorage.getItem('userDetail');
    let data = JSON.parse(value);
    setUserData(data);
  };

  const getUserLocation = () => {
    dispatch(getAllEmployeeLocationInVendor(userInfo)).then(result => {
      console.log("location recieved" , result)
        if (result?.payload){
            let data = result?.payload?.map((item , index) => item)
            setLocationData(data)
            
        }
         
        
      });
}

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowPicker(false);
    setDue_time(moment(currentDate).format('HH:mm:ss'));
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const getUserList = async () => {
    console.log('console 1');
    dispatch(getEmployeeList(userId)).then(result => {
      console.log('result recieved==== user dar4dkdkdk', result);
      if (result?.payload) {
        setEmployeeList(result?.payload);
      }
    });
  };

  useEffect(() => {
    getUserList();
    getUserLocation();
  }, [isFocused]);

  useEffect(() => {
    getUserDetail();
  }, []);
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
  ];
  const presentDate = moment(new Date()).format('l');
  console.log('present date is ', presentDate);

  const assignWork = () => {
    let currentDate = new Date();
    const EmployeeDetail = JSON.stringify({
      date: moment(new Date()).format('YYYY-MM-DD'),
        employee_name : employeeData?.name,
        restroom_id: restroom,
        emp_task_id: employeeData?.user_id,
        position_status: "employee",
        remark: remark,
        due_time: due_time,
        lat_details: latitude,
        long_details: longitude
    });
    console.log('new data kfkdfjkdjf', EmployeeDetail, assignID);
    dispatch(updateAssignedWork({EmployeeDetail, assignID})).then(result => {
      console.log('result recieved=== for employee task assign===', result);
      if (result?.type === 'updateAssignedWork/fulfilled') {
        //   setLoading(false);
        Alert.alert(result?.payload);
        props.navigation.navigate('AssignedTask');
      } else {
        //   setLoading(false);
        Alert.alert(result?.payload);
      }
    });
  };
  const ImageData = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Restroom');
        }}
        style={styles.ImageDataStyle}>
        <View>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Shivagi Nagar
          </Text>
          <Text style={{color: 'black', fontSize: 13}}>5N1799</Text>
        </View>

        <View>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Due Time
          </Text>
          <Text style={{color: 'black', fontSize: 13}}>10:30 am</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{backgroundColor: '#ffffff', height: hp('100%')}}>
      <HeaderComponent props={props}  />
      <View style={{padding:ResponsiveSize(20)}}>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontSize: ResponsiveSize(18),
          fontFamily: 'Roboto-Medium',
        }}>
        Edit assign work
      </Text>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          marginTop: ResponsiveSize(5),
          fontSize: ResponsiveSize(18),
          fontFamily: 'Roboto-Medium',
        }}>
        Employee Name : {employeeData?.name}
      </Text>
      <ScrollView>
        <View style={{marginTop: ResponsiveSize(20)}}>
          <Text
            style={{
              color: '#9D0700',
              fontFamily: 'Roboto-Regular',
              fontSize: ResponsiveSize(18),
              textAlign: 'center',
            }}>
            Date : {moment(new Date()).format('DD MMM YYYY')}
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
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={{color:"black"}}
        iconStyle={styles.iconStyle}
        data={locationData}
        search
        maxHeight={300}
        labelField="location"
        valueField="location"
        placeholder="Select restroom"
        searchPlaceholder="Search..."
        value={restroom}
        onChange={item => {
          setRestroom(item?.location);
          setLatitude(item?.lat_detalis);
          setLongitude(item?.long_detalis)
        }}
        // renderLeftIcon={() => (
        //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        // )}
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
        <TouchableOpacity
        onPress={showDateTimePicker}style={{ height:ResponsiveSize(50) , padding:ResponsiveSize(10), borderRadius:ResponsiveSize(10),borderWidth: 0.5,color:"black" , justifyContent:"center" , borderColor: "grey",paddingVertical:-20, marginTop:20 }}>
<Text style={{color:"black" , fontSize:ResponsiveSize(18)}}>{moment(date).format("h:mm:ss A")}</Text>
                </TouchableOpacity>
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
          value={remark}
          onChangeText={setRemark}
          style={{
            borderWidth: 0.5,
            color: '#000000',
            borderColor: '#C4C4C4',
            marginTop: ResponsiveSize(5),
            borderRadius: ResponsiveSize(2),
          }}
        />
          <TouchableOpacity
            onPress={assignWork}
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
      </View>
      {showPicker && (
            <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time" // You can also use "date" or "time" to show only date or time picker.
          is24Hour={true} // Set this to false for a 12-hour format
          display="default" // You can use "default", "spinner", "calendar", "clock" on Android
          onChange={onChange}
        />
            )}
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
  dropdowncontainer: {
    alignItems: 'center',
    marginTop: 10,
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
    height: hp('12%'),
    padding: 15,
    marginTop: 10,
    borderRadius: hp('4%'),
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
    backgroundColor: 'black',
    borderRadius: hp('1%'),
    height: hp('6%'),
    width: wp('13%'),
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop:10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color:"#000"
  },
  placeholderStyle: {
    fontSize: 16,
    color:"black"
  },
  selectedTextStyle: {
    fontSize: 16,
    color:"black"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:"black"
  },
});

export default EditAssignWork;
