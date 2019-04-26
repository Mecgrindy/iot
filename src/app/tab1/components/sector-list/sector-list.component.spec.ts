import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorListComponent } from './sector-list.component';

describe('SectionListComponent', () => {
  let component: SectorListComponent;
  let fixture: ComponentFixture<SectorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectorListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
