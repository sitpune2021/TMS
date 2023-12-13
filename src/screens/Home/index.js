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
  ScrollView,
ActivityIndicator,
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
import {addEmployee, getDashboard, getEmployeeTask, getWorkCount} from '../../slice/ApiCalling';
import {useDispatch, useSelector} from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';

const Home = props => {
  const [show, setShow] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [taskData, setTaskData] = useState([]);
  const [employee_id, setEmployee_id] = useState(null);
  const [vendorName, setVendorName] = useState(null);
  const [location, setLocation] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashBoardData] = useState(null);
  const [workCount, setWorkCount] = useState(null);
  const [role, setRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState(null);
  const widthAndHeight = 180;
  const series = [140, 321, 80];
  const sliceColor = ['orange', '#1f51e5', '#ffffff'];
  const dispatch = useDispatch();
  const userData = useSelector(state => state);
  const taskID = userData?.user?.user?.user_id;
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const roleData = [
    {
       id : 1,
      role : "supervisior"
    },
    {
      id : 2 ,
      role : "restroomCleaner"
    },
    {
      id : 3,
     role : "Driver"
   },
   {
     id : 4,
     role : "Safai Karmachari"
   }
  ]

 
  const Upload = () => {
    
    if(
      name !== null &&
      mobileNumber !== null &&
      employee_id !== null &&
      password !== null &&
      value !== null 
    ){
      setLoading(true)
      const date = new Date();
      const EmployeeDetail = JSON.stringify({
              name : name,
              contact_no : mobileNumber,
              email_id :  employee_id,
              password : password,
              registration_data : date,
              position_status : "employee",
              vendor_id : userData?.user?.user?.user_id,
              role : value
      })
      console.log(EmployeeDetail, "valuee of add employee")
  dispatch(addEmployee(EmployeeDetail)).then(result => {
    console.log(result , " result provided ")
      if (result?.payload === "User created successfully!") {
        setLoading(false);
        Alert.alert(result?.payload)
        props.navigation.navigate("EmployeeList")
        setEmployee_id(null)
        setPassword(null)
        setLocation(null)
        setName(null)
        setMobileNumber(null)
        setRole(null)
        setValue(null)
      } else {
        setLoading(false);
        Alert.alert(result?.payload)
        setErrorMessage(result?.payload);
        setEmployee_id(null)
        setPassword(null)
        setLocation(null)
        setName(null)
        setMobileNumber(null)
        setRole(null)
        setValue(null)
      }
    });
    }
    else{
      Alert.alert("Please fill all the fields")
    }

  
  }
  const getWorkData = () => {
    dispatch(getWorkCount(taskID)).then(result => {
      console.log("work=====>> data"  , result)
        if (result?.payload){
           setWorkCount(result?.payload)  
        } 
      });
}

const getDashboardData = () => {
  dispatch(getDashboard(taskID)).then(result => {
    console.log("dashboard data"  , result)
      if (result?.payload){
        setDashBoardData(result?.payload)  
      } 
    });
}


  useEffect(() => {
getDashboardData(),
getWorkData()
  }, [])
  return (
    <View style={{backgroundColor: '#ffffff', height: hp('100%')}}>
      <HeaderComponent props={props} />
      <ScrollView>
        <View style={{padding: ResponsiveSize(20)}}>
          <Text
            style={{
              color: 'black',
              textAlign: 'left',
              marginTop: hp('1.5%'),
              fontSize: ResponsiveSize(18),
              fontFamily: 'Roboto-Medium',
            }}>
            Today's current status
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: ResponsiveSize(10),
              borderRadius: ResponsiveSize(10),
              alignItems: 'center',
            }}>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("EmployeeList" , dashboardData)}
              style={{
                width: ResponsiveSize(161),
                height: ResponsiveSize(76),
                backgroundColor: '#0074B1',
                borderRadius: ResponsiveSize(10),
                padding: ResponsiveSize(5),
              }}>
              <Text
                style={{
                  color: '#fefefe',
                  fontFamily: 'Roboto-Regular',
                  fontSize: ResponsiveSize(14),
                }}>
                No. of employees
              </Text>
              <Text
                style={{
                  color: '#fefefe',
                  fontFamily: 'Roboto-Medium',
                  fontSize: ResponsiveSize(38),
                }}>
                 {dashboardData?.employeeCount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("LocationList" , dashboardData)}
              style={{
                width: ResponsiveSize(161),
                height: ResponsiveSize(76),
                backgroundColor: '#089685',
                borderRadius: ResponsiveSize(10),
                padding: ResponsiveSize(5),
              }}>
              <Text
                style={{
                  color: '#fefefe',
                  fontFamily: 'Roboto-Regular',
                  fontSize: ResponsiveSize(14),
                }}>
                No. of current location
              </Text>
              <Text
                style={{
                  color: '#fefefe',
                  fontFamily: 'Roboto-Medium',
                  fontSize: ResponsiveSize(38),
                }}>
                {dashboardData?.locationCount}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: ResponsiveSize(10),
              alignItems: 'center',
            }}>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("WorkList" , workCount)}
              style={{
                width: ResponsiveSize(161),
                height: ResponsiveSize(76),
                backgroundColor: '#089685',
                borderRadius: ResponsiveSize(10),
                padding: ResponsiveSize(5),
              }}>
              <Text
                style={{
                  color: '#fefefe',
                  fontFamily: 'Roboto-Regular',
                  fontSize: ResponsiveSize(14),
                }}>
                Today's delay work
              </Text>
              <Text
                style={{
                  color: '#fefefe',
                  fontFamily: 'Roboto-Medium',
                  fontSize: ResponsiveSize(38),
                }}>
                {workCount?.completeCount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()  => props.navigation.navigate("DelayWorkList"  , workCount)}
              style={{
                width: ResponsiveSize(161),
                height: ResponsiveSize(76),
                backgroundColor: '#AB2B25',
                borderRadius: ResponsiveSize(10),
                padding: ResponsiveSize(5),
              }}>
              <Text
                style={{
                  color: '#fefefe',
                  fontFamily: 'Roboto-Regular',
                  fontSize: ResponsiveSize(14),
                }}>
                Today's delay work
              </Text>
              <Text
                style={{
                  color: '#fefefe',
                  fontFamily: 'Roboto-Medium',
                  fontSize: ResponsiveSize(38),
                }}>
                {workCount?.delayCount}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: 'black',
              textAlign: 'left',
              marginTop: hp('4%'),
              fontSize: ResponsiveSize(18),
              fontFamily: 'Roboto-Medium',
            }}>
            Add new Employee
          </Text>
          <View style={{marginTop: ResponsiveSize(10)}}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Roboto-Regular',
                fontSize: ResponsiveSize(15),
              }}>
              Employee ID
            </Text>
            <TextInput
              placeholder="Enter employee ID"
              placeholderTextColor={'grey'}
              value={employee_id}
              onChangeText={setEmployee_id}
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
              Employee Name
            </Text>
            <TextInput
              placeholder="Enter employee name"
              placeholderTextColor={'grey'}
              value={name}
              onChangeText={setName}
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
              Employee Password
            </Text>
            <TextInput
              placeholder="Enter employee password"
              placeholderTextColor={'grey'}
              value={password}
              onChangeText={setPassword}
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
              Employee Contact Number
            </Text>
            <TextInput
              placeholder="Enter employee contact number"
              placeholderTextColor={'grey'}
              value={mobileNumber}
              onChangeText={setMobileNumber}
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
              Employee Role
            </Text>
            {/* <TextInput
              placeholder="Select Role"
              placeholderTextColor={'grey'}
              value={employee_id}
              onChangeText={setEmployee_id}
              style={{
                borderWidth: 0.5,
                color: '#000000',
                borderColor: '#C4C4C4',
                marginTop: ResponsiveSize(5),
                borderRadius: ResponsiveSize(2),
              }}
            /> */}

                <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={{color:"black"}}
        iconStyle={styles.iconStyle}
        data={roleData}
        maxHeight={300}
        labelField="role"
        valueField="role"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item?.role);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        // )}
      />
          
            <TouchableOpacity
              onPress={Upload}
              style={styles.button}>
              <Text
                style={{
                  fontSize: ResponsiveSize(16),
                  color: '#FEFEFE',
                  // fontWeight: 'bold',
                }}>
                {loading ? <ActivityIndicator/> : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
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
  button: {
    height: ResponsiveSize(45),
    borderRadius: ResponsiveSize(5),
    alignItems: 'center',
    marginTop: ResponsiveSize(30),
    backgroundColor: '#397421',
    justifyContent: 'center',
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
  dropdown: {
    // height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop:10,
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

export default Home;
