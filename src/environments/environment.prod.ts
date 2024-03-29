export const environment = {
  production: true,
  //api_Url_Prod: 'https://demo.easytrackapp.com/smtrackingapi/api/',
  api_Url_Prod: 'http://10.1.10.76:8010/api/',
  api_Url_Beta: 'http://10.1.10.46:8010/api/',
  api_gmail : 'https://gmail.googleapis.com/gmail/v1/users/me/',
  api_google_key : 'AIzaSyCCoQU-9vtEeL-MsI-nYRfUXMGh42HrFQo',
  noOfMail: 50,
  oneSignal:{
    appid:'6b292c6d-1bee-48e5-9b72-c00b091c4d45',
    restApikey:'NDQ0NTQ0YjYtY2RmZC00ZWI3LTljZjQtNjZiOGE2OWI4MDc0',
  },
  logErrorMessage: 'LogError',
  tncApi: 'Tracking/Classifier',
  login: 'User/Login',
  deviceLogin: 'User/Device/AccessToken',
  spendingSummary: 'Reports/CategoryWise',
  register: 'User/Register',
  saveConfiguration: 'Configure/notification',
  saveDeviceID: 'GsmRegistration/Save',
  deletePackage : 'Package/Delete',
  archivePackage: 'Package/Archive',
  getAllVendors : 'Vendor/All',
  saveVendor : 'Vendor/Account/Save',
  getAllProviders : 'EmailProvider/All',
  saveEmailAccount : 'EmailProvider/Account/Save',
  delEmailAccount : 'EmailProvider/Account/Delete',
  getAllPackages: 'Package/All',
  refreshToken:'User/Password/ResetToken',
  saveSupport:'HelpSupport/LogMessage',
  demoregister: 'User/DemoRegister',
  trackingAPI: 'Tracking?TrackingNo=@TrackingNo&Carrier=@Carrier&Description=@Description&Residential=@Residential&DeviceNo=@DeviceNo&AppUser=ShipMatrixApp&AppPwd=ShipMatrixApp&RegistrationId=@RegistrationId',
  firebase: {
    apiKey: 'AIzaSyB33vRTWxyjeYy3q-iuLykvTPkHb-xteq4',
    authDomain: 'eztrack-50025.firebaseapp.com',
    databaseURL: 'https://eztrack-50025.firebaseio.com',
    projectId: 'eztrack-50025',
    storageBucket: 'eztrack-50025.appspot.com',
    messagingSenderId: '619491163084',
    appId: '1:619491163084:ios:6889ae55f18bacd093fb69'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
