import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController) { }

  tabreg: string = localStorage.getItem('IsLogin') === 'true' ? 'welcome' : 'not-register';
  ngOnInit() {}
  NavMethod(nav: string) {
    switch(nav) {
          case 'home':
            this.homePageRedirect();
              break;
              case 'listing':
                  this.navCtrl.navigateForward(`/listing`);
                  break;
                  case 'splash':
                      this.navCtrl.navigateForward(`/splash`);
                      break;
                      case 'not-register':
                          this.navCtrl.navigateForward(`/not-register`);
                          break;
                          case 'welcome':
                            this.navCtrl.navigateForward(`/welcome`);
                            break;
    }
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
