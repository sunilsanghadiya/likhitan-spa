import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageLayoutComponent } from './admin-page-layout.component';

describe('AdminPageLayoutComponent', () => {
  let component: AdminPageLayoutComponent;
  let fixture: ComponentFixture<AdminPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
