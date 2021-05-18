import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-unlink',
  templateUrl: './account-unlink.page.html',
  styleUrls: ['./account-unlink.page.scss'],
})
export class AccountUnlinkPage implements OnInit {

  constructor() { }

  ngOnInit() { localStorage.setItem('currPage', 'tp');
  }

}
