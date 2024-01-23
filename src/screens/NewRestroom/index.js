/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  PermissionsAndroid,
  ActivityIndicator,
  Modal,
  Pressable,
  Image,
  Location,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import HeaderComponent from '../../component/HeaderComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {ResponsiveSize} from '../../utils/ResponsiveSize';
import * as geolib from 'geolib';
import {IMAGES} from '../../assets';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos, uploadImages } from '../../slice/ApiCalling';

const NewRestroom = props => {
  console.log(props , "props we for after ggg =================>>>>>>")
  const taskData = props?.route?.params[0];
  const staticLocation = {
    latitude: Number(taskData?.lat_details).toFixed(7),
    longitude: Number(taskData?.long_details).toFixed(7),
  };
  const [dueDate, setDueDate] = useState(null);
  const [current_lat, setCurrent_lat] = useState(null);
  const [current_long, setCurrent_long] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [pickerImage, setPickedImage] = useState('');
  const [pickerImage2, setPickedImage2] = useState('');
  const [pickerImage3, setPickedImage3] = useState('');
  const [pickerImage4, setPickedImage4] = useState('');
  const [pickerImage5, setPickedImage5] = useState('');
  const [pickerImage6, setPickedImage6] = useState('');
  const [pickerImage7, setPickedImage7] = useState('');
  const [pickerImage8, setPickedImage8] = useState('');
  const [previousImages , setPreviousImages] = useState([])
  const [employee_id, setEmployee_id] = useState(null);
  const [remark, setRemark] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const usedID = useSelector(state => state?.user?.user?.user_id)
  const dispatch = useDispatch();


  const HalfCircle = () => {
    return (
      <View style={styles.circleContainer}>
        <View style={styles.circle}></View>
      </View>
    );
  };


  const openImagePicker = async (setState) => {

    const result = onClick();
    result.then(res => {
      console.log("reeeeeeeeeeeeeeeeeeeee", res)
      if (res) {
        var options = {
          mediaType: 'photo', //to allow only photo to select ...no video
          saveToPhotos: true,  //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
          includeBase64: false,
        };

        launchCamera(options, (res) => {
          console.log('Response = ', res);

          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            Alert.alert(res.customButton);
          } else {
            // let source = res;
            // var resourcePath1 = source.assets[0].uri;
            const source = { uri: res.uri };
            console.log('response', JSON.stringify(res));

            setState(res.assets[0])


          }
        }
        )
      }
      else {
        Alert.alert("Camera permission not given")
      }
    })

  }

  

    const onClick = async () => {
      try {
        const grantedcamera = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        const grantedstorage = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED && grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera & storage permission given");
          return true
        }
        else {
          console.log("Camera & storage permission  not given");
          return false
        }
      }
      catch (err) {
        console.log(err)
      }
    }

    const UploadPhotos = async () => {
      const pickerImages = [
        pickerImage, pickerImage2, pickerImage3, pickerImage4, 
        pickerImage5, pickerImage6, pickerImage7, pickerImage8
      ];
        setLoading(true)

          const dateToFormat = new Date();
          const formattedDate = moment(dateToFormat).format('YYYY-MM-DD');
          console.log("object", formattedDate)
            console.log("inside the consssssssssss", pickerImage)
            const formData = new FormData();
            formData.append('user_id', usedID);
            formData.append('photo_type', 'After');
            formData.append('created_date', formattedDate);
            pickerImages.forEach((image, index) => {
              formData.append('myImages', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
              });
            });
            dispatch(uploadImages(formData)).then(result => {
              console.log("result recieved logoin======", result)
              if (result?.payload !== undefined) {
                setLoading(false);
                Alert.alert("Photo uploaded successfully")
                props.navigation.navigate('FinalPhotos')
                setUploadStatus(true)
                setPreviousImages(null)
              } else {
                setLoading(false);
                Alert.alert("Error uploading Images")
              }
            }).catch((error) => {
console.log(error , "error in uploading" )
            });


    };



  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position, 'current position');
            setLocation(position);
            setCurrent_lat(position?.coords?.latitude);
            setCurrent_long(position?.coords?.longitude);
            setTimeout(() => {
              const currentLocation = {
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
              };
              const distance = geolib.getDistance(
                currentLocation,
                staticLocation,
              );
              console.log(
                staticLocation,
                currentLocation,
                'postion cordinates=====================>>>>>>>>>',
              );
              const maxDistanceThreshold = 100;
              // if (distance <= maxDistanceThreshold) {
              setModalVisible(false);
             
              //     Alert.alert("Location Matched Successfully")
              //   } else {
              //          setModalVisible(false)
              //       Alert.alert("You are not at the location")
              //  props.navigation.navigate("EmployeeLoginScreen")
              // }
              // setModalVisible(false)
            }, 1000);
            // setLocationModal(true)
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };
  useEffect(() => {
    const presentDate = new Date();
    const newDate = moment(presentDate, 'HH:mm:ss').format('h:mm A'); // Convert to 12-hour format without seconds
    const taskDate = moment(taskData?.due_time, 'HH:mm:ss').format('h:mm A');
    if (newDate > taskDate) {
      setDueDate('Late Arrival');
    } else {
      setShow(true);
      setDueDate('Approved');
    }
    console.log(newDate, taskDate, 'date we are recieving here');
  }, [taskData]);
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <View style={{backgroundColor: '#fff'}}>
      <HeaderComponent props={props} employee logout/>
      <ScrollView
        // contentContainerStyle={{marginBottom: hp('4%')}}
        keyboardShouldPersistTaps="handled">
        <View style={{padding: hp('4%')}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: ResponsiveSize(18),
                fontFamily: 'Roboto-Medium',
              }}>
              Due Time : 
            </Text>
            <Text
              style={{
                color: '#9D0700',
                fontSize: ResponsiveSize(18),
                fontFamily: 'Roboto-Regular',
                marginLeft: ResponsiveSize(102),
              }}>
              {taskData?.due_time}
            </Text>
            <Text></Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp('2%'),
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: ResponsiveSize(18),
                fontFamily: 'Roboto-Medium',
              }}>
              Location : {taskData?.restroom_id}
            </Text>
            <Text
              style={{
                color: '#419833',
                fontSize: ResponsiveSize(18),
                fontFamily: 'Roboto-Regular',
              }}>
              {dueDate}
            </Text>
            <Text></Text>
          </View>
          <View style={{justifyContent: 'space-between', marginTop: hp('3%')}}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Roboto-Regular',
                fontSize: ResponsiveSize(15),
              }}>
              Status
            </Text>
            <TextInput
              placeholder="Select ID"
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
          </View>
          <View style={{justifyContent: 'space-between', marginTop: hp('4%')}}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Roboto-Regular',
                fontSize: ResponsiveSize(15),
              }}>
              Restroom ID
            </Text>
            <TextInput
              placeholder="Remark"
              placeholderTextColor={'grey'}
              value={remark}
              onChangeText={setRemark}
              style={{
                borderWidth: 0.5,
                color: '#000000',
                borderColor: '#C4C4C4',
                marginTop: ResponsiveSize(5),
                borderRadius: ResponsiveSize(2),
              }}
            />
          </View>
          <View style={{marginTop: ResponsiveSize(10)}}>
            <Text
              style={{
                color: '#000000',
                fontSize: ResponsiveSize(18),
                fontFamily: 'Roboto-Medium',
              }}>
              Upload photos after work
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: ResponsiveSize(5),
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
              onPress={() => openImagePicker(setPickedImage)}
                style={{
                  width: ResponsiveSize(104),
                  height: ResponsiveSize(87),
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                
                <Image
                  style={ pickerImage === "" ?{
                    width: ResponsiveSize(24),
                    height: ResponsiveSize(24),
                  } : {
                    width:"100%",
                    height:"100%"
                  }}
                  source={pickerImage !== ''
                  ? { uri: pickerImage?.uri  }
                  : previousImages.length > 0 
                 ?{ uri: previousImages[previousImages.length - 1]?.image_blob }
                  : IMAGES.cameraIcon}
                  resizeMode="contain"></Image>
                  {
                    pickerImage === "" && 
                    <Text
                    style={{
                      color: '#515151',
                      fontFamily: 'Roboto-Light',
                      fontSize: ResponsiveSize(14),
                    }}>
                    Upload Photos
                  </Text>
                  }
               
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => openImagePicker(setPickedImage2)}
                style={{
                  width: ResponsiveSize(104),
                  height: ResponsiveSize(87),
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Image
                  style={ pickerImage2 === "" ?{
                    width: ResponsiveSize(24),
                    height: ResponsiveSize(24),
                  } : {
                    width:"100%",
                    height:"100%"
                  }}
                  source={pickerImage2 !== ''
                  ? { uri: pickerImage2?.uri  }
                  : previousImages.length > 0 
                 ?{ uri: previousImages[previousImages.length - 2]?.image_blob }
                  : IMAGES.cameraIcon}
                  resizeMode="contain"></Image>
                  {
                    pickerImage2 === "" && 
                    <Text
                    style={{
                      color: '#515151',
                      fontFamily: 'Roboto-Light',
                      fontSize: ResponsiveSize(14),
                    }}>
                    Upload Photos
                  </Text>
                  }
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => openImagePicker(setPickedImage3)}
                style={{
                  width: ResponsiveSize(104),
                  height: ResponsiveSize(87),
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
               <Image
                  style={ pickerImage3 === "" ?{
                    width: ResponsiveSize(24),
                    height: ResponsiveSize(24),
                  } : {
                    width:"100%",
                    height:"100%"
                  }}
                  source={pickerImage3 !== ''
                  ? { uri: pickerImage3?.uri  }
                  : previousImages.length > 0 
                 ?{ uri: previousImages[previousImages.length - 2]?.image_blob }
                  : IMAGES.cameraIcon}
                  resizeMode="contain"></Image>
                  {
                    pickerImage3 === "" && 
                    <Text
                    style={{
                      color: '#515151',
                      fontFamily: 'Roboto-Light',
                      fontSize: ResponsiveSize(14),
                    }}>
                    Upload Photos
                  </Text>
                  }
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: ResponsiveSize(5),
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
              onPress={() => openImagePicker(setPickedImage4)}
                style={{
                  width: ResponsiveSize(104),
                  height: ResponsiveSize(87),
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
              <Image
                  style={ pickerImage4 === "" ?{
                    width: ResponsiveSize(24),
                    height: ResponsiveSize(24),
                  } : {
                    width:"100%",
                    height:"100%"
                  }}
                  source={pickerImage4 !== ''
                  ? { uri: pickerImage4?.uri  }
                  : previousImages.length > 0 
                 ?{ uri: previousImages[previousImages.length - 4]?.image_blob }
                  : IMAGES.cameraIcon}
                  resizeMode="contain"></Image>
                  {
                    pickerImage4 === "" && 
                    <Text
                    style={{
                      color: '#515151',
                      fontFamily: 'Roboto-Light',
                      fontSize: ResponsiveSize(14),
                    }}>
                    Upload Photos
                  </Text>
                  }
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => openImagePicker(setPickedImage5)}
                style={{
                  width: ResponsiveSize(104),
                  height: ResponsiveSize(87),
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
               <Image
                  style={ pickerImage5 === "" ?{
                    width: ResponsiveSize(24),
                    height: ResponsiveSize(24),
                  } : {
                    width:"100%",
                    height:"100%"
                  }}
                  source={pickerImage5 !== ''
                  ? { uri: pickerImage5?.uri  }
                  : previousImages.length > 0 
                 ?{ uri: previousImages[previousImages.length - 1]?.image_blob }
                  : IMAGES.cameraIcon}
                  resizeMode="contain"></Image>
                  {
                    pickerImage5 === "" && 
                    <Text
                    style={{
                      color: '#515151',
                      fontFamily: 'Roboto-Light',
                      fontSize: ResponsiveSize(14),
                    }}>
                    Upload Photos
                  </Text>
                  }
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => openImagePicker(setPickedImage6)}
                style={{
                  width: ResponsiveSize(104),
                  height: ResponsiveSize(87),
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={ pickerImage6 === "" ?{
                    width: ResponsiveSize(24),
                    height: ResponsiveSize(24),
                  } : {
                    width:"100%",
                    height:"100%"
                  }}
                  source={pickerImage6 !== ''
                  ? { uri: pickerImage6?.uri  }
                  : previousImages.length > 0 
                 ?{ uri: previousImages[previousImages.length - 6]?.image_blob }
                  : IMAGES.cameraIcon}
                  resizeMode="contain"></Image>
                  {
                    pickerImage6 === "" && 
                    <Text
                    style={{
                      color: '#515151',
                      fontFamily: 'Roboto-Light',
                      fontSize: ResponsiveSize(14),
                    }}>
                    Upload Photos
                  </Text>
                  }
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{flexDirection: 'row', marginTop: ResponsiveSize(5)}}>
            <TouchableOpacity
            onPress={() => openImagePicker(setPickedImage7)}
                style={{
                  width: ResponsiveSize(104),
                  height: ResponsiveSize(87),
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={ pickerImage7 === "" ?{
                    width: ResponsiveSize(24),
                    height: ResponsiveSize(24),
                  } : {
                    width:"100%",
                    height:"100%"
                  }}
                  source={pickerImage7 !== ''
                  ? { uri: pickerImage7?.uri  }
                  : previousImages.length > 0 
                 ?{ uri: previousImages[previousImages.length - 7]?.image_blob }
                  : IMAGES.cameraIcon}
                  resizeMode="contain"></Image>
                  {
                    pickerImage7 === "" && 
                    <Text
                    style={{
                      color: '#515151',
                      fontFamily: 'Roboto-Light',
                      fontSize: ResponsiveSize(14),
                    }}>
                    Upload Photos
                  </Text>
                  }
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => openImagePicker(setPickedImage8)}
                style={{
                  width: ResponsiveSize(104),
                  height: ResponsiveSize(87),
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
               <Image
                  style={ pickerImage8 === "" ?{
                    width: ResponsiveSize(24),
                    height: ResponsiveSize(24),
                  } : {
                    width:"100%",
                    height:"100%"
                  }}
                  source={pickerImage8 !== ''
                  ? { uri: pickerImage8?.uri  }
                  : previousImages.length > 0 
                 ?{ uri: previousImages[previousImages.length - 8]?.image_blob }
                  : IMAGES.cameraIcon}
                  resizeMode="contain"></Image>
                  {
                    pickerImage8 === "" && 
                    <Text
                    style={{
                      color: '#515151',
                      fontFamily: 'Roboto-Light',
                      fontSize: ResponsiveSize(14),
                    }}>
                    Upload Photos
                  </Text>
                  }
              </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
              onPress={() => UploadPhotos()}
              style={styles.button}>
              <Text
                style={{
                  fontSize: ResponsiveSize(20),
                  color: '#FEFEFE',
                  // fontWeight: 'bold',
                }}>
                { loading ?<ActivityIndicator/> :  "Submit"}
              </Text>
            </TouchableOpacity>
        </View>
   
      </ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            props.navigation.navigate('Home');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <View style={{flexDirection: 'row'}}>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text
                  style={{
                    color: 'black',
                    marginLeft: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Loading !
                </Text>
              </View>
              <Text style={{color: 'black', marginTop: 10, fontWeight: '400'}}>
                Fetching your Location.Please Wait
              </Text>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={locationModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setLocationModal(!locationModal);
            props.navigation.navigate('Home');
          }}>
          <View style={styles.newModalView}>
   
            <View style={styles.subModalView}>
            <View style={{width:ResponsiveSize(88) , height:ResponsiveSize(88) , alignItems:"center" , backgroundColor:"#ffffff" , position:"a"}}>

</View>
          
            <Text
                  style={{
                    color: '#000000',
                    fontSize: ResponsiveSize(16),
                    fontFamily : "Roboto-Semibold"
                  }}>
                  Hello , Your location matched successfully
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: ResponsiveSize(14),
                    fontFamily : "Roboto-Medium",
                    marginTop:ResponsiveSize(15),
                    textAlign:"center"
                  }}>
                  Location : PCMC Building
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: ResponsiveSize(14),
                    fontFamily : "Roboto-Medium",
                    textAlign:"center",
                    marginTop:5
                  }}>
                  Due time : 14:31:23
                </Text>
                <TouchableOpacity onPress={() => setLocationModal(false)}>
                <Text style={{color: '#419833', marginTop: 10, fontFamily:"Roboto-Medium" , textAlign:"right"}}>
                OK
              </Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                
              </View>
             
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#000000B0',
  },
  newModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000B0',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: wp('85%'),
    height: hp('20%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  subModalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    height: ResponsiveSize(45),
    borderRadius: ResponsiveSize(5),
    alignItems: 'center',
    marginTop: ResponsiveSize(50),
    marginBottom:ResponsiveSize(200),
    backgroundColor: '#397421',
    justifyContent: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },

  buttonUpload: {
    // flexDirection: 'row',
    width: '40%',
    height: ResponsiveSize(44),
    borderRadius: ResponsiveSize(22),
    alignItems: 'center',
    marginTop: ResponsiveSize(50),
    backgroundColor: '#1f51e5',
    justifyContent: 'center',
    marginBottom: hp('4%'),
  },
  circleContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
});
export default NewRestroom;
