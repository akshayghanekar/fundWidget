import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundWidgetComponent } from './fund-widget.component';

describe('FundWidgetComponent', () => {
  let component: FundWidgetComponent;
  let fixture: ComponentFixture<FundWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
