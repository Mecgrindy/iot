import { config } from './../app.config';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QrmodalPage } from '../qrmodal/qrmodal.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'iot-zone',
  templateUrl: './zone.page.html',
  styleUrls: ['./zone.page.scss'],
})
export class ZonePage implements OnInit {
  sectorId: string;
  zoneIndex: number;
  sector: any;
  createdCode: any;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient,
    public modalController: ModalController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id && params.index) {
        this.sectorId = params.id;
        this.zoneIndex = params.index;
        this.getZone();
      }
    });
  }

  getZone() {
    this.httpClient.get(config.baseUrl + '/sectors/getById?id=' + this.sectorId).subscribe((result) => {
      this.sector = result;
      console.log(this.sector);
    });
  }

  createCode() {
    this.createdCode = 'mock';
    this.presentModal();
  }

  async presentModal() {
    if(this.createdCode){
      const modal = await this.modalController.create({
        component: QrmodalPage,
        componentProps: { value: this.createdCode }
      });
      return await modal.present();
    } else {
      alert('QR string cannot be null or empty!');
    }
  }

}
