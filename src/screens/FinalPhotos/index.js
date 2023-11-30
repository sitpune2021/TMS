import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getEmployeeList} from '../../slice/ApiCalling';
import {useDispatch} from 'react-redux';
import {FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ResponsiveSize} from '../../utils/ResponsiveSize';
import {Image} from 'react-native';
import {IMAGES} from '../../assets';
import HeaderComponent from '../../component/HeaderComponent';

const FinalPhotos = props => {
  const dispatch = useDispatch();
  const [employeeList, setEmployeeList] = useState(null);
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

  //   useEffect(() => {
  //     getUserList();
  //   }, []);

  const ImageData = data => {
    console.log('data recieved , ============>>>', data);
    return (
        <View style={styles.viewStyle}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('EmployeeLoginScreen')}
        style={styles.ImageDataStyle}>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: ResponsiveSize(18),
              fontFamily: 'Roboto-Mixed',
            }}>
            Location :
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: ResponsiveSize(18),
              fontFamily: 'Roboto-Mixed',
            }}>
            Due Time :
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#397421',
              fontSize: ResponsiveSize(14),
              fontFamily: 'Roboto-Light',
            }}>
            Completed
          </Text>

        </View>
  
      
      </TouchableOpacity>
            </View>
    );
  };
  return (
    <View>
      <HeaderComponent props={props} employee />
      <View style={{padding: ResponsiveSize(20)}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Roboto-Medium',
              fontSize: ResponsiveSize(18),
            }}>
            Work status for today
          </Text>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Roboto-Light',
              fontSize: ResponsiveSize(15),
              marginTop: 10,
            }}>
            22 Nov 2023
          </Text>
        </View>
        <View
          style={{
            height: ResponsiveSize(18),
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <View
            style={{
              backgroundColor: 'red',
              width: '40%',
              borderTopLeftRadius: ResponsiveSize(20),
              borderBottomLeftRadius: ResponsiveSize(20),
              height: ResponsiveSize(16),
            }}></View>
          <View
            style={{
              backgroundColor: 'green',
              width: '60%',
              borderTopRightRadius: ResponsiveSize(20),
              borderBottomRightRadius: ResponsiveSize(20),
              height: ResponsiveSize(16),
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: ResponsiveSize(12),
                width: ResponsiveSize(12),
                borderRadius: ResponsiveSize(20),
                backgroundColor: 'green',
              }}></View>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Roboto-Regular',
                fontSize: ResponsiveSize(14),
                marginLeft: 10,
              }}>
              Completed Work
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Roboto-Regular',
                fontSize: ResponsiveSize(14),
                marginRight: 10,
              }}>
              Late Mark
            </Text>
            <View
              style={{
                height: ResponsiveSize(12),
                width: ResponsiveSize(12),
                borderRadius: ResponsiveSize(20),
                backgroundColor: 'green',
              }}></View>
          </View>
        </View>
        <FlatList data={data} renderItem={ImageData}  />
      </View>
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
    height: ResponsiveSize(45),
    borderRadius: ResponsiveSize(5),
    alignItems: 'center',
    marginTop: ResponsiveSize(80),
    backgroundColor: '#397421',
    justifyContent: 'center',
  },
  ImageDataStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewStyle:{
    backgroundColor: '#E4ECE1',
    padding: ResponsiveSize(15),
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#F5F5F5',
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

export default FinalPhotos;
