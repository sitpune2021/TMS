import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';
  import React, {useState} from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { IMAGES } from '../../assets';
import DrawerNavigation from '../../navigation/DrawerNavigation';
import CustomDrawer from '../CustomerDrawer';

const MainScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleDrawer}>
        <Text style={styles.toggleButtonText}>{isDrawerOpen ? 'Close Drawer' : 'Open Drawer'}</Text>
      </TouchableOpacity>

      <CustomDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {/* Content inside the drawer */}
        <View style={styles.drawerContent}>
          <Text>Drawer Content</Text>
        </View>
      </CustomDrawer>

      {/* Main content of your screen */}
      <View style={styles.mainContent}>
        <Text>Main Content</Text>
      </View>
    </View>
  );
};





const LoginHeaderComponent = ({props}) => {
    const [show , setShow]  = useState(false)
    return(
<View style={styles.SearchView}>
<View style={styles.profileView}>
  <TouchableOpacity
 
    >
      <Image
      style={styles.ImageView}
      source={IMAGES.login_logo}
      resizeMode="contain"></Image>
  </TouchableOpacity>
  <Text style={styles.UserNameTextStyle}>
    TMS Application
  </Text>
  <TouchableOpacity
  onPress={() => {
    <CustomDrawer/>
  }}
  >
  <Image
      style={styles.LeftImageView}
      source={IMAGES.detial_image}
      resizeMode="contain"></Image>
      </TouchableOpacity>
</View>
<View style={styles.SearchMargin}>
</View>
</View>
    )
}

const styles = StyleSheet.create({
    SearchView: {
        // marginTop: hp('2%'),
        paddingHorizontal: wp('3%'),
        backgroundColor: '#1f51e5',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
      },
      profileView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between",
        height:hp("12%"),

    
      },
      ImageView: {
        backgroundColor: 'black',
        borderRadius: hp('4%'),
        height: hp('6%'),
        width: wp('13%'),
       
      },
      LeftImageView: {
        // backgroundColor: 'black',
        // borderRadius: hp('4%'),
        height: hp('3%'),
        width: wp('8%'),
      },
      UserNameTextStyle: {
        marginLeft: wp('3%'),
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        color: '#fff',
      },
      SearchMargin: {
        // marginTop: hp("2%"),
        // flexDirection: "row"
        paddingRight: wp('2%'),
      },
      container: {
        flex: 1,
      },
      toggleButton: {
        padding: 10,
        backgroundColor: 'lightblue',
        alignItems: 'center',
      },
      toggleButtonText: {
        color: '#fff',
      },
      drawerContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      mainContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
})

export default LoginHeaderComponent ; 
