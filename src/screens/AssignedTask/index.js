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
  getAllEmployeeLocationInVendor,
  getEmployeeList,
  getUserInfo,
  workAssign,
} from '../../slice/ApiCalling';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';


const AssignedTask = props => {
  console.log("props recieved here" , props)
  const employeeData = props?.route?.params
  // const [userData, setUserData] = useState(null)
  const [employeeList, setEmployeeList] = useState([]);
  const [checked, setChecked] = React.useState('first');
  const [assignedwork, setAssignedWork] = useState(true);
  const [assignwork, setAssignWork] = useState(false);
  const [latitude , setLatitude]  = useState([]);
  const [longitude , setLongitude]  = useState([]);
  const [value , setValue]  = useState(null);
  const [locationData , setLocationData]  = useState([]);
  const [employeeID , setEmployeeID]  = useState(null)
  const [restroom , setRestroom]  = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [remark, setRemark] = useState(null);
  const [assingedTask, setAssingedTask] = useState([]);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const userData = useSelector(state => state);
  const userInfo = userData?.user?.user?.user_id;
  console.log("userindor we need " , userInfo)

  const isFocused = useIsFocused();

  
  const getUserLocation = () => {
    dispatch(getAllEmployeeLocationInVendor(userInfo)).then(result => {
      console.log("location recieved" , result)
        if (result?.payload){
            let data = result?.payload?.map((item , index) => item)
            setLocationData(data)
            
        }
         
        
      });
}

const getUserList = async () => {
  dispatch(getEmployeeList(userInfo)).then(result => {
    console.log('result recieved==== user dar4dkdkdk', result);
    if (result?.payload) {
      setEmployeeList(result?.payload);
    }
  });
};

const getAssignedTask = async () => {
  dispatch(getAllAssignedTask(userInfo)).then(result => {
    console.log('result recieved==== user dar4dkdkdk', result);
    if (result?.payload) {
      setAssingedTask(result?.payload);
    }
  });
};
const showDateTimePicker = () => {
  setShowPicker(true);
};
const onChange = (event, selectedDate) => {
  console.log("dateeeeeeeee" , date)
const currentDate = selectedDate || date;
setDate(currentDate);
setShowPicker(false)
};

const assignWork = ()  => {
  if(remark !== null){
    let currentDate = moment(date).format('HH:MM:SS')
    console.log(currentDate , "date format")
      
    const EmployeeDetail = {
        date: moment(new Date()).format('YYYY-MM-DD'),
        employee_name : value,
        restroom_id: restroom,
        emp_task_id: employeeID,
        position_status: "employee",
        remark: remark,
        due_time: currentDate,
        lat_details: latitude,
        long_details: longitude
  }
  console.log("emplollll=========================="  , EmployeeDetail)
  dispatch(workAssign(EmployeeDetail)).then(result => {
    console.log("result we are recieving " , result)
    if (result?.payload === "Employee Task Assign successfully!") {
      Alert.alert(result?.payload)
      getUserList()
      setAssignWork(false),
      setAssignedWork(true),
      setChecked("first")
      setRestroom(null)
      setValue(null)
      setRemark(null)
    } else {
     Alert.alert("Try Again After some time")
     setAssignWork(false),
     setAssignedWork(true),
     setChecked("first")
     setRestroom(null)
     setValue(null)
     setRemark(null)
    }
  });
  }
     else{
      Alert.alert("Please Enter the Remark")
     }
      }
  useEffect(() => {
    getUserList();
    getUserLocation();
    getAssignedTask();
  }, []);
  const ImageData = data => {
    console.log(data , " consoleee we are getttingggggg")
    return (
      <View style={styles.ImageDataStyle}>
        <View>
        <Text style={{color: 'black', fontSize: 15, fontFamily:"Roboto-Medium"}}>
          Employee Name : 
        </Text>
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
         {data?.item?.name}
        </Text>
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
              props.navigation.navigate('EditAssignWork', data?.item );
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


  console.log("employee list we are recieving " , employeeList)
  return (
    <View style={{backgroundColor: '#ffffff', height: hp('100%')}}>
      <HeaderComponent props={props}  logout/>
      <ScrollView>
      <View style={{padding: ResponsiveSize(20)}}>
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
          data={assingedTask}
          renderItem={ImageData}
          style={{paddingHorizontal: 10 , marginBottom:100}}
        />
      )}

 {assignwork && (
        <View style={{marginTop: ResponsiveSize(20)}}>
        <Text
          style={{
            color: '#9D0700',
            fontFamily: 'Roboto-Regular',
            fontSize: ResponsiveSize(18),
            textAlign:"center"
          }}>
          Date  :  {moment(new Date()).format('DD MMM YYYY')}
        </Text>
        <Text
          style={{
            color: '#000',
            fontFamily: 'Roboto-Regular',
            fontSize: ResponsiveSize(15),
            marginTop:ResponsiveSize(20)
          }}>
          Employee Name
        </Text>
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={{color:"black"}}
        iconStyle={styles.iconStyle}
        data={employeeList}
        search
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder="Select employee"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item?.name);
          setEmployeeID(item?.user_id)
        }}/>
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
          onPress={() => {
          assignWork()
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
      )}
      {/* </View> */}
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

export default AssignedTask;
