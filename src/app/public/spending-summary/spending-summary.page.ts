import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Report } from 'src/app/models/active-packages';
import { TrackingService } from 'src/app/providers/tracking.service';
import { Chart } from 'chart.js';
import { InfoModelComponent } from 'src/app/component/info-model/info-model.component';
@Component({
  selector: 'app-spending-summary',
  templateUrl: './spending-summary.page.html',
  styleUrls: ['./spending-summary.page.scss'],
})
export class SpendingSummaryPage implements OnInit {

  constructor(@Inject(TrackingService) private trackService: TrackingService,
  @Inject(ModalController) private modalController: ModalController,
  @Inject(AlertController) public alertController: AlertController,
  @Inject(NavController) private navCtrl: NavController) { }
  reportData : Report;

  @ViewChild('pieChart') pieChart;
  bars: any;
  pop_img : string;
  pop_status: any;
  pop_value: any;
  colorArray: any
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
   this.reportData = this.trackService.SpendingSummary;

   this.colorArray = ['#ffffff','#d7ccef','#b09cda','#795db5','#452092','#452092'];
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
      type: 'horizontalBar',
      data: {
        labels: this.reportData.labels,
        datasets: [{
          label: 'Spending summery',
          data: this.reportData.data,
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: '#d7ccef',// array should have same number of elements as number of dataset
          borderWidth: 2
        }]
      },
      options: {
        animation: {
          duration: 1,
onComplete () {
const chartInstance = this.chart;
const ctx = chartInstance.ctx;
const meta = chartInstance.controller.getDatasetMeta(0);

Chart.helpers.each(meta.data.forEach((bar, index) => {
const label = this.data.labels[index];
const labelPositionX = 20;

ctx.textBaseline = 'middle';
ctx.textAlign = 'left';
ctx.fillStyle = '#333';
ctx.fillText(label, labelPositionX, bar._model.y);
}));
}
},
        onClick: (c, i) => {

        },
        layout: {
          padding: {
            bottom: 30,
            right: 15
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
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
              mirror:true,
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  
}
