import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/providers/loader.service';

@Component({
  selector: 'app-cus-home',
  templateUrl: './cus-home.page.html',
  styleUrls: ['./cus-home.page.scss'],
})
export class CusHomePage implements OnInit {
  tp: boolean;
  ap: boolean;
  hp: boolean;
  gr: boolean;
  sp: boolean;
cusHome: string;
  constructor(@Inject(NavController) private navCtrl: NavController,
              @Inject(LoaderService) public loadingController: LoaderService ) {
   // alert(localStorage.getItem('cusHome'));

   }
   setPage(cusHm: string , flag: boolean = false){

    switch (cusHm)
    {
      case 'tp':
        if (this.tp === true || flag === true){
          this.tp = true;
          this.ap = false;
          this.hp = false;
          this.gr = false;
          this.sp = false;
          this.cusHome =  cusHm;
        }
        break;
        case 'ap':
          if (this.ap === true || flag === true){
            this.tp = false;
            this.ap = true;
            this.hp = false;
            this.gr = false;
            this.sp = false;
            this.cusHome =  cusHm;
          }
          break;
          case 'hp':
            if (this.hp === true || flag === true){
              this.tp = false;
              this.ap = false;
              this.hp = true;
              this.gr = false;
              this.sp = false;
              this.cusHome =  cusHm;
            }
            break;
            case 'gr':
              if (this.gr === true || flag === true){
                this.tp = false;
                this.ap = false;
                this.hp = false;
                this.gr = true;
                this.sp = false;
                this.cusHome =  cusHm;
              }
              break;
              case 'sp':
                if (this.sp === true || flag === true){
                  this.tp = false;
                  this.ap = false;
                  this.hp = false;
                  this.gr = false;
                  this.sp = true;
                  this.cusHome =  cusHm;
                }
                break;
                default:
                  this.tp = true;
                  this.ap = false;
                  this.hp = false;
                  this.gr = false;
                  this.sp = false;
                  break;

    }
   }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    this.setPage(localStorage.getItem('cusHome'), true);
  }
  chooseHome(event: any, cpage: string){
    this.setPage(cpage);
    // alert(localStorage.getItem('cusHome'));
  }
  save(){
    localStorage.setItem('cusHome', this.cusHome);
    this.loadingController.presentToast('Info', 'Home page saved successfully');
  }
}
