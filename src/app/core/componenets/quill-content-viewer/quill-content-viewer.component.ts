import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-quill-content-viewer',
  imports: [],
  templateUrl: './quill-content-viewer.component.html',
  styleUrl: './quill-content-viewer.component.css'
})
export class QuillContentViewerComponent implements OnChanges {
  
  @Input() content: string = '';
  @Input() sanitize: boolean = true;
  @Input() containerClass: string = 'quill-rendered-content';

  safeContent: SafeHtml = '';

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.updateContent();
    }
  }

  private updateContent(): void {
    if (this.sanitize) {
      const clean = DOMPurify.sanitize(this.content);
      this.safeContent = this._sanitizer.bypassSecurityTrustHtml(clean);
    } else {
      this.safeContent = this._sanitizer.bypassSecurityTrustHtml(this.content);
    }
  }


}
