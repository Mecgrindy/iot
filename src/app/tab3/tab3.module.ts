import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { QRCodeModule } from 'angularx-qrcode';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { QrmodalPage } from '../qrmodal/qrmodal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    QRCodeModule
  ],
  entryComponents: [QrmodalPage],
  declarations: [Tab3Page, QrmodalPage],
  providers: [
    Screenshot
  ]
})
export class Tab3PageModule {}
