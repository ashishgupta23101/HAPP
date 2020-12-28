import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-info-model',
  templateUrl: './info-model.component.html',
  styleUrls: ['./info-model.component.scss'],
})
export class InfoModelComponent implements OnInit {

  @Input() status: string;
  @Input() value: string;

  constructor(  @Inject(ModalController) private modalController: ModalController, private params: NavParams) {

  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
