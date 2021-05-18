import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-helpconfirm',
  templateUrl: './helpconfirm.page.html',
  styleUrls: ['./helpconfirm.page.scss'],
})
export class HelpconfirmPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {localStorage.setItem('currPage', 'tp');
  }

}
