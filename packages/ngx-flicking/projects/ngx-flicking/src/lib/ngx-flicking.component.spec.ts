import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFlickingComponent } from './ngx-flicking.component';

describe('NgxFlickingComponent', () => {
  let component: NgxFlickingComponent;
  let fixture: ComponentFixture<NgxFlickingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFlickingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFlickingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
