import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingDetailComponent } from './checking-detail.component';

describe('CheckingDetailComponent', () => {
  let component: CheckingDetailComponent;
  let fixture: ComponentFixture<CheckingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
