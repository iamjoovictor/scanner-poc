import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorStateClass {

  constructor() { }

  validator(control: FormControl, submited: boolean) {
    return !!(control && control.invalid && (control.dirty || control.touched || submited));
  }
}
