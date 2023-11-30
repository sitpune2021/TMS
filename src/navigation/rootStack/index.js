import React from 'react'
import { StyleSheet, Text, View, button, Dimensions } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import Home from '../../screens/Home';
import Restroom from '../../screens/Restroom';
import Notification from '../../screens/Notification';
import ForgotPassword from '../../screens/ForgotPassword';
import otpVerification from '../../screens/OtpVerification';
import ConfirmPassword from '../../screens/ConfirmPassword';
import AssignWork from '../../screens/AssignWork';
import EmployeeList from '../../screens/EmployeeList';
import AddEmployee from '../../screens/AddEmployee';
import DrawerNavigation from '../DrawerNavigation';
import Root from '../DrawerNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../DrawerNavigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AboutUs from '../../screens/DrawerScreens/about';
import Share from '../../screens/DrawerScreens/Share';
import SocialMedia from '../../screens/DrawerScreens/SocialMedia';
import EditEmployee from '../../screens/EditEmployee';
import Settings from '../../screens/Settings';
import AssignedTask from '../../screens/AssignedTask';
import EditAssignWork from '../../screens/EditAssignedWork';
import UploadPhotos from '../../screens/UploadPhotos';
import FinalPhotos from '../../screens/FinalPhotos';
import LocationList from '../../screens/LocationList';
import WorkList from '../../screens/WorkList';
import DelayWorkList from '../../screens/DelayWorkList';
import LocationDetail from '../../screens/LocationDetail';
import EmployeeLocation from '../../screens/EmployeeLocation';
import RemarkScreen from '../../screens/RemarkScreen';
import EmployeeLoginScreen from '../../screens/EmployeeLoginScreen';
import StartWork from '../../screens/StartWork';
import NewRestroom from '../../screens/NewRestroom';
// import WelcomeScreen from '../../screens/Welcome';
// import DrawerNavigation from '../DrawerNavigation';



const RootStack = () => {
  const Stack = createNativeStackNavigator();


  const Drawer = createDrawerNavigator();

  const width = Dimensions.get("screen").width;

 function Root() {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{
        headerShown: false, drawerStyle: {
          width: wp("60%"),
        }, drawerPosition: "right"
      }}>
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    );
  }


  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }} >
      {/* <Stack.Screen name="DrawerNavigation" component={Root} /> */}
      {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Restroom" component={Restroom} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpVerification" component={otpVerification} />
      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
      <Stack.Screen name="AssignWork" component={AssignWork} />
      <Stack.Screen name="EmployeeList" component={EmployeeList} />
      <Stack.Screen name="LocationList" component={LocationList} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
      <Stack.Screen name="EditEmployee" component={EditEmployee} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AssignedTask" component={AssignedTask} />
      <Stack.Screen name="EditAssignWork" component={EditAssignWork}/>
      <Stack.Screen name="UploadPhotos" component={UploadPhotos} />
      <Stack.Screen name="FinalPhotos" component={FinalPhotos} />
      <Stack.Screen name="WorkList" component={WorkList} />
      <Stack.Screen name="DelayWorkList" component={DelayWorkList} />
      <Stack.Screen name="LocationDetail" component={LocationDetail} />
      <Stack.Screen name="EmployeeLocation" component={EmployeeLocation} />
      <Stack.Screen name="RemarkScreen" component={RemarkScreen} />
      <Stack.Screen name="EmployeeLoginScreen" component={EmployeeLoginScreen} />
      <Stack.Screen name="StartWork" component={StartWork} />
      <Stack.Screen name="NewRestroom" component={NewRestroom} />



    </Stack.Navigator>
  );
};




export default RootStack;
