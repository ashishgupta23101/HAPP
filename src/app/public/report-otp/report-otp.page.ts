
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import { NavController, AlertController, MenuController, ModalController } from '@ionic/angular';
import { ActivePackages, Report, SessionData } from 'src/app/models/active-packages';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationExtras, Router } from '@angular/router';
import { QueryParams } from 'src/app/models/QueryParams';
import { TrackingService } from 'src/app/providers/tracking.service';
import * as $ from 'jquery';
import { Chart } from 'chart.js';
import { InfoModelComponent } from 'src/app/component/info-model/info-model.component';
declare var $: any;
import { SocialSharingComponent } from 'src/app/component/social-sharing/social-sharing.component';
@Component({
  selector: 'app-report-otp',
  templateUrl: './report-otp.page.html',
  styleUrls: ['./report-otp.page.scss'],
})
export class ReportOtpPage implements OnInit {
  reportData : Report;

  @ViewChild('pieChart') pieChart;
  bars: any;
  pop_img : string;
  pop_status: any;
  pop_value: any;
  colorArray: any
  constructor(
    @Inject(TrackingService) private trackService: TrackingService,
    @Inject(Router) private router: Router,
    @Inject(ModalController) private modalController: ModalController,
    @Inject(LoaderService) private loading: LoaderService,
    @Inject(AlertController) public alertController: AlertController,
    @Inject(NavController) private navCtrl: NavController ,
    @Inject(MenuController) private menuCtrl: MenuController,
    @Inject(Storage) private storage: Storage) { this.reportData = this.trackService.ReportOTP;

      this.colorArray = ['#ffffff','#795db5','#452092'];
      // this.generateColorArray(5);
      Chart.pluginService.register({
       beforeDraw: function (chart) {
         if (chart.config.options.elements.center) {
           //Get ctx from string
           var ctx = chart.chart.ctx;
           
           //Get options from the center object in options
           var centerConfig = chart.config.options.elements.center;
           var fontStyle = centerConfig.fontStyle || 'Arial';
           var txt = centerConfig.text;
           var color = centerConfig.color || '#000';
           var sidePadding = centerConfig.sidePadding || 20;
           var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
           //Start with a base font of 30px
           ctx.font = "30px " + fontStyle;
           
           //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
           var stringWidth = ctx.measureText(txt).width;
           var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
   
           // Find out how much the font can grow in width.
           var widthRatio = elementWidth / stringWidth;
           var newFontSize = Math.floor(30 * widthRatio);
           var elementHeight = (chart.innerRadius * 2);
   
           // Pick a new font size so it will not be larger than the height of label.
           var fontSizeToUse = Math.min(newFontSize, elementHeight);
   
           //Set font settings to draw it correctly.
           ctx.textAlign = 'center';
           ctx.textBaseline = 'middle';
           var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
           var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
           ctx.font = fontSizeToUse+"px " + fontStyle;
           ctx.fillStyle = color;
           
           //Draw text in center
           ctx.fillText(txt, centerX, centerY);
         }
       }
       // ,
       // afterDraw: function (chart) {   
       //   const images = [];
       //   images.push("https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/apple.png");
       //   images.push("https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/orange.png");
       //   images.push("https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/banana.png");
       //   images.push("https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/mango.png");
       //   images.push("https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/grape.png");
        
       //   var ctx = chart.chart.ctx; 
       //   var xAxis = chart.scales['x-axis-0'];
       //   var yAxis = chart.scales['y-axis-0'];
       //   xAxis.ticks.forEach((value, index) => {  
       //     var x = xAxis.getPixelForTick(index);      
       //     var image = new Image();
       //     image.src = images[index],
       //     ctx.drawImage(image, x - 12, yAxis.bottom + 10);
       //   });      
       // }
     });
   
     }
     ionViewDidEnter() {
      if(this.reportData.total > 0){
        this.createBarChart();}
     }
   
     async presentModal() {
       const modal = await this.modalController.create({
         component: InfoModelComponent,
         cssClass: 'my-custom-modal-css',
         componentProps: {
           'status': 'Delivered',
           'value': '19'
         }
       });
       return await modal.present();
     }
     generateColorArray(num) {
       this.colorArray = [];
       for (let i = 0; i < num; i++) {
         this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
       }
     }
     createBarChart() {
       this.bars = new Chart(this.pieChart.nativeElement, {
         type: 'doughnut',
         data: {
           labels: this.reportData.labels,
           datasets: [{
             label: '',
             data: this.reportData.data,
             backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
             borderColor: '#d7ccef',// array should have same number of elements as number of dataset
             borderWidth: 2
           }]
         },
         options: {
           onClick: (c, i) => {
            
             let e = i[0];
             this.pop_status = this.reportData.labels[e._index];
             this.pop_img = this.pop_status === 'Delivered'?'box2_icon':
             this.pop_status === 'Return'?'help_with_circle_icon':
             this.pop_status === 'InTransit'?'track_icon':'cycle_icon';
             this.pop_value = this.reportData.data[e._index];
   
             $('#modelopen').click();
           },
           layout: {
             padding: {
               bottom: 30,
               right: 15
             }
           },
           elements: {
             center: {
             text: 'Last 30 Days',
             color: '#452092' ,//Default black
             fontStyle: 'Helvetica', //Default Arial
             sidePadding: 15 //Default 20 (as a percentage)
           }
         },
           legend: {
             display: false
           },
           scales: {
             xAxes: [{
               display: false,
               gridLines: {
                   color: "rgba(0, 0, 0, 0)",
               }
             }],
             yAxes: [{
               display: false,
               gridLines: {
                 color: "rgba(0, 0, 0, 0)",
                },
               ticks: {
                 beginAtZero: true
               }
             }]
           }
         }
       });
     }
   
    defaultSelectedRadio = "radio_2";
    //Get value on ionChange on IonRadioGroup
    selectedRadioGroup:any;
    //Get value on ionSelect on IonRadio item
    selectedRadioItem:any;
  public searchTerm = '';
  // tslint:disable-next-line: variable-name
  mainMenu = true;
  carrierMenu = false;
  statusMenu = false;
  dateMenu = false;
  public sortbyDate = 'Date Created';
  public sessionData: any;
  public filtBy: string;
  public segmentModel: string;
  public sortBy;
  public Issidemenu : string = 'Filter';
  public dateSelected: any = formatDate(new Date(), 'MM/dd/yyyy', 'en');
  public activeItems: Array<ActivePackages> =[];
  public searchItems: Array<any> =[];
  filterName = 'Filter by';
  readyToLoad = false;
  @ViewChild(SocialSharingComponent) social: SocialSharingComponent;
  goBack() {
    this.navCtrl.back();
  }

  Carrier = {
    ups: false,
    usps: false,
    dhl: false,
    fedex: false,
    ontrack: false,
    purolator: false
  };
  Status = {
    delivered: false,
    intransit: false,
    return: false
  };
  Date = {
    today: false,
    yesterday: false,
    thisweek: false,
    lastweek: false,
    thismonth: false,
    lastmonth: false
  };
  ngOnInit() {
  
  }
  
  menu(b){
    if (b === 'c'){
      this.filterName = 'Carrier';
      this.carrierMenu = true;
      this.statusMenu = false;
      this.dateMenu = false;
      this.mainMenu = false;
    }
    else if (b === 's'){
      this.filterName = 'Status';
      this.mainMenu = false;
      this.carrierMenu = false;
      this.statusMenu = true;
      this.dateMenu = false;
    }else if (b === 'd'){
      this.filterName = 'Date';
      this.mainMenu = false;
      this.carrierMenu = false;
      this.statusMenu = false;
      this.dateMenu = true;
    }else {
      this.filterName = 'Carrier';
      this.mainMenu = false;
      this.carrierMenu = true;
      this.statusMenu = false;
      this.dateMenu = false;
    }
  }
  radio_list = [
    {name:'Carrier',value:'carr'},
    {name:'Status',value:'stat'},
    {name:'Date',value:'dat'},
    //{name:'Retailer',value:'retail'},
   // {name:'Category',value:'cate'}
  ]
  clearall(){
    this.activeItems = SessionData.packages.All;
    this.Carrier = {
      ups: false,
      usps: false,
      dhl: false,
      fedex: false,
      ontrack: false,
      purolator: false
    };
    this.Status = {
      delivered: false,
      intransit: false,
      return: false
    };
    this.Date = {
      today: false,
      yesterday: false,
      thisweek: false,
      lastweek: false,
      thismonth: false,
      lastmonth: false
    };
    this.menuback();
    this.menuCtrl.toggle();
  }
  radioGroupChange(event) {
  
    this.menuCtrl.toggle();
    this.loading.present('Applying sorting..');
    this.sortBy = event.detail.value;
    this.sortedBy();
  
  }
  
  
  radioSelect(event) {
    console.log("radioSelect",event.detail);
    this.selectedRadioItem = event.detail;
  }
  openMenu(sm : string){
    switch(sm){
    case 'f':
    this.Issidemenu = 'Filter';
    break;
    case 's':
      this.Issidemenu = 'Sort';
      break;
      default :
      this.Issidemenu = 'Filter';
    }
    this.menuCtrl.toggle();
  }
  apply(){
    this.loading.present('Applying filter..');
    debugger;
    try{
    this.searchItems =[];
    this.menuback();
    this.menuCtrl.toggle();
   if(!(this.Carrier.dhl || this.Carrier.ups || this.Carrier.usps || this.Carrier.fedex || this.Carrier.ontrack || this.Carrier.purolator))
    { 
      if(!(this.Status.delivered || this.Status.intransit || this.Status.return))
      {
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth);
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek);
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth);
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek);
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today);
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday);
           }
        }
      }else{
        if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
       { 
        if (this.Status.delivered){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Status.toLowerCase().includes('deliver')));
        }
        if (this.Status.intransit){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
             u.Status.toLowerCase().includes('transit')));
        }
        if (this.Status.return){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Status.toLowerCase().includes('return')));
        }
        
      }else{
      if (this.Status.delivered){ 
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
              u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
              u.Status.toLowerCase().includes('deliver')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Status.toLowerCase().includes('deliver')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Status.toLowerCase().includes('deliver')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Status.toLowerCase().includes('deliver')));
           }
        }
      }
      if (this.Status.intransit){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
              u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Status.toLowerCase().includes('transit')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
              u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
              u.Status.toLowerCase().includes('transit')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
              u.Status.toLowerCase().includes('transit')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
            u.Status.toLowerCase().includes('transit')));
           }
        }
      }
      if (this.Status.return){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
              u.Status.toLowerCase().includes('return')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
              u.Status.toLowerCase().includes('return')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
              u.Status.toLowerCase().includes('return')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Status.toLowerCase().includes('return')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
              u.Status.toLowerCase().includes('return')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
              u.Status.toLowerCase().includes('return')));
           }
        }
      }
    }
    }
      
    }else{
    if (this.Carrier.dhl){
      if(!(this.Status.delivered || this.Status.intransit || this.Status.return))
      {this.searchItems.push(this.sessionData.packages.All.filter(u =>
        u.Carrier?.toLowerCase().includes('d')));
      }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
      { 
        if (this.Status.delivered){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
        }
        if (this.Status.intransit){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
        }
        if (this.Status.return){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('return')));
        }
        
      }else{
      if (this.Status.delivered){ 
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('deliver')));
           }
        }
      }
      if (this.Status.intransit){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('transit')));
           }
        }
      }
      if (this.Status.return){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('return')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('return')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('return')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('d') && u.Status.toLowerCase().includes('return')));
           }
        }
      }
    }
    }     
    if (this.Carrier.ups){
      if(!(this.Status.delivered || this.Status.intransit || this.Status.return))
      {this.searchItems.push(this.sessionData.packages.All.filter(u =>
        u.Carrier.toLowerCase().includes('u')));
      }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
      { 
        if (this.Status.delivered){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
        }
        if (this.Status.intransit){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
        }
        if (this.Status.return){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('return')));
        }
        
      }else{
      if (this.Status.delivered){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('deliver')));
           }
        }
      }
      if (this.Status.intransit){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('transit')));
           }
        }
      }
      if (this.Status.return){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('return')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('return')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('return')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('u') && u.Status.toLowerCase().includes('return')));
           }
        }
      }}
    }
    if (this.Carrier.usps){
      if(!(this.Status.delivered || this.Status.intransit || this.Status.return))
      {this.searchItems.push(this.sessionData.packages.All.filter(u =>
        u.Carrier.toLowerCase().includes('s')));
      }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
      { 
        if (this.Status.delivered){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
        }
        if (this.Status.intransit){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
        }
        if (this.Status.return){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('return')));
        }
        
      }else{
      if (this.Status.delivered){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('deliver')));
           }
        }
      }
      if (this.Status.intransit){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('transit')));
           }
        }
      }
      if (this.Status.return){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('return')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('return')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('return')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('s') && u.Status.toLowerCase().includes('return')));
           }
        }
      }}
    }
    if (this.Carrier.fedex){
      if(!(this.Status.delivered || this.Status.intransit || this.Status.return))
      {this.searchItems.push(this.sessionData.packages.All.filter(u =>
        u.Carrier.toLowerCase().includes('f')));
      }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
      { 
        if (this.Status.delivered){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
        }
        if (this.Status.intransit){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
        }
        if (this.Status.return){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('return')));
        }
        
      }else{
      if (this.Status.delivered){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('deliver')));
           }
        }
      }
      if (this.Status.intransit){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('transit')));
           }
        }
      }
      if (this.Status.return){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('return')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('return')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('return')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('f') && u.Status.toLowerCase().includes('return')));
           }
        }
      }}
    }
    if (this.Carrier.ontrack){
      if(!(this.Status.delivered || this.Status.intransit || this.Status.return))
      {this.searchItems.push(this.sessionData.packages.All.filter(u =>
        u.Carrier.toLowerCase().includes('o')));
      }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
      { 
        if (this.Status.delivered){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
        }
        if (this.Status.intransit){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
        }
        if (this.Status.return){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('return')));
        }
        
      }else{
      if (this.Status.delivered){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('deliver')));
           }
        }
      }
      if (this.Status.intransit){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('transit')));
           }
        }
      }
      if (this.Status.return){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('return')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('return')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('return')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('o') && u.Status.toLowerCase().includes('return')));
           }
        }
      }}
    }
    if (this.Carrier.purolator){
      if(!(this.Status.delivered || this.Status.intransit || this.Status.return))
      {this.searchItems.push(this.sessionData.packages.All.filter(u =>
        u.Carrier.toLowerCase().includes('p')));
      }else if(!(this.Date.lastmonth || this.Date.lastweek || this.Date.thismonth || this.Date.thisweek || this.Date.yesterday || this.Date.today))
      { 
        if (this.Status.delivered){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
        }
        if (this.Status.intransit){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
        }
        if (this.Status.return){
          this.searchItems.push(this.sessionData.packages.All.filter(u =>
            u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('return')));
        }
        
      }else{
      if (this.Status.delivered){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('deliver')));
           }
        }
      }
      if (this.Status.intransit){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('transit')));
           }
        }
      }
      if (this.Status.return){
        if (this.Date.lastmonth){
          this.searchItems.push(this.sessionData.packages.LastMonth.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.lastweek){
          this.searchItems.push(this.sessionData.packages.LastWeek.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('return')));
         }
        if (this.Date.thismonth){
          this.searchItems.push(this.sessionData.packages.ThisMonth.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('return')));
         }else if (this.Date.thisweek){
          this.searchItems.push(this.sessionData.packages.ThisWeek.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('return')));
         }else {
           if (this.Date.today){
            this.searchItems.push(this.sessionData.packages.Today.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('return')));
           }
           if (this.Date.yesterday){
            this.searchItems.push(this.sessionData.packages.Yesterday.filter(u =>
             u.Carrier.toLowerCase().includes('p') && u.Status.toLowerCase().includes('return')));
           }
        }
      }}
    }
  }
    if(this.searchItems.length > 0){
      this.activeItems =[];
      this.searchItems.forEach(arry=>{
        if(arry.length >0){
        arry.forEach(element=>{
          this.activeItems.push(element);
        });
      }
      });

    }
    this.readyToLoad = true;
    this.loading.dismiss();
  }catch(ex)
  {
    console.log(ex);
    this.loading.dismiss();}
  }
  menuback(){
    this.filterName = 'Filter by';
    this.mainMenu = true;
    this.carrierMenu = false;
    this.statusMenu = false;
    this.dateMenu = false;
  }
  ionViewWillEnter(){
    this.segmentChanged() ;
  }
  doRefresh(event) {
    if (this.sessionData !== '' && this.sessionData !== undefined && this.sessionData !== null){
      this.trackService.refreshTrackingDetails(this.sessionData.packages.All);
      event.target.complete();
    }
  }
  retrackAll(){
    if (this.sessionData !== '' && this.sessionData !== undefined && this.sessionData !== null){
      this.trackService.refreshTrackingDetails(this.sessionData.packages.All);
    }
  }
  searchPackages() {
    if (this.searchTerm === '' || this.searchTerm === undefined || this.searchTerm === null){
      this.refreshList();
    } else {
    switch (this.sortBy) {
      case 'All':
          this.activeItems = this.trackService.filterItems(SessionData.packages.All, this.searchTerm);
          break;
        case 'Today':
            this.activeItems = this.trackService.filterItems(SessionData.packages.Today, this.searchTerm);
            break;
          case 'Yesterday':
              this.activeItems = this.trackService.filterItems(SessionData.packages.Yesterday, this.searchTerm);
              break;
            case 'ThisWeek':
                this.activeItems = this.trackService.filterItems(SessionData.packages.ThisWeek, this.searchTerm);
                break;
              case 'LastWeek':
                  this.activeItems = this.trackService.filterItems(SessionData.packages.LastWeek, this.searchTerm);
                  break;
                  default:
                      this.activeItems = this.trackService.filterItems(SessionData.packages.All, this.searchTerm);
                      break;
     }
   }
  }
  
  refreshList(showLoader: boolean = false) {
    this.loading.dismiss();
    if (showLoader) { this.loading.present('Refreshing...'); }
    // tslint:disable-next-line: only-arrow-functions
    this.searchTerm = '';
    this.dateSelected = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    setTimeout(() => {
      this.segmentChanged();
      this.loading.dismiss();
   }, 800);
  }
  segmentChanged() {
    this.activeItems = [];
    this.storage.get('_activePackages').then((value) => {
      if (value !== '' && value !== undefined && value !== null){
      value = value.filter(val => val.ResultData.Status.toLowerCase().includes('return'));
      this.trackService.setPackagestoSession(value);
      this.sessionData = SessionData;
      this.activeItems = SessionData.packages.All;
      this.sortedBy();
      this.filterBy();
      }
      this.readyToLoad = true;
    });
  }
  sortedBy() {
    debugger;
   try{
    switch (this.sortBy) {
      case 'carr':
          this.activeItems = this.activeItems.sort((a,b) => a.Carrier.localeCompare(b.Carrier));
          break;
        case 'stat':
            this.activeItems = this.activeItems.sort((a,b) => a.Status.localeCompare(b.Status));
            break;
          case 'dat':
              this.activeItems = this.activeItems.sort((a,b) => a.ExpectedDate.localeCompare(b.ExpectedDate));
              break;
            case 'retail':
                //this.activeItems = this.activeItems.sort((a,b) => a.Carrier.localeCompare(b.Carrier));
                break;
              case 'cate':
                  //this.activeItems = this.activeItems.sort((a,b) => a.Carrier.localeCompare(b.Carrier));
                  break;
                  default:
                      this.activeItems = this.activeItems;
                      break;
    }
   // this.loading.dismiss();
  }catch(e){
   // this.loading.dismiss(); 
  }
  
  }
   filterBy() {
     switch (this.filtBy) {
       case 'Retailer':
           this.activeItems = SessionData.packages.All;
           break;
       case 'Status':
           this.activeItems = SessionData.packages.Today;
           break;
       case 'Category':
           this.activeItems = SessionData.packages.Yesterday;
           break;
       default:
           this.activeItems = SessionData.packages.All;
           break;
     }
   }
   showDetail(key: any){
     this.navCtrl.navigateForward(`/list-detail/${key}`);
   }
   sortByDates() {
     switch (this.sortBy) {
       case '1':
           this.sortbyDate = 'Date Created';
           break;
       case '2':
           this.sortbyDate = 'Expected By';
           break;
       case '3':
           this.sortbyDate = 'Last Updated';
           break;
       default:
           this.sortbyDate = 'Date Created';
           break;
     }
   }
   searchByDate() {
     if (this.sessionData !== undefined && this.sessionData !== null){
       this.activeItems = this.trackService.filterDatewise(SessionData.packages.All, this.dateSelected);
     }
   }
}
