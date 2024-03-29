import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Report } from 'src/app/models/active-packages';
import { TrackingService } from 'src/app/providers/tracking.service';
import * as $ from 'jquery';
import { Chart } from 'chart.js';
import { InfoModelComponent } from 'src/app/component/info-model/info-model.component';
declare var $: any;
@Component({
  selector: 'app-etreports',
  templateUrl: './etreports.page.html',
  styleUrls: ['./etreports.page.scss'],
})
export class ETReportsPage implements OnInit {

  constructor(@Inject(TrackingService) private trackService: TrackingService,
  @Inject(ModalController) private modalController: ModalController,
  @Inject(AlertController) public alertController: AlertController) {
    
   }
  reportData : Report;

  @ViewChild('pieChart') pieChart;
  bars: any;
  pop_img : string;
  pop_status: any;
  pop_value: any;
  colorArray: any
  ngOnInit() {  
    this.trackService.getReportsData();
    this.reportData = this.trackService.PackageSummary;
 
    // this.generateColorArray(5);
   this.colorArray = ['#ffffff','#d7ccef','#b09cda','#795db5','#452092'];
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

	});}
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
          label: 'Package summery',
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
          this.pop_status === 'Exceptions'?'warning_icon':
          this.pop_status === 'LateDelivery'?'clock_icon':
          this.pop_status === 'ShippingError'?'help_with_circle_icon':
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
        display: true,
        position: "bottom",
        labels: {
          fontFamily: "Verdana",
          boxWidth: 7,
          boxHeight: 1.5,
          fontSize : 9

        }},
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

  

}
