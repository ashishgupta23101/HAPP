import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-forgot-pass',
  templateUrl: './account-forgot-pass.page.html',
  styleUrls: ['./account-forgot-pass.page.scss'],
})
export class AccountForgotPassPage implements OnInit {

  constructor() { localStorage.setItem('currPage', 'tp');}

  ngOnInit() {
  }

}
