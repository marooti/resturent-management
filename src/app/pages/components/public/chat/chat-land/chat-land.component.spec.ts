import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLandComponent } from './chat-land.component';

describe('ChatLandComponent', () => {
  let component: ChatLandComponent;
  let fixture: ComponentFixture<ChatLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
