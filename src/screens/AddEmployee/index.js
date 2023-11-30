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
    TextInput,
    Alert,
    Switch,
    FlatList,
    ActivityIndicator,
    ScrollView,
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
import { addEmployee, fetchData, getAllVendorLocation, getLocation } from '../../slice/ApiCalling';
import { ErrorBox } from '../../component/ErrorBox/errorBox';
import DropdownComponent from '../../component/DropdownComponent';

const AddEmployee = props => {
    const [show, setShow] = useState(true);
    const [employee_id, setEmployee_id] = useState(null);
    const [vendorName, setVendorName] = useState(null);
    const [location, setLocation] = useState(null);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const [number, setNumber] = useState(null);
    const [role, setRole] = useState(null);
    const [errorMessage  , setErrorMessage] = useState(null)
    const [isEnabled, setIsEnabled] = useState(false);
    const widthAndHeight = 180
    const series = [140, 321, 80]
    const dispatch = useDispatch()
    const sliceColor = ['orange', '#1f51e5', '#ffffff']
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const userData = useSelector(state => state)
   const userName =  userData?.user?.user?.name
    const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [locationdata , setLocationData] = useState([])
const getUserLocation = () => {
    dispatch(getAllVendorLocation()).then(result => {
        if (result?.payload){
            let data = result?.payload?.filter(item => item.position_status === "vendor")
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



  useEffect(()  =>{
getUserLocation()
  }, [])

      
    const Upload = () => {
      if(
        name !== null &&
        number !== null &&
        employee_id !== null &&
        password !== null &&
        value !== null 
      ){
        setLoading(true)
        const date = new Date();
        const EmployeeDetail = JSON.stringify({
                name : name,
                contact_no : number,
                email_id :  employee_id,
                password : password,
                registration_data : date,
                position_status : "employee",
                vendor_id : userData?.user?.user?.user_id,
                role : value
        })
    dispatch(addEmployee(EmployeeDetail)).then(result => {
        if (result?.payload === "User created successfully!") {
          setLoading(false);
          Alert.alert(result?.payload)
          props.navigation.navigate("AssignWork")
          setEmployee_id(null)
          setPassword(null)
          setLocation(null)
          setName(null)
          setNumber(null)
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
          setNumber(null)
          setRole(null)
          setValue(null)
        }
      });
      }
      else{
        Alert.alert("Please fill all the fields")
      }

    
    }
    return (
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{marginBottom:20}}>
        <View style={{ backgroundColor: "#ffffff", height: hp("100%") }}>
            <HeaderComponent props={props} />

<ScrollView>
            <Text style={{ color: "black", textAlign: "center", marginTop: hp("4%"), fontSize: 20, fontWeight: "bold" }}>Add Employee</Text>
            <View style={{paddingHorizontal:20 , marginTop:20}}>
            <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center" }}>
                <Text style={{color:"black" , fontWeight:"bold" , fontSize:16}}>Employee ID :</Text>
                <TextInput
                  placeholder='Enter EmployeeID'
                  placeholderTextColor={"grey"}
                  value={employee_id}
                  onChangeText={setEmployee_id}
            
                  
                  style={{  width: wp("40%"), borderWidth: 1, color:"black" , marginTop:20 ,paddingVertical:-20, borderColor: "black" }}/>
            </View>
            <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center" }}>
                <Text style={{color:"black" , fontWeight:"bold" , fontSize:16}}>Password :</Text>
                <TextInput
                  placeholder='Enter Password'
                  placeholderTextColor={"grey"}
                  value={password}
                  onChangeText={setPassword}
                  style={{  width: wp("40%"), borderWidth: 1, color:"black" , marginTop:20 ,paddingVertical:-20, borderColor: "black" }}/>
            </View>
            <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
                <Text style={{color:"black" , fontWeight:"bold" , fontSize:16}}>Name :</Text>
                <TextInput
                  placeholder='Enter Name'
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={"grey"}
                  style={{ width: wp("40%"), borderWidth: 1,color : "black" , marginTop:20 ,paddingVertical:-20, borderColor: "black" }}/>
            </View>
            <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
                <Text style={{color:"black" , fontWeight:"bold" , fontSize:16}}>Contact Number :</Text>
                <TextInput
                  placeholder='Enter Number'
                  value={number}
                  onChangeText={setNumber}
                  placeholderTextColor={"grey"}
                  style={{  width: wp("40%"), borderWidth: 1,color : "black" , marginTop:20 ,paddingVertical:-20, borderColor: "black" }}/>
            </View>
            <View style={{marginTop:10}}>
                <Text style={{color:"black" , fontWeight:"bold" , fontSize:16}}>Enter Role :</Text>
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
            </View>
            <View style={styles.dropdownContainer}>
      {/* {renderLabel()} */}
    </View>
            </View>
            {errorMessage !== null && errorMessage !== undefined && (
        <ErrorBox errMsg={errorMessage} />
      )}
            <View style={{ justifyContent: "center", alignItems: "center"  , marginBottom:50}}>
                <TouchableOpacity
                    // onPress={() => {
                    //     Alert.alert("Employee Added Successfully"),
                    //     props.navigation.navigate("EmployeeList")
                    // }} 
                    onPress={Upload}
                    style={styles.button}>
                    <Text
                        style={{
                            fontSize: ResponsiveSize(16),
                            color: 'white',
                            // fontWeight: 'bold',
                        }}>
                    {"Submit"}
                    </Text>
                </TouchableOpacity>
            </View>
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
    dropdownContainer: {
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

export default AddEmployee;
