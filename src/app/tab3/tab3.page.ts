import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ModalController } from '@ionic/angular';
import { QrmodalPage } from '../qrmodal/qrmodal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  qrData = null;
  createdCode = null;
  scannedCode0 = '';
  scannedCode1 = '';
  scannedCode2 = '';
  pdfObj = null;

  constructor(
    private photoViewer: PhotoViewer, public modalController: ModalController,
    private barcodeScanner: BarcodeScanner, public screenshot: Screenshot) {

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


  createCode() {
    this.createdCode = this.qrData;
    this.presentModal();
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode0 = 'Nappali szektor, Nappali - Bal';
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode1 = 'CO 124-es szenzor';
        this.barcodeScanner.scan().then(barcodeData => {
          this.scannedCode2 = 'CO 150-esre cserélve';
        });
      });
    });
  }


}
