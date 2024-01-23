import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React , {useState , useEffect} from 'react'
import { getEmployeeList, getEmployeeTask, workStatus } from '../../slice/ApiCalling';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { ResponsiveSize } from '../../utils/ResponsiveSize';
import { Image } from 'react-native';
import { IMAGES } from '../../assets';
import HeaderComponent from '../../component/HeaderComponent';
import { TaskAbortError } from '@reduxjs/toolkit';
import moment from 'moment';


const EmployeeLoginScreen = (props)  => {
    const dispatch = useDispatch();
    const [completeWorkCount , setCompleteWorkCount ] = useState(null)
    const [delayWorkCount , setDelayWorkCount] = useState(null)
    const [taskData , setTaskData] = useState(null)
    const userData = useSelector(state => state);
    const taskID = userData?.user?.user?.user_id;
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


      const getAssignedTask = () => {
        dispatch(getEmployeeTask(taskID)).then(result => {
          console.log('result recievNEWWWWWWWWWWWWed logoin======', result);
          if (result?.type === 'getEmployeeTask/fulfilled') {
            setTaskData(result?.payload);
          } else {
            Alert.alert('No Data fetched');
          }
        });
      };
      useEffect(() => {
        getAssignedTask();
      }, []);
      
  const getWorkStatus = async () => {
    dispatch(workStatus(taskID)).then(result => {
      console.log('workstatus we are getttinggg', result);
      if (result?.payload) {
let complete = (result?.payload?.late_mark_complete_count/result?.payload?.total_count)*100 ;
setCompleteWorkCount(complete + "%")
let delay = (result?.payload?.late_mark_delay_count/result?.payload?.total_count)*100
setDelayWorkCount(delay + "%")


        // setEmployeeList(result?.payload);
      }
    });
  };

  useEffect(() => {
    getWorkStatus();
  }, []);

      const ImageData = data => {
        console.log('data recieved , ============>>>', data);
        return (
          <TouchableOpacity 
          onPress={() => props.navigation.navigate("Restroom"  , data)}
          style={styles.ImageDataStyle}>
            <View>
            <Text style={{color: 'black', fontSize: ResponsiveSize(18), fontFamily:"Roboto-Mixed"}}>
              Location : 
            </Text>
            <Text style={{color: 'black', fontSize:  ResponsiveSize(18), fontFamily:"Roboto-Mixed"}}>
              Due Time : 
            </Text>
          
            </View>
            <View>
            <Text style={{color: 'black', fontSize:  ResponsiveSize(18), fontFamily:"Roboto-Light"}}>
             {data?.item?.restroom_id}
            </Text>
            <Text style={{color: 'black', fontSize:  ResponsiveSize(18),fontFamily:"Roboto-Light"}}>
              {data?.item?.due_time}
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
            <HeaderComponent  props={props} logout/>
            <View style={{padding:ResponsiveSize(20)} }>
                <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Roboto-Medium',
                fontSize: ResponsiveSize(18),
              
              }}>
              Your status for today
            </Text>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Roboto-Light',
                fontSize: ResponsiveSize(15),
               marginTop:10
              }}>
              {moment(new Date()).format('DD-MMM-YYYY')}
            </Text>
            
            </View>
            <View style={{height:ResponsiveSize(18) , flexDirection:"row" ,  width:"100%" ,marginVertical:10}}>
                <View style={{backgroundColor:"red" , width:completeWorkCount,  height:ResponsiveSize(16)}}></View>
                <View style={{backgroundColor:"green" , width:delayWorkCount,   height:ResponsiveSize(16)}}></View>

            </View>
            <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
                <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
                    <View style={{height:ResponsiveSize(12) , width:ResponsiveSize(12) , borderRadius:ResponsiveSize(20) , backgroundColor:"red"}}></View>
                    <Text  style={{
                color: '#000000',
                fontFamily: 'Roboto-Regular',
                fontSize: ResponsiveSize(14),
               marginLeft:10
              }}>Completed Work</Text>
                </View>
                <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
        
                    <Text  style={{
                color: '#000000',
                fontFamily: 'Roboto-Regular',
                fontSize: ResponsiveSize(14),
               marginRight:10
              }}>Late Mark</Text>
              <View style={{height:ResponsiveSize(12) , width:ResponsiveSize(12) , borderRadius:ResponsiveSize(20) , backgroundColor:"green"}}></View>
                </View>
            </View>
            <FlatList
          data={taskData}
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

export default EmployeeLoginScreen;