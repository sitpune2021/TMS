import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Base_Url, Endpoint } from '../utils/Constants';


export const fetchData = createAsyncThunk(
  'fetchData',
  async userCredentials => {
    console.log('userCredentials', userCredentials);
    const res = await axios.post(Base_Url + Endpoint.Login, userCredentials, {
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await res.data;
    AsyncStorage.setItem('userDetail', response);
    return response;
  },
);

export const addEmployee = createAsyncThunk(
  'addEmployee',
  async userCredentials => {
    const res = await axios.post(
      Base_Url + Endpoint.addEmployee,
      userCredentials,
      { headers: { 'Content-Type': 'application/json' } },
    );
    const response = await res.data;
    return response;
  },
);

export const workAssign = createAsyncThunk(
  'workAssign',
  async userCredentials => {
    const res = await axios.post(
      Base_Url + Endpoint.assignWork,
      userCredentials,
      { headers: { 'Content-Type': 'application/json' } },
    );
    const response = await res.data;
    return response;
  },
);

export const updateAssignedWork = createAsyncThunk(
  'updateAssignedWork',
  async (userCredentials) => {
    console.log('update task of the employee', userCredentials);
    const res = await axios.put(
      Base_Url + Endpoint.updateAssignedWork + userCredentials?.assignID,
      userCredentials?.EmployeeDetail,
      { headers: { 'Content-Type': 'application/json' } },
    );
    const response = await res.data;
    return response;
  },
);


export const editEmployee = createAsyncThunk(
  'editEmployee',
  async (userCredentials) => {
    console.log('UPDATE THE EMPLOYEEE===========', userCredentials?.EmployeeDetail, userCredentials?.employee_id);
    console.log('BASE URL =======', userCredentials?.EmployeeDetail);


    const res = await axios.put(Base_Url + Endpoint.updateEmployee + userCredentials?.employee_ID, userCredentials?.EmployeeDetail, {
      headers: { 'Content-Type': 'application/json' },
    }
    );
console.log("resss here is" , res)
    const response = await res.data; 
    console.log(response, "otp vghfgherified------------>>>>>>>>>>")

    return response;
  },
);


export const deleteEmployee = createAsyncThunk(
  'deleteEmployee',
  async userCredentials => {
    console.log('ADD THE EMPLOYEEE===========', userCredentials);
    const res = await axios.delete(
      Base_Url + Endpoint.deleteEmployee + userCredentials,
    );
    const response = await res.data;
    // console.log(response , "otp verified------------>>>>>>>>>>")

    return response;
  },
);


export const getLocation = createAsyncThunk('getLocation', async (userCredentials) => {
  const res = await axios.get(
    Base_Url + Endpoint.getLocation + userCredentials,
    { headers: { 'Content-Type': 'application/json' } },
  );
  const response = await res.data;
  console.log(response, "otp verified------------>>>>>>>>>>")

  return response;
},
);

export const getAllLocation = createAsyncThunk('getAllLocation', async () => {
  const res = await axios.get(
    Base_Url + Endpoint.getAllLocation ,
    { headers: { 'Content-Type': 'application/json' } },
  );
  const response = await res.data;
  console.log(response, "otp verified------------>>>>>>>>>>")

  return response;
},
);

export const getAllEmployeeLocationInVendor = createAsyncThunk('getAllEmployeeLocationInVendor', async (userCredentials) => {
  const res = await axios.get(
    Base_Url + Endpoint.getAllEmployeeLocationInVendor + userCredentials,
    { headers: { 'Content-Type': 'application/json' } },
  );
  const response = await res.data;
  console.log(response, "otp verified------------>>>>>>>>>>")

  return response;
},
);





export const getAllVendorLocation = createAsyncThunk('getAllVendorLocation', async () => {
  const res = await axios.get(
    Base_Url + Endpoint.getAllVendorLocation , 
    { headers: { 'Content-Type': 'application/json' } },
  );
  const response = await res.data;
  console.log(response, "otp verified------------>>>>>>>>>>")

  return response;
},
);


export const getUserInfo = createAsyncThunk('getUserInfo', async () => {
  const res = await axios.get(
    Base_Url + Endpoint.getUser,
    { headers: { 'Content-Type': 'application/json' } },
  );
  const response = await res.data;
  console.log(response, "console 2")

  return response;
},


);

export const getEmployeeList = createAsyncThunk('getEmployeeList', async (userCredentials) => {
  const res = await axios.get(
    Base_Url + Endpoint.getEmployee + userCredentials,
    { headers: { 'Content-Type': 'application/json' } },
  );
  const response = await res.data;
  console.log(response, "console 2")

  return response;
},
)


export const getEmployeeTask = createAsyncThunk('getEmployeeTask', async (userCredentials) => {
  const res = await axios.get(
    Base_Url + Endpoint.getEmployeeTask + userCredentials,
    { headers: { 'Content-Type': 'application/json' } },
  );
  const response = await res.data;
  console.log(response, "console 2")

  return response;
},
)


export const getAllAssignedTask = createAsyncThunk('getAllAssignedTask', async (userCredentials) => {
  const res = await axios.get(
    Base_Url + Endpoint.getAllAssignedTask + userCredentials,
    { headers: { 'Content-Type': 'application/json' } },
  );
  const response = await res.data;
  console.log(response, "console 2")

  return response;
},
)

export const uploadImages = createAsyncThunk('uploadImages', async (userCredentials) => {
  console.log("formdata recieved------------->>>>."  , userCredentials)
try{
  const res = await axios.post(
    Base_Url + Endpoint.uploadImages , userCredentials,
    { headers: { 'Content-Type': 'multipart/form-data'  } },
  );
  const response = await res.data;
  console.log(response, "console 2")

  return response;
}
catch (error){
  console.log(error , "error")
}

 
},
)

export const uploadFinalImages = createAsyncThunk('uploadFinalImages', async (userCredentials) => {
  console.log("formdata recieved------------->>>>."  , userCredentials)
try{
  const res = await axios.post(
    Base_Url + Endpoint.uploadImages , userCredentials,

    
    { headers: { 'Content-Type': 'multipart/form-data'  } },
  );
  const response = await res.data;
  console.log(response, "console 2")

  return response;
}
catch (error){
  console.log(error , "error")
}

 
},
)

export const getPhotos = createAsyncThunk('getPhotos', async (userCredentials) => {
  console.log("get photos data ========>>>"  , userCredentials)
  
try{
  const url = Base_Url + Endpoint.getPhotos + userCredentials
  console.log("url we are getting here is " , url)
  const res = await axios.get(
    url,
    { headers: { 'Content-Type': 'application/json'  } },
  );
  const response = await res.data;

  return response;
}
catch (error){
  console.log(error , "error")
}

 
},
)