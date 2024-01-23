/**

 * Sample React Native App

 * https://github.com/facebook/react-native

 *

 * @format

 */

import React, { useState, useEffect } from 'react';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../component/HeaderComponent';
import { Dropdown } from 'react-native-element-dropdown';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ResponsiveSize } from '../../utils/ResponsiveSize';
import InputText from '../../component/InputText';
import { IMAGES } from '../../assets';
import PieChart from 'react-native-pie-chart'
import EmployeeList from '../EmployeeList';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, editEmployee, fetchData, getLocation } from '../../slice/ApiCalling';
import { ErrorBox } from '../../component/ErrorBox/errorBox';
import DropdownComponent from '../../component/DropdownComponent';

const EditEmployee = props => {

    console.log("prospdfkkkkkkkk" , props)

    const employeeData = props?.route?.params?.item
    const [show, setShow] = useState(true);
    const [employee_id, setEmployee_id] = useState(employeeData?.email_id);
    const [vendorName, setVendorName] = useState(null);
    const [location, setLocation] = useState(null);
    const [name, setName] = useState(employeeData?.name);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(employeeData?.password);
    const [number, setNumber] = useState(employeeData?.contact_no);
    const [role, setRole] = useState(employeeData?.role);
    const [errorMessage  , setErrorMessage] = useState(null)
    const [isEnabled, setIsEnabled] = useState(false);
    const widthAndHeight = 180
    const series = [140, 321, 80]
    const dispatch = useDispatch()
    const sliceColor = ['orange', '#1f51e5', '#ffffff']
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const userData = useSelector(state => state)
   const userName =  userData?.user?.user?.name
    const [value, setValue] = useState(employeeData?.role);
  const [isFocus, setIsFocus] = useState(false);
  const [locationdata , setLocationData] = useState([])

console.log(userName , "jfkdjfkdjflkjdslkf==========>>.")
  
const getUserLocation = () => {
    dispatch(getLocation()).then(result => {
        console.log("result recieved======LOCATIBNNN", result)
        if (result?.payload){
            let data = result?.payload?.map((item , index) => item)
            setLocationData(data)
            
        }
         
        
      });
}

const roleData = [
  {
     id : 1,
    role : "supervisior"
  },
  {
    id : 2 ,
    role : "restroomCleaner"
  }
]

  useEffect(()  =>{
getUserLocation()
  }, [])

      
    const Upload = () => {

      setLoading(true)
        console.log("uservendor ------id" , userData?.user?.user?.user_id )
        const EmployeeDetail = JSON.stringify({
                name : name,
                contact_no : number,
                email_id :  employee_id,
                password : password,
                position_status : "employee",
                vendor_id : employeeData?.vendor_id,
                role : value
        })
        let employee_ID = employeeData?.user_id
    dispatch(editEmployee({EmployeeDetail  , employee_ID})).then(result => {
        console.log("result recieved== updateddddd====", result)
        if (result?.payload === "User updated successfully!") {
          setLoading(false);
          Alert.alert(result?.payload)
          props.navigation.navigate("AssignedTask" , employeeData)
        } else {
         Alert.alert("User not update successfully")
        }
      });
    
    }
 console.log("locatkjfkdfj----" , value)
    return (
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{marginBottom:20}}>
        <View style={{ backgroundColor: "#ffffff", height: hp("100%") }}>
            <HeaderComponent search props={props}  />

<ScrollView contentContainerStyle={{padding:ResponsiveSize(20)}}>
            <Text style={{ color: "black", textAlign: "center", fontSize: ResponsiveSize(18), fontFamily:"Roboto-Medium"}}>Edit Employee</Text>
            <Text style={{ color: "black", textAlign: "center", marginTop:ResponsiveSize(5) , fontSize: ResponsiveSize(18), fontFamily:"Roboto-Medium" }}>Employee Name : {employeeData?.name}</Text>
            <View style={{marginTop: ResponsiveSize(20)}}>
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
              value={number}
              onChangeText={setNumber}
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
            <TextInput
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
             Submit
            </Text>
          </TouchableOpacity>
          </View>
            {/* <View style={{ justifyContent: "center", alignItems: "center" , marginBottom:50 }}>
                <TouchableOpacity
                    // onPress={() => {
                    //     Alert.alert("Employee Added Successfully"),
                    //     props.navigation.navigate("EmployeeList")
                    // }} 
                    onPress={loading  ? <ActivityIndicator/>  : Upload}
                    style={styles.button}>
                    <Text
                        style={{
                            fontSize: ResponsiveSize(16),
                            color: 'white',
                            // fontWeight: 'bold',
                        }}>
                    {"Update"}
                    </Text>
                </TouchableOpacity>
            </View> */}
            </ScrollView>
        </View>
        </KeyboardAwareScrollView>
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
        paddingTop: hp("5%")
    },
    title: {
        fontSize: 30,
        margin: 10,
        color: "#1F51E5",
        position: "absolute",
        top: 100

    },

    button: {
      height: ResponsiveSize(45),
      borderRadius: ResponsiveSize(5),
      alignItems: 'center',
      marginTop: ResponsiveSize(30),
      backgroundColor: '#397421',
      justifyContent: 'center',
    },
    ImageDataStyle: {
        backgroundColor: '#f8f8ff',
        height: hp('12%'),
        padding: 15,
        marginTop: 10,
        borderRadius: hp("4%"),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: "space-between"

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

export default EditEmployee;
