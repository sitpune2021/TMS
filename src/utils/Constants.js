export const Base_Url = "http://103.165.118.71:5000/api/"

export const Endpoint = {
    Login : "login" , 
    addEmployee : "addUser",
    getLocation  : "getVendorInsideLocationById/", 
    getAllLocation : "getLocation",
    getUser : "getUser",
    deleteEmployee : "removeUser/",
    updateEmployee : "updateUser/",
    assignWork : "addEmpoyeeAssignTask",
    getAllVendorLocation : "getAllVendor",
    getEmployee : "getAllEmployeeInVendor/",
    getEmployeeTask :"getSingleEmployeeAssignTask/",
    getAllAssignedTask : "getVendorEmployeeAssignTaskById/",
    updateAssignedWork : "/updateEmpoyeeAssignTask/",
    getAllEmployeeLocationInVendor : "getSingleVendorInsideLocationById/",
    uploadImages : "photo-upload",
    getPhotos : "getSingleEmployeePhoto/",
    getDashboardData : "getRowCounts/",
    getWorkCount : "getRowWorkCounts/"
}

export const Error = {
    passwordEmpty: 'Please enter your password',
    passwordValidate: 'Please enter your valid password',
    mobileEmpty: 'Please enter your mobile No',
    mobileValidate: 'Please enter your valid mobile No',
    otpEmpty: 'Please enter OTP',
    otpValidate: 'Invalid Otp Provide!',
    confPassword: 'Confirm password and New Password must be same',
    passcodeEmpty: 'Please enter Passcode',
    passcodeValidate: 'Invalid Passcode Provide!',
    emailEmpty: 'Please enter your Email ID',
    emailValidate: 'Please enter valid email id',
    userEmpty: 'Please enter your user name',
    passcodeMismatch :"Incorrect Passcode"
  };