import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingScans } from 'src/app/models/TrackingScans';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MapLocations } from 'src/app/models/MapLocations';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TrackingService } from 'src/app/providers/tracking.service';
import * as $ from 'jquery';
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';
import { ActivePackages } from 'src/app/models/active-packages';
declare var google;
@Component({
  selector: 'app-product-activity',
  templateUrl: './product-activity.page.html',
  styleUrls: ['./product-activity.page.scss'],
})
export class ProductActivityPage implements OnInit {

  @ViewChild(SocialSharingComponent) social: SocialSharingComponent;
  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(NavController) private navCtrl: NavController,
    @Inject(Platform) public platform: Platform,
    @Inject(LoaderService) public loading: LoaderService,
    @Inject(TrackingService) private trackService: TrackingService ,
    @Inject(NativeGeocoder) public nativeGeocoder: NativeGeocoder) {

        this.route.queryParams.subscribe(params => {
        this.trackingScans = JSON.parse(params.scans);
        this.item = JSON.parse(params.item);
        this.height = platform.height() - 56;
        this.getLocations();
      });
    }

  @ViewChild('map')
  item: ActivePackages;
  mapContainer: ElementRef;
  map: any;
  trackingScans: Array<TrackingScans> = [];
  height = 0;
  lat: any;
  lng: any;
  isLoaded = false;
  isError = false;
  locations: Array<MapLocations> = [];

  markersArray = [];

  ngOnInit()    {
    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function(){
      // tslint:disable-next-line: only-arrow-functions
      $('#openActivity').click(function(){
          $('#actdiv').addClass('toggleactive');
      });
  });
   // this.getLocations();
  }
  displayGoogleMap(loc: any) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)},
      disableDefaultUI: true,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  }

  addMarkersToMap(loc: any) {
    const marker = new google.maps.Marker({
      map: this.map,
      position: {lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)},
      title: loc.location,
      icon: {
        url: loc.url
      }
    });

    // store the marker object drawn in global array
    this.markersArray.push(marker);
  }

  goBack() {
    this.navCtrl.back();
  }

  reloadMap(){
    this.isLoaded = false;
    this.isError = false;
    this.getLocations();
    // this.loading.dismiss();
  }
  share() {
    this.social.presentActionSheet2();
    }
  getLocations() {

    try{
      this.locations = new Array<MapLocations>();
      // tslint:disable-next-line: only-arrow-functions
      const min = new Date(Math.min.apply(null, this.trackingScans.map(function(e){return new Date(e.scanDateTime); })));
      // tslint:disable-next-line: only-arrow-functions
      const max = new Date(Math.max.apply(null, this.trackingScans.map(function(e){return new Date(e.scanDateTime); })));
      // alert(min +'-'+max);
      for (const scan of this.trackingScans){
        if (scan.location !== undefined && scan.location !== null && scan.location !== '')
{        this.nativeGeocoder.forwardGeocode(scan.location)
        .then((coordinates: NativeGeocoderResult[]) => {
              const locs = new MapLocations();
              locs.latitude = coordinates[0].latitude;
              locs.longitude = coordinates[0].longitude;
              locs.location = scan.location;
              if (scan.scanDateTime !== undefined && scan.scanDateTime !== null && scan.scanDateTime !== ''){
              const scantime = new Date(scan.scanDateTime);
              if ( scantime.getTime() === max.getTime()){
                        locs.url = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                        // .getalert(JSON.stringify(locs));
                      }else if ( scantime.getTime() === min.getTime()){
                        locs.url = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                       // alert(JSON.stringify(locs));
                      }
                      else{
                        locs.url = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                        // alert(JSON.stringify(locs));
                      }

              }
              else{
                locs.url = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                // alert(JSON.stringify(locs));
              }
              // this.trackService.logError(JSON.stringify(locs),'Location');
              this.locations.push(locs);
              if (this.locations.length === 1){
               this.displayGoogleMap(locs);
              }
              this.addMarkersToMap(locs);
             // i = i+1;
              this.isError = false;
        })
        .catch((error: any) =>  {
 // i=i+1;
          this.isError = true;
          this.trackService.logError(scan.location + ' - ' + JSON.stringify(error), 'Map Viewer');
              // this.goBack();
              // if(i === this.trackingScans.length - 1) {}//query
        });
      }
      }
    }
    catch (Exception) {
      this.isError = true;
      this.trackService.logError(JSON.stringify(Exception), 'Map Viewer');
      this.loading.presentToast('Error', 'Something went wrong!');

    }
    finally{
      // this.loadmap();
    }
  }
}
