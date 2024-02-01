import { ValidatorFn, AbstractControl } from '@angular/forms';
import { checkFullCEP } from '../funtions/validateFunctions';

export function formControlValidatorCep(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    checkFullCEP(control.value)
      ? null : { validCep: true };
}
