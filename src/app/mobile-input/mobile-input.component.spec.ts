import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInputComponent } from './mobile-input.component';

describe('MobileInputComponent', () => {
  let component: MobileInputComponent;
  let fixture: ComponentFixture<MobileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
