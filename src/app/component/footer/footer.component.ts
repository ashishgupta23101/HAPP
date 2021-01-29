import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController) { }

  tabreg: string = localStorage.getItem('IsLogin') === 'true' ? 'welcome' : 'not-register';
  ngOnInit() {
    this.setActiveClass();
  }
  setActiveClass() {
    const cusHome = localStorage.getItem('currPage');
    switch (cusHome) {
        case 'tp':
              $('.home_tab_icon').addClass('tab-selected');
              $('.dropbox_tab_icon').removeClass('tab-selected');
              $('.report_tab_icon').removeClass('tab-selected');
              $('.setting_tab_icon').removeClass('tab-selected');
              break;
                case 'lp':
                  $('.home_tab_icon').removeClass('tab-selected');
                  $('.dropbox_tab_icon').addClass('tab-selected');
                  $('.report_tab_icon').removeClass('tab-selected');
                  $('.setting_tab_icon').removeClass('tab-selected');
                  break;
                  case 'rp':
                      $('.home_tab_icon').removeClass('tab-selected');
                      $('.dropbox_tab_icon').removeClass('tab-selected');
                      $('.report_tab_icon').addClass('tab-selected');
                      $('.setting_tab_icon').removeClass('tab-selected');
                      break;
                      case 'sp':
                        $('.setting_tab_icon').addClass('tab-selected');
                        $('.home_tab_icon').removeClass('tab-selected');
                        $('.dropbox_tab_icon').removeClass('tab-selected');
                        $('.report_tab_icon').removeClass('tab-selected');
                        $('.setting_tab_icon').addClass('tab-selected');
                        break;
                        case 'ml':
                        $('.mail_tab_icon').addClass('tab-selected');
                        $('.home_tab_icon').removeClass('tab-selected');
                        $('.dropbox_tab_icon').removeClass('tab-selected');
                        $('.report_tab_icon').removeClass('tab-selected');
                        $('.mail_tab_icon').addClass('tab-selected');
                        break;
                      default:
                        $('.home_tab_icon').addClass('tab-selected');
                        $('.dropbox_tab_icon').removeClass('tab-selected');
                        $('.report_tab_icon').removeClass('tab-selected');
                        $('.setting_tab_icon').removeClass('tab-selected');
    }
  }
  NavMethod(nav: string) {
    switch(nav) {
          case 'home':
            localStorage.setItem('currPage', 'tp');
            this.homePageRedirect();
              break;
              case 'listing':
                  localStorage.setItem('currPage', 'lp');
                  this.navCtrl.navigateForward(`/listing`);
                  break;
                  case 'splash':
                      localStorage.setItem('currPage', 'rp');
                      this.navCtrl.navigateForward(`/splash`);
                      break;
                      case 'not-register':
                          localStorage.setItem('currPage', 'sp');
                          this.navCtrl.navigateForward(`/not-register`);
                          break;
                          case 'welcome':
                            localStorage.setItem('currPage', 'sp');
                            this.navCtrl.navigateForward(`/welcome`);
                            break;
                            case 'mail':
                              localStorage.setItem('currPage', 'ml');
                              this.navCtrl.navigateForward(`/listing-retailer`);
                              break;
    }
    this.setActiveClass();
  }
  ionViewDidEnter(){
    this.setActiveClass();
  }
  homePageRedirect() {
    const cusHome = localStorage.getItem('cusHome');
    switch (cusHome) {
          case 'tp':
            case 'sp':
              this.navCtrl.navigateForward(`/home`);
              break;
              case 'ap':
                case 'hp':
                  this.navCtrl.navigateForward(`/listing`);
                  break;
                  case 'gr':
                      this.navCtrl.navigateForward(`/splash`);
                      break;
                      default:
                          this.navCtrl.navigateForward(`/home`);
                          break;
    }
  }
}
