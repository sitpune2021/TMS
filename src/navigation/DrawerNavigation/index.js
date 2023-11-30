import * as React from 'react';
import { Button, View  , Text , Image , StyleSheet} from 'react-native';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { IMAGES } from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function CustomDrawer(props) {
    return (
      // <DrawerContentScrollView style={{}} {...props}>
     <View>
      <View style={{alignItems:"center" , paddingTop:20}}>
        <Image
      style={styles.ImageView}
      source={IMAGES.login_logo}
      resizeMode="contain"></Image>
      </View>
      <View style={{padding:20}}>
      <View style={{flexDirection:"row"  , alignItems:"center" }}>
      <Image
      style={styles.IconView}
      source={IMAGES.login_logo}
      resizeMode="contain"></Image>
        <Text style={{color:"black" , fontWeight:"bold" , marginLeft:10 , fontSize:16}}>About App</Text>
     
      </View>
      <View
     style={{flexDirection:"row" , marginTop:10, alignItems:"center"}}>
       <Image
      style={styles.IconView}
      source={IMAGES.share_app}
      resizeMode="contain"></Image>
        <Text style={{color:"black" , fontWeight:"bold" , marginLeft:10 , fontSize:16}}>Share</Text>
      </View>
      <View style={{flexDirection:"row" , marginTop:10,  alignItems:"center"}}>
      <Image
      style={styles.IconView}
      source={IMAGES.social_media}
      resizeMode="contain"></Image>
        <Text style={{color:"black" , fontWeight:"bold" , marginLeft:10 , fontSize:16}}>Social Media</Text>
    </View>
    </View>
     </View>
    //  </DrawerContentScrollView>
    );
  }


  const styles = StyleSheet.create({
    ImageView: {
      borderRadius: hp('4%'),
      height: hp('8%'),
      width: wp('16%'),
      alignItems:"center"
     
    },
    IconView: {
      borderRadius: hp('4%'),
      height: hp('5%'),
      width: wp('8%'),
     
    },
  })
  