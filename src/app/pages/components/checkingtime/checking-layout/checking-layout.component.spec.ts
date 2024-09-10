import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingLayoutComponent } from './checking-layout.component';

describe('CheckingLayoutComponent', () => {
  let component: CheckingLayoutComponent;
  let fixture: ComponentFixture<CheckingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckingLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
