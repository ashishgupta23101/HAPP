import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
import { Location } from "@angular/common";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentRoute : any
  constructor(
    @Inject(NavController) private navCtrl: NavController,
    @Inject(Location) private location: Location) {
    
    
     }
  username = localStorage.getItem('user');

  tabreg: string = (this.username === null || this.username === 'null' || this.username === undefined || this.username === '') ? 'not-register' : 'welcome';
  ngOnInit() {
    this.setActiveClass();
  }
  setActiveClass() {
    const currPage = this.location.path();
    switch (currPage) {
        case '/home':
              $('.home_tab_icon').addClass('tab-selected');
              $('.dropbox_tab_icon').removeClass('tab-selected');
              $('.report_tab_icon').removeClass('tab-selected');
              $('.setting_tab_icon').removeClass('tab-selected');
              break;
                case '/listing':
                  $('.home_tab_icon').removeClass('tab-selected');
                  $('.dropbox_tab_icon').addClass('tab-selected');
                  $('.report_tab_icon').removeClass('tab-selected');
                  $('.setting_tab_icon').removeClass('tab-selected');
                  break;
                  case '/splash':
                      $('.home_tab_icon').removeClass('tab-selected');
                      $('.dropbox_tab_icon').removeClass('tab-selected');
                      $('.report_tab_icon').addClass('tab-selected');
                      $('.setting_tab_icon').removeClass('tab-selected');
                      break;
                      case '/not-register':
                        case '/welcome':
                        $('.setting_tab_icon').addClass('tab-selected');
                        $('.home_tab_icon').removeClass('tab-selected');
                        $('.dropbox_tab_icon').removeClass('tab-selected');
                        $('.report_tab_icon').removeClass('tab-selected');
                        $('.setting_tab_icon').addClass('tab-selected');
                        break;
                      default:
                        $('.home_tab_icon').removeClass('tab-selected');
                        $('.dropbox_tab_icon').removeClass('tab-selected');
                        $('.report_tab_icon').removeClass('tab-selected');
                        $('.setting_tab_icon').removeClass('tab-selected');
    }
  }
  NavMethod(nav: string) {
    switch(nav) {
          case 'home':
            this.homePageRedirect();
              break;
              case 'listing':
                  this.setActiveClass();
                  this.navCtrl.navigateForward(`/listing`);
                  break;
                  case 'splash':
                      this.setActiveClass();
                      this.navCtrl.navigateForward(`/splash`);
                      break;
                      case 'not-register':
                          this.setActiveClass();
                          this.navCtrl.navigateForward(`/not-register`);
                          break;
                          case 'welcome':
                            this.setActiveClass();
                            this.navCtrl.navigateForward(`/welcome`);
                            break;
                            case 'mail':
                              this.setActiveClass();
                              this.navCtrl.navigateForward(`/listing-retailer`);
                              break;
    }

  }
  ionViewDidEnter(){
    this.setActiveClass();
  }
  homePageRedirect() {
    const cusHome = localStorage.getItem('cusHome');
    switch (cusHome) {
          case 'tp':
            case 'sp':
              this.setActiveClass();
              this.navCtrl.navigateForward(`/home`);
              break;
              case 'ap':
                case 'hp':
                  this.setActiveClass();
                  this.navCtrl.navigateForward(`/listing`);
                  break;
                  case 'gr':
                    this.setActiveClass();
                      this.navCtrl.navigateForward(`/splash`);
                      break;
                      default:
                        this.setActiveClass();
                          this.navCtrl.navigateForward(`/home`);
                          break;
    }
  }
}
