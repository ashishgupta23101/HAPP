import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-have-question',
  templateUrl: './have-question.page.html',
  styleUrls: ['./have-question.page.scss'],
})
export class HaveQuestionPage implements OnInit {

  constructor(@Inject(NavController) private navCtrl: NavController,) { }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
