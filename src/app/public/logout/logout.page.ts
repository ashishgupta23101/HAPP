import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }
  logout(){
    localStorage.setItem('expires',null);
    localStorage.setItem('user',null);
    localStorage.setItem('IsLogin', 'false');
    localStorage.setItem('AuthToken',null);
    this.navCtrl.navigateForward('/login');
  }
}
