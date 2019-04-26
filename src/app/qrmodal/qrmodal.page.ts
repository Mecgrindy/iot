import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { Screenshot } from '@ionic-native/screenshot/ngx';

@Component({
  selector: 'app-qrmodal',
  templateUrl: './qrmodal.page.html',
  styleUrls: ['./qrmodal.page.scss'],
})
export class QrmodalPage implements OnInit {
  createdCode = null;
  navp = null;
  date = null;
  
  constructor(public modalCtrl: ModalController, public navParams: NavParams, private screenshot: Screenshot, private plt: Platform) {
    
   }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.navp = this.navParams.get('value');
    var tempDate = new Date();
    var day = tempDate.getDate();
    var monthIndex = tempDate.getMonth();
    var year = tempDate.getFullYear();
    this.date = day + "-" + (+monthIndex+1) + "-" + year;
    this.createdCode = this.navp + '_' + this.date;
  }

  ionViewDidEnter(){
    
    console.log("ionview " + this.createdCode);
    console.log(this.plt.is("cordova"));
    console.log(this.plt.platforms());
    
    if(this.plt.is("cordova")){
      this.screenshot.save('jpg', 80, this.createdCode).then(onSuccess => {
        this.dismiss();
      }, onError => {
        console.error(onError);
      });
    }
    
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
