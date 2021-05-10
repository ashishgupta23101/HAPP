import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackingService } from './providers/tracking.service';
import { FunctionsService } from './providers/functions.service';
import { FcmService } from './providers/fcm.service';
import { IonicStorageModule } from '@ionic/storage';
import { LoaderService } from './providers/loader.service';
import { Device } from '@ionic-native/device/ngx';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Network } from '@ionic-native/network/ngx';
import { TabsPageModule } from './tabs/tabs.module';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SharedModule } from './public/shared/shared.module';
//import { fancyAnimation } from './animations';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AuthGuard } from './auth-guard';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    TabsPageModule,SharedModule,
    IonicStorageModule.forRoot({
    name: '__mydb',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
  }),
  //AngularFireModule.initializeApp(environment.firebase),
  //AngularFireAuthModule,
    ReactiveFormsModule, IonicModule.forRoot({
     // navAnimation: fancyAnimation
    }),
    AppRoutingModule
  ],
  providers: [
    Platform,
    StatusBar,
    LoaderService,
    BarcodeScanner,
    EmailComposer,
    SocialSharing,
    Device,
    SplashScreen,
    FirebaseX,
    GooglePlus,
    NativeGeocoder,
    //OneSignal,
    AuthGuard,
    Network,
    SplashScreen, TrackingService, FunctionsService, FcmService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
