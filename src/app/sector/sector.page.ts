import { config } from './../app.config';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'iot-sector',
  templateUrl: './sector.page.html',
  styleUrls: ['./sector.page.scss'],
})
export class SectorPage implements OnInit {
  sector: any;
  sectorId: string;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.sectorId = params.id;
        this.getSector(params.id);
      }
    });
  }

  getSector(id) {
    this.httpClient.get(config.baseUrl + '/sectors/getById?id=' + id).subscribe((result) => {
      this.sector = result;
    });
  }

  AddZone() {
    let tempZones = [];
    if (this.sector.zones) {
      tempZones = this.sector.zones.slice();
    }
    tempZones.push({ name: 'zóna', items: [] });
    const zone = { id: this.sectorId, data: tempZones };
    this.httpClient.post(config.baseUrl + '/zones', zone).subscribe(() => {
      this.sector.zones.push({ name: 'zóna', items: [] });
    });
  }

  DeleteZone(event: Event, index: number) {
    event.stopPropagation();
    const tempZones = this.sector.zones.slice();
    tempZones.splice(index, 1);
    this.httpClient.delete(config.baseUrl + '/zones?id=' + this.sectorId + '&data='
      + JSON.stringify(tempZones)).subscribe(() => {
        this.sector.zones.splice(index, 1);
      });
  }

  prevent(event: Event) {
    event.stopPropagation();
  }

  navigate(id: string) {
    this.router.navigate(['home/sectors/', id]);
  }

}
