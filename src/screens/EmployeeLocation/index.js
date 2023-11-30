import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React , {useState , useEffect} from 'react'
import { getEmployeeList } from '../../slice/ApiCalling';
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { ResponsiveSize } from '../../utils/ResponsiveSize';
import { Image } from 'react-native';
import { IMAGES } from '../../assets';
import HeaderComponent from '../../component/HeaderComponent';


const EmployeeLocation = (props)  => {
    const dispatch = useDispatch();
    const [employeeList , setEmployeeList] = useState(null)
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

      
  const getUserList = async () => {
    dispatch(getEmployeeList(userInfo)).then(result => {
      console.log('result recieved==== user dar4dkdkdk', result);
      if (result?.payload) {
        setEmployeeList(result?.payload);
      }
    });
  };

  useEffect(() => {
    getUserList();
  }, []);

      const ImageData = data => {
        console.log('data recieved , ============>>>', data);
        return (
          <TouchableOpacity 
          onPress={() => props.navigation.navigate("RemarkScreen")}
          style={styles.ImageDataStyle}>
            <View>
            <Text style={{color: 'black', fontSize: 15, fontFamily:"Roboto-Medium"}}>
              Employee ID : 
            </Text>
            <Text style={{color: 'black', fontSize: 15, fontFamily:"Roboto-Medium"}}>
              Employee name : 
            </Text>
            <Text style={{color: 'black', fontSize: 15, fontFamily:"Roboto-Medium"}}>
              Due time : 
            </Text>
            </View>
            <View>
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
            </View>
          </TouchableOpacity>
        );
      };
    return(
        <View>
            <HeaderComponent search props={props}/>
            <View style={{padding:ResponsiveSize(20) } }>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Roboto-Medium',
                fontSize: ResponsiveSize(18),
              
              }}>
              Location : PCMC center , Pune
            </Text>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Roboto-Light',
                fontSize: ResponsiveSize(15),
               marginTop:10
              }}>
              Employee name
            </Text>
            <FlatList
          data={data}
          renderItem={ImageData}
    
        />
            </View>
 
        </View>
    )
}

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
      backgroundColor: '#E4ECE1',
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
  });

export default EmployeeLocation;