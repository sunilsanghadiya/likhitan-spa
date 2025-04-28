import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-control-error-message',
  imports: [ ],
  templateUrl: './control-error-message.component.html',
  styleUrl: './control-error-message.component.css',
  standalone: true
})
export class ControlErrorMessageComponent {

  @Input() control!: AbstractControl;
  @Input() customMessages: { [key: string]: string }[] = [];

  getErrorKeys(): string[] {
    return this.control ? Object.keys(this.control.errors || {}) : [];
  }

  getErrorMessage(errorKey: string): string {
    const defaultMessages: { [key: string]: string } = {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minlength: `Minimum length is ${this.control.getError('minlength')?.requiredLength}`,
      maxlength: `Maximum length is ${this.control.getError('maxlength')?.requiredLength}`,
      pattern: 'Invalid format',
    };

    // Merge all customMessages into a single object
    const mergedCustomMessages = Object.assign({}, ...this.customMessages);
    return mergedCustomMessages[errorKey] || defaultMessages[errorKey] || 'Invalid value';
  }

}
