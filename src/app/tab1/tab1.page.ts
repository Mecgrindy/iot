import { Sector } from './tab1.page';
import { config } from './../app.config';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Sector {
  id: string;
  data: {
    name: string,
    zones: [
      { name: string, items: [] }
    ]
  };
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  sectorList: Sector[];

  constructor(private httpClient: HttpClient) { }

  ionViewWillEnter() {
    this.GetSectors();
  }

  AddSector() {
    const sector = { name: 'szektor' };
    this.httpClient.post(config.baseUrl + '/sectors', sector).subscribe((result: Sector) => {
      this.sectorList.push(result);
    });
  }

  GetSectors() {
    this.httpClient.get(config.baseUrl + '/sectors').subscribe((result: Sector[]) => {
      this.sectorList = result;
    });
  }
}
