import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLogsSheetComponent } from './time-logs-sheet.component';

describe('TimeLogsSheetComponent', () => {
  let component: TimeLogsSheetComponent;
  let fixture: ComponentFixture<TimeLogsSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeLogsSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeLogsSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
