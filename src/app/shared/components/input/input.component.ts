import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() formControlName: any;
  @Input() type = 'text';
  @Input() onlyNumber = false;
  @Input() label = '';
  @Input() value = '';
  @Input() maxLength = 255;
  @Input() minLength = 0;
  @Input() min = 0;
  @Input() max = 99999;
  @Input() placeholder = '';
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() codeOtp = false;
  @Input() formLabel = '';
  @Input() maskCurrecy = false;
  @Input() disableInput = false

  public isDisabled = false;

  constructor(
  ) { }

  get formField(): FormControl {
    return this.formGroup.get(this.formControlName) as FormControl;
  }

  get getMinLength() {
    const error = this.formField.errors as ValidationErrors;
    return error ? error['minlength']?.requiredLength : '';
  }

  get getMaxLength() {
    const error = this.formField.errors as ValidationErrors;
    return error ? error['maxlength']?.requiredLength : '';
  }

  changed = (value: any): void => { }
  touched = (): void => { };

  doInput(event: any) {
    const value = event.target.value;
    this.changed(value);
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any) {
    this.value = value;
  }

  checkOnlyNumber(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
