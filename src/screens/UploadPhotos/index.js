
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, PermissionsAndroid, ActivityIndicator, Modal, Pressable, Image, Location, Alert, TouchableOpacity, ScrollView } from 'react-native';
import HeaderComponent from '../../component/HeaderComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IMAGES } from '../../assets';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ResponsiveSize } from '../../utils/ResponsiveSize';
import * as geolib from 'geolib';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchData, getPhotos, uploadImages } from '../../slice/ApiCalling';


const UploadPhotos = (props) => {

  const taskData = props?.route?.params?.item
  const usedID = useSelector(state => state?.user?.user?.user_id)
  console.log(usedID, "data recieved here==>")
  const staticLocation = { latitude: Number(taskData?.lat_details).toFixed(7), longitude: Number(taskData?.long_details).toFixed(7) };
  const [pickerImage, setPickedImage] = useState('');
  const [remark, setRemark] = useState('');
  const [pickerImage2, setPickedImage2] = useState('');
  const [pickerImage3, setPickedImage3] = useState('');
  const [pickerImage4, setPickedImage4] = useState('');
  const [pickerImage5, setPickedImage5] = useState('');
  const [pickerImage6, setPickedImage6] = useState('');
  const [pickerImage7, setPickedImage7] = useState('');
  const [pickerImage8, setPickedImage8] = useState('');
  const [previousImages , setPreviousImages] = useState([])
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const dispatch = useDispatch()
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
  const date = new Date()
  console.log(date , "today date we are recieving")
const getEarlierPhotos = () => {
  dispatch(getPhotos(usedID)).then(result => {
    console.log("result for uploaded photos", result)
    if (result?.payload !== undefined) {
      console.log("consollllllllll")
const sortedImages = result?.payload.filter((item) => item.photo_type === "Before")
setPreviousImages(sortedImages)
    } else {
      setLoading(false);
      Alert.alert("Error uploading Images")
    }
})
}


  useEffect(() => {
getEarlierPhotos()
  },[])
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


  // Define a function to upload images
  const UploadPhotos = async () => {
    const pickerImages = [
      pickerImage, pickerImage2, pickerImage3, pickerImage4, 
      pickerImage5, pickerImage6, pickerImage7, pickerImage8
    ];
      setLoading(true)
      if(previousImages == null){
        const dateToFormat = new Date();
        const formattedDate = moment(dateToFormat).format('YYYY-MM-DD');
        console.log("object", formattedDate)
          console.log("inside the consssssssssss", pickerImage)
          const formData = new FormData();
          formData.append('user_id', usedID);
          formData.append('photo_type', 'Before');
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
              // props.navigation.navigate("FinalPhotos" , previousImages , setPreviousImages)
              setUploadStatus(true)
              setPreviousImages(null)
            } else {
              setLoading(false);
              Alert.alert("Error uploading Images")
            }
          });
      }
      else{
        props.navigation.navigate("FinalPhotos" , {previousImages , setPreviousImages})
        setLoading(false)
      }
 
  };
  console.log("picker image we got", previousImages)
  return (
    <View style={{ backgroundColor: "#fff", height: hp("100%") }}>
      <HeaderComponent props={props} />
      <ScrollView>
        <View style={{ marginTop: hp("4%") }}>

          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Upload Photos</Text>
          <View style={{ justifyContent: "space-between", paddingHorizontal: wp("4%"), marginTop: hp("4%") }}>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
              <TouchableOpacity style={{ height: hp("15%") }} onPress={() => openImagePicker(setPickedImage)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage !== ''
                    ? { uri: pickerImage?.uri  }
                    : previousImages.length > 0 
                   ?{ uri: previousImages[previousImages.length - 1]?.image_blob }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openImagePicker(setPickedImage2)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage2 !== ''
                    ? { uri: pickerImage2?.uri }
                    : previousImages.length > 0 
                   ?{ uri: previousImages[previousImages.length - 2]?.image_blob }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: hp("2%") }}>
              <TouchableOpacity style={{ height: hp("15%") }} onPress={() => openImagePicker(setPickedImage3)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage3 !== ''
                    ? { uri: pickerImage3?.uri }
                    : previousImages.length > 0 
                   ?{ uri: previousImages[previousImages.length - 3]?.image_blob }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openImagePicker(setPickedImage4)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage4 !== ''
                    ? { uri: pickerImage4?.uri }
                    : previousImages.length > 0 
                   ?{ uri: previousImages[previousImages.length - 4]?.image_blob }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: hp("2%") }}>
              <TouchableOpacity style={{ height: hp("15%") }} onPress={() => openImagePicker(setPickedImage5)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage5 !== ''
                    ? { uri: pickerImage5?.uri }
                    : previousImages.length > 0 
                   ?{ uri: previousImages[previousImages.length - 5]?.image_blob }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openImagePicker(setPickedImage6)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage6 !== ''
                    ? { uri: pickerImage6?.uri }
                    : previousImages.length > 0 
                   ?{ uri: previousImages[previousImages.length - 6]?.image_blob }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: hp("2%") }}>
              <TouchableOpacity style={{ height: hp("15%") }} onPress={() => openImagePicker(setPickedImage7)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage7 !== ''
                    ? { uri: pickerImage7?.uri }
                    : previousImages.length > 0 
                   ?{ uri: previousImages[previousImages.length - 7]?.image_blob }
                     :  IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openImagePicker(setPickedImage8)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage8 !== ''
                    ? { uri: pickerImage8?.uri }
                    : previousImages.length > 0 
                   ?{ uri: previousImages[previousImages.length - 8]?.image_blob }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>


            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                UploadPhotos()
              }}
              style={styles.buttonUpload}>
              <Text
                style={{
                  fontSize: ResponsiveSize(16),
                  color: 'white',
                  // fontWeight: 'bold',
                }}>
                {loading ? <ActivityIndicator /> : "Proceed"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonUpload: {
    // flexDirection: 'row',
    width: '40%',
    height: ResponsiveSize(44),
    borderRadius: ResponsiveSize(22),
    alignItems: 'center',
    marginTop: ResponsiveSize(50),
    backgroundColor: '#1f51e5',
    justifyContent: 'center',
    marginBottom: hp("4%")
  },
})
export default UploadPhotos;