import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAuthorComponent } from './become-author.component';

describe('BecomeAuthorComponent', () => {
  let component: BecomeAuthorComponent;
  let fixture: ComponentFixture<BecomeAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecomeAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
