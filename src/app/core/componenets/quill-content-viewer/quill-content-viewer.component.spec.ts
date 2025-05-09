import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillContentViewerComponent } from './quill-content-viewer.component';

describe('QuillContentViewerComponent', () => {
  let component: QuillContentViewerComponent;
  let fixture: ComponentFixture<QuillContentViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuillContentViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuillContentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
