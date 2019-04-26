import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  pdfObj = null;

  constructor(
    private photoViewer: PhotoViewer,
    private barcodeScanner: BarcodeScanner, public screenshot: Screenshot) {

  }

  generatePdf() {
      

    // Take a screenshot and save to file
    this.screenshot.save('png', 256, this.qrData+'_zone').then(onSuccess => {
      console.log(onSuccess.filePath);
      this.photoViewer.show(onSuccess.filePath, this.qrData+'_zone'+'.png', {share: true});
      /*this.fileOpener.open('file://'+onSuccess.filePath, 'application/png')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));*/
    }, onError => {
      console.error(onError);
    });
            
          
      

  }

  generatePrint(){
    var tmp = document.createDocumentFragment(),
    printme = document.getElementById('printableArea').cloneNode(true);
    while(document.body.firstChild) {
        // move elements into the temporary space
        tmp.appendChild(document.body.firstChild);
    }
    // put the cloned printable thing back, and print
    document.body.appendChild(printme);
    window.print();

    while(document.body.firstChild) {
        // empty the body again (remove the clone)
        document.body.removeChild(document.body.firstChild);
    }
    // re-add the temporary fragment back into the page, restoring initial state
    document.body.appendChild(tmp);
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
