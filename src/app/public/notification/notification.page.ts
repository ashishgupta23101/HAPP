import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController) {
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
  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
  }

}
