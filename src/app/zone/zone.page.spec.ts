import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePage } from './zone.page';

describe('ZonePage', () => {
  let component: ZonePage;
  let fixture: ComponentFixture<ZonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
