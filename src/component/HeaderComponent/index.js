import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
  } from 'react-native';
  import React, {useState , useEffect} from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { IMAGES } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { ResponsiveSize } from '../../utils/ResponsiveSize';




const HeaderComponent = (props) => {
  const userData = useSelector(state => state)

  const name = userData?.user?.user?.name
  let position  = userData?.user?.user?.position_status

 const vendorName = name?.split(' ');
    return(
<View style={styles.SearchView}>
<View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center" , marginTop:hp("2%")}}>
 <View style={{flexDirection:"row" , alignItems:"center"}}>
{   props.search &&  <TouchableOpacity
  onPress={() => props.props.navigation.goBack()}>{}
 <Image
      style={{width:ResponsiveSize(20) , height:ResponsiveSize(20)}}
      source={IMAGES.BackIcon}
      resizeMode="contain"></Image>
      </TouchableOpacity>}
      {   props.employee &&  <TouchableOpacity
  onPress={() => props.props.navigation.goBack()}>{}
 <Image
      style={{width:ResponsiveSize(20) , height:ResponsiveSize(20)}}
      source={IMAGES.BackIcon}
      resizeMode="contain"></Image>
      </TouchableOpacity>}
      <View style={{marginLeft:ResponsiveSize(10)}}>
      <Text style={{color:"#ffffff" , fontFamily:"Roboto-Bold" , fontSize:ResponsiveSize(18)}}>
   {name ? vendorName : null}
  </Text>
  <Text style={styles.statusTextStyle}>
    {position === "employee" ? "Employee"  : "Vendor"}
  </Text>
      </View>
  
  </View>
  <View style={{flexDirection:"row" , justifyContent:"space-between" , width:ResponsiveSize(50)}}>
    <TouchableOpacity onPress={() => {
      props.props.navigation.navigate("Notification")
    }}>
    <Image
      style={styles.NotificationView}
      source={IMAGES.notification_bell}
      resizeMode="contain"></Image>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => {
        props?.props?.navigation?.navigate("Settings")
      }}>
       <Image
      style={styles.DetailView}
      source={IMAGES.detial_image}
      resizeMode="contain"></Image>
      </TouchableOpacity>
  </View>
</View>
{props.search && 
<View style={{ flexDirection: 'row',  height:ResponsiveSize(48) , marginTop:ResponsiveSize(5) ,backgroundColor:"#ffffff" ,alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal:ResponsiveSize(10) }}>

      <TextInput
        style={{ flex: 1, paddingLeft: 5  , color:"#000"}}
        placeholder="Search Employee"
        placeholderTextColor={"#878787"}
        
      />
      <Image
      style={styles.NotificationView}
      source={IMAGES.SearchIcon}
      resizeMode="contain"></Image>
    </View>}
</View>
    )
}

const styles = StyleSheet.create({
    SearchView: {
        padding:ResponsiveSize(20),
        backgroundColor: '#397421',
        justifyContent:"space-between",
      
      },
      profileView: {
        flexDirection: 'row',
        alignItems: 'center',

        // justifyContent:"space-between",
        // height:hp("12%"),

    
      },
      ImageView: {
        backgroundColor: 'black',
        borderRadius: hp('4%'),
        height: hp('6%'),
        width: wp('13%'),
       
      },
      NotificationView: {
        // backgroundColor: 'black',
         height:ResponsiveSize(18),
         width:ResponsiveSize(19)
       
      },
      DetailView: {
        // backgroundColor: 'black',
        height:ResponsiveSize(18),
         width:ResponsiveSize(20)
       
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
      statusTextStyle: { 
        // fontSize: hp('1.5%'),
        marginTop:ResponsiveSize(5),
        // fontWeight: 'bold',
        fontFamily:"Robotic-Medium",
        color: '#fff',
        fontSize:ResponsiveSize(12)
      },
      SearchMargin: {
        // marginTop: hp("2%"),
        // flexDirection: "row"
        paddingRight: wp('2%'),
      },
    
})

export default HeaderComponent ; 
