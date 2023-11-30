import React, {useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ResponsiveSize } from '../../utils/ResponsiveSize';
import { IMAGES } from '../../assets';
import { deleteEmployee, fetchData, getEmployeeList, getUserInfo } from '../../slice/ApiCalling';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const Settings = props => {
  const [employeeList, setEmployeeList] = useState(null)
  const dispatch = useDispatch();
  const userData = useSelector(state => state)
  const userInfo = userData?.user?.user?.user_id
  const type = userData?.user?.user?.position_status
  const isFocused = useIsFocused()

  const deleteUser = (item) => {
    dispatch(deleteEmployee(item)).then(result => {
      console.log("delete status =======>>>>>", result)
      if (result?.type === "deleteEmployee/fulfilled") {
       Alert.alert(result?.payload)
       getUserList()
      }else{
        Alert.alert("Unable to delete the User")
      }
    });
  }
  const getUserList = async () => {
    dispatch(getEmployeeList(userInfo)).then(result => {
      if (result?.payload) {
        setEmployeeList(result?.payload)
      }
    });
  }
  useEffect(() => {
    getUserList()
  }, [isFocused])
  return (
    <View style={{ backgroundColor: '#ffffff', height: hp('100%') }}>
<View style={styles.SearchView}>
<Text style={{textAlign:"center"  , fontSize:20 , color:"#ffffff"}}>Setting</Text>
  </View>
  {
    type !== "employee" && 
    <TouchableOpacity
    onPress={() => {
      props.navigation.navigate("AssignWork")
    }}
      style={{ flexDirection: "row", paddingVertical: 15, marginTop:10 , alignItems: "center" }}
    >
      <Text
        style={{
          color: 'black',
          textAlign: "left",
          fontWeight: 'bold',
          fontSize: 20,
          marginLeft: wp("5%")
        }}>
      Assign Work
      </Text>
    </TouchableOpacity>
  }
 {
  type !== "employee"  && 
  <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("AssignedTask")
      }}
        style={{ flexDirection: "row", paddingVertical: 15, marginTop:10 , alignItems: "center" }}
      >
        <Text
          style={{
            color: 'black',
            textAlign: "left",
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: wp("5%")
          }}>
        Assigned Work
        </Text>
      </TouchableOpacity>
 }
      <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Login")
      }}
        style={{ flexDirection: "row", paddingVertical: 15, marginTop:10 , alignItems: "center" }}
      >
        <Text
          style={{
            color: 'black',
            textAlign: "left",
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: wp("5%")
          }}>
        Logout
        </Text>
      </TouchableOpacity>
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
    padding: 10,
    marginTop: 15,
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
    borderRadius: hp('1%'),
    height: hp('5%'),
    width: wp('10%'),
    marginLeft: wp("15%")
  },
  SearchView: {
    paddingHorizontal: wp('3%'),
    paddingVertical:hp('2%'),
    backgroundColor: '#1f51e5',
    justifyContent:"space-between",
    borderBottomEndRadius:20,
    borderBottomLeftRadius:20
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Settings;
