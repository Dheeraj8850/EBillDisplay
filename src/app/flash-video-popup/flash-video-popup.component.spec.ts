import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashVideoPopupComponent } from './flash-video-popup.component';

describe('FlashVideoPopupComponent', () => {
  let component: FlashVideoPopupComponent;
  let fixture: ComponentFixture<FlashVideoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashVideoPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashVideoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
