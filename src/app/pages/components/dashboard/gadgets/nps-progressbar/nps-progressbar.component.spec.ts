import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsProgressbarComponent } from './nps-progressbar.component';

describe('NpsProgressbarComponent', () => {
  let component: NpsProgressbarComponent;
  let fixture: ComponentFixture<NpsProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpsProgressbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NpsProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
