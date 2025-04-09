import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrorMessageComponent } from './control-error-message.component';

describe('ControlErrorMessageComponent', () => {
  let component: ControlErrorMessageComponent;
  let fixture: ComponentFixture<ControlErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlErrorMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
