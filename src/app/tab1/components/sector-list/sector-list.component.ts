import { config } from './../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Sector } from './../../tab1.page';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'iot-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss'],
})
export class SectorListComponent implements OnInit {

  @Input() sectorList: Sector[] = [];
  @Output() someEvent = new EventEmitter<number>();

  callParent(index: number) {
    this.someEvent.next(index);
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() { }

  UpdateSectorName(event: any, index: number) {
    event.stopPropagation();
    if (this.sectorList[index].data.name !== event.target.children[0].value) {
      const sector = { id: this.sectorList[index].id, data: { name: event.target.children[0].value } };
      this.httpClient.put(config.baseUrl + '/sectors', sector).subscribe((result: Sector) => {
        this.sectorList[index].data.name = result.data.name;
      });
    }
  }

  DeleteSector(event: Event, index: number) {
    event.stopPropagation();
    this.httpClient.delete(config.baseUrl + '/sectors?id=' + this.sectorList[index].id).subscribe(() => {
      this.sectorList.splice(index, 1);
    });
  }

  AddZone(event: Event, index: number) {
    event.stopPropagation();
    let tempZones = [];
    if (this.sectorList[index].data.zones) {
      tempZones = this.sectorList[index].data.zones.slice();
    }
    tempZones.push({ name: 'zóna', items: [] });
    const zone = { id: this.sectorList[index].id, data: tempZones };
    /* (result: { id: string, data: { name: string, items: [] } } )*/
    this.httpClient.post(config.baseUrl + '/zones', zone).subscribe(() => {
      this.sectorList[index].data.zones.push({ name: 'zóna', items: [] });
      /* this.sectorList[index].data.zones = [result.data]; */
    });
  }

  DeleteZone(index: number, index2: number) {
    const tempZones = this.sectorList[index].data.zones.slice();
    tempZones.splice(index2, 1);
    this.httpClient.delete(config.baseUrl + '/zones?id=' + this.sectorList[index].id + '&data='
      + JSON.stringify(tempZones)).subscribe(() => {
        this.sectorList[index].data.zones.splice(index2, 1);
      });
  }

  SelectZone(event: Event) {
    this.prevent(event);
  }

  prevent(event: Event) {
    event.stopPropagation();
  }

  navigate(id: string) {
    this.router.navigate(['home/sectors/', id]);
  }

}
