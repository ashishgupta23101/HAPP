import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
    @Inject(NavController) private navCtrl: NavController) {
    
    
     }
  username = localStorage.getItem('user');

  tabreg: string = (this.username === 'dummyUser' || this.username === null || this.username === 'null' || this.username === undefined || this.username === '') ? 'not-register' : 'welcome';
  ngOnInit() {
    this.setActiveClass();
  }
  setActiveClass() {
    debugger;
    const currPage = localStorage.getItem('currPage');
    switch (currPage) {
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
            this.setActiveClass();
            this.navCtrl.navigateForward(`/home`);
              break;
              case 'listing':
                  localStorage.setItem('currPage', 'lp');
                  this.setActiveClass();
                  this.navCtrl.navigateForward(`/listing`);
                  break;
                  case 'splash':
                      localStorage.setItem('currPage', 'rp');
                      this.setActiveClass();
                      this.navCtrl.navigateForward(`/splash`);
                      break;
                      case 'not-register':
                          localStorage.setItem('currPage', 'sp');
                          this.setActiveClass();
                          this.navCtrl.navigateForward(`/not-register`);
                          break;
                          case 'welcome':
                            localStorage.setItem('currPage', 'sp');
                            this.setActiveClass();
                            this.navCtrl.navigateForward(`/welcome`);
                            break;
    }

  }


}
