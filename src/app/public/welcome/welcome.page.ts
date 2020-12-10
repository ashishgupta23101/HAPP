import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  username ='Not Available';
  constructor() { }

  ngOnInit() {
    this.username = localStorage.getItem('user');
    if (this.username === null || this.username === 'null' || this.username === undefined || this.username === '') {
      this.username = "Not Available";
     }
  }

}
