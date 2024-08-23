import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityLayoutComponent } from './security-layout.component';

describe('SecurityLayoutComponent', () => {
  let component: SecurityLayoutComponent;
  let fixture: ComponentFixture<SecurityLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecurityLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
