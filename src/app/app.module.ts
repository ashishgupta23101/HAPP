import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Storage } from '@ionic/storage';
import { Animation } from '@ionic/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackingService } from './providers/tracking.service';
import { FunctionsService } from './providers/functions.service';
import { FcmService } from './providers/fcm.service';
import { IonicStorageModule } from '@ionic/storage';
import { LoaderService } from './providers/loader.service';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Network } from '@ionic-native/network/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TabsPageModule } from './tabs/tabs.module';
import { SharedModule } from './public/shared/shared.module';
import { fancyAnimation } from './animations';
import { AuthGuard } from './auth-guard';

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
    ReactiveFormsModule, IonicModule.forRoot({
      navAnimation: fancyAnimation
    }), AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [
    Platform,
    StatusBar,
    LoaderService,
    BarcodeScanner,
    SocialSharing,
    Device,
    SplashScreen,
    NativeGeocoder,
    Firebase,
    AuthGuard,
    FCM,
    Network, InAppBrowser,
    SplashScreen, TrackingService, FunctionsService, FcmService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
