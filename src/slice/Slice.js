import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Alert} from 'react-native';
import {Base_Url, EndPoint} from '../Utility/Api';
import { addEmployee, deleteEmployee, editEmployee, fetchData, getAllAssignedTask, getAllEmployeeLocationInVendor, getAllLocation, getAllVendorLocation, getDashboard, getEmployeeList, getEmployeeTask, getLocation, getPhotos, getUserDetail, getUserInfo, getWorkCount, resetPassword, sendOtp, updateAssignedWork, uploadFinalImages, uploadImages, verifyOtp, workAssign } from './ApiCalling';

const Slice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    loading: false,
    error: null,
    active: true,
    data: null,
    userInfo : null,
    employeInfo : null,
    deleteStatus : null,
    editStatus : null,
    assignedTask : null,
    vendorLocation : null ,
    employeeData : null,
    taskData : null,
    AllTaskData : null,
    updatedTaskData : null , 
    allLocation: null ,
    locationData: null ,
    imageStatus : null,
    uploading: false,
    uploadError: null,
    uploadResponse: null,
    uploadedPhotos: null,
    dashboardCount : null , 
    workCount : null

  },
  extraReducers: builder => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(addEmployee.pending, (state, action) => {
      state.loading = true;
      state.employeInfo = null;
      state.error = null;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employeInfo = action.payload;
      state.error = null;
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.loading = false;
      state.employeInfo = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.userInfo = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getLocation.pending, (state, action) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getLocation.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(deleteEmployee.pending, (state, action) => {
      state.loading = true;
      state.deleteStatus = null;
      state.error = null;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteStatus = action.payload;
      state.error = null;
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.deleteStatus = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(workAssign.pending, (state, action) => {
      state.loading = true;
      state.assignedTask = null;
      state.error = null;
    });
    builder.addCase(workAssign.fulfilled, (state, action) => {
      state.loading = false;
      state.assignedTask = action.payload;
      state.error = null;
    });
    builder.addCase(workAssign.rejected, (state, action) => {
      state.loading = false;
      state.assignedTask = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(editEmployee.pending, (state, action) => {
      state.loading = true;
      state.editStatus = null;
      state.error = null;
    });
    builder.addCase(editEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.editStatus = action.payload;
      state.error = null;
    });
    builder.addCase(editEmployee.rejected, (state, action) => {
      state.loading = false;
      state.editStatus = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getAllVendorLocation.pending, (state, action) => {
      state.loading = true;
      state.vendorLocation = null;
      state.error = null;
    });
    builder.addCase(getAllVendorLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.vendorLocation = action.payload;
      state.error = null;
    });
    builder.addCase(getAllVendorLocation.rejected, (state, action) => {
      state.loading = false;
      state.vendorLocation = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getEmployeeList.pending, (state, action) => {
      state.loading = true;
      state.employeeData = null;
      state.error = null;
    });
    builder.addCase(getEmployeeList.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeData = action.payload;
      state.error = null;
    });
    builder.addCase(getEmployeeList.rejected, (state, action) => {
      state.loading = false;
      state.employeeData = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getEmployeeTask.pending, (state, action) => {
      state.loading = true;
      state.taskData = null;
      state.error = null;
    });
    builder.addCase(getEmployeeTask.fulfilled, (state, action) => {
      state.loading = false;
      state.taskData = action.payload;
      state.error = null;
    });
    builder.addCase(getEmployeeTask.rejected, (state, action) => {
      state.loading = false;
      state.taskData = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getAllAssignedTask.pending, (state, action) => {
      state.loading = true;
      state.AllTaskData = null;
      state.error = null;
    });
    builder.addCase(getAllAssignedTask.fulfilled, (state, action) => {
      state.loading = false;
      state.AllTaskData = action.payload;
      state.error = null;
    });
    builder.addCase(getAllAssignedTask.rejected, (state, action) => {
      state.loading = false;
      state.AllTaskData = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(updateAssignedWork.pending, (state, action) => {
      state.loading = true;
      state.updatedTaskData = null;
      state.error = null;
    });
    builder.addCase(updateAssignedWork.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedTaskData = action.payload;
      state.error = null;
    });
    builder.addCase(updateAssignedWork.rejected, (state, action) => {
      state.loading = false;
      state.updatedTaskData = null;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getAllLocation.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.allLocation = action.payload;
      state.error = null;
    });
    builder.addCase(getAllLocation.rejected, (state, action) => {
      state.loading = false;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getAllEmployeeLocationInVendor.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllEmployeeLocationInVendor.fulfilled, (state, action) => {
      state.loading = false;
      state.locationData = action.payload;
      state.error = null;
    });
    builder.addCase(getAllEmployeeLocationInVendor.rejected, (state, action) => {
      state.loading = false;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(uploadImages.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadImages.fulfilled, (state, action) => {
      state.loading = false;
      state.imageStatus = action.payload;
      state.error = null;
    });
    builder.addCase(uploadImages.rejected, (state, action) => {
      state.loading = false;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(uploadFinalImages.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadFinalImages.fulfilled, (state, action) => {
      state.loading = false;
      state.uploadResponse = action.payload;
      state.error = null;
    });
    builder.addCase(uploadFinalImages.rejected, (state, action) => {
      state.loading = false;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getPhotos.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.uploadedPhotos = action.payload;
      state.error = null;
    });
    builder.addCase(getPhotos.rejected, (state, action) => {
      state.loading = false;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getDashboard.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardCount = action.payload;
      state.error = null;
    });
    builder.addCase(getDashboard.rejected, (state, action) => {
      state.loading = false;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });
    builder.addCase(getWorkCount.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWorkCount.fulfilled, (state, action) => {
      state.loading = false;
      state.workCount = action.payload;
      state.error = null;
    });
    builder.addCase(getWorkCount.rejected, (state, action) => {
      state.loading = false;
      console.log('inside the errror', state);
      if (action.error.message === 'Request failed with status code 400') {
        state.error = 'Access Denied! Invalid Credentials';
      } else {
        state.error === action.error.message;
      }
    });


   
   
  
  },
});
export const {toggleOn, toggleOff} = Slice.actions;
export default Slice.reducer;
