import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    autoplay: true,
    loop: true,
    speed: 400
  };

  constructor() { }

  ngOnInit() {
  }

}
