import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorPage } from './sector.page';

describe('SectorPage', () => {
  let component: SectorPage;
  let fixture: ComponentFixture<SectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
