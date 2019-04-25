import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import * as jsPDF from 'jspdf';
import * as pdfMake from 'pdfmake';
import * as html2canvas from 'html2canvas';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  pdfObj = null

  constructor(private barcodeScanner: BarcodeScanner, private plt: Platform, public file: File, public fileOpener: FileOpener, public screenshot: Screenshot) {

  }

  generatePdf() {

        


      this.screenshot.URI(80).then(onSuccess => {
          //addImage y-axial offset
        var position = 0;
        //a4 format [595.28,841.89]       
        var imgWidth = 595.28;
        var imgHeight = 592.28;
    
        var docDefinition = {
          content: [{
            image: onSuccess,
            width: imgWidth,
            height: imgHeight,
            position: position
          }]
        };
        this.pdfObj = pdfMake.createPdf(docDefinition);
        console.log("obj : ", this.pdfObj);
    
        if (this.pdfObj) {
          console.log("it works");
          this.pdfObj.getBuffer((buffer) => {
            var blob = new Blob([buffer], { type: 'application/pdf' });
  
            // Save the PDF to the data Directory of our App
            this.file.writeFile(this.file.dataDirectory, 'aircraft.pdf', blob, { replace: true }).then(fileEntry => {
              // Open the PDf with the correct OS tools
              this.fileOpener.open(this.file.dataDirectory + 'aircraft.pdf', 'application/pdf');
            })
          });
        }
      }, onError => {
        console.error(onError);
      });
      

  }

  createCode() {
    this.createdCode = this.qrData;
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    });
  }


}
