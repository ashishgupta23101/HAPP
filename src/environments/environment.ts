// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
// api_Url_Prod: 'https://demo.easytrackapp.com/smtrackingapi/api/',
  api_Url_Prod: 'http://10.1.10.76/smtrackingapi/api/',
  api_Url_Beta: 'http://10.1.10.46/smtrackingapi/api/',
  api_gmail : 'https://gmail.googleapis.com/gmail/v1/users/me/',
  api_google_key : 'AIzaSyCCoQU-9vtEeL-MsI-nYRfUXMGh42HrFQo',
  noOfMail: 50,
  savePreferances: 'SavePreferences',
  logErrorMessage: 'LogErrorMessage',
  tncApi: 'Tracking/Classifier',
  login: 'User/Login',
  register: 'User/Register',
  saveConfiguration: 'SaveConfigure',
  saveDeviceID: 'SaveGsmRegistration',
  deletePackage : 'Package/Delete',
  getAllVendors : '',
  saveVendor : '',
  getAllProviders : '',
  saveEmailAccount : '',
  getAllPackages: 'Package/All',
  refreshToken:'User/RefreshToken',
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
