import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsStatisticsComponent } from './nps-statistics.component';

describe('NpsStatisticsComponent', () => {
  let component: NpsStatisticsComponent;
  let fixture: ComponentFixture<NpsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpsStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NpsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
