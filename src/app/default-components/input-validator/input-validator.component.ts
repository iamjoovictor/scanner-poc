import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorStateClass } from 'src/app/middlewares/validators/errorState';

@Component({
  selector: 'app-input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.scss']
})
export class InputValidatorComponent {

  @Input() variableFormControl: any; /*Variable that controls data input.*/
  @Input() labelTitle: any; /* Field that will be input. */
  @Input() placeHolderInput: any = ""; /* Placeholder that will be displayed. */
  @Input() maskInput: any; /* Mask to be applied. */
  @Input() labelErrorFirstValidator: any; /* Error message to be displayed. */
  @Input() labelErrorSecondValidator: any; /* Error message to be displayed. */
  @Input() labelErrorThirdValidator: any; /* Error message to be displayed. */
  @Input() idFirstValidator: any; /* Id entered in the validator. */
  @Input() idSecondValidator: any; /* Id entered in the validator. */
  @Input() idThirdValidator: any; /* Id entered in the validator. */
  @Input() maxLenght: any; /* Maximum input size. */
  @Input() minLenght: any; /* Minimum input size. */
  @Input() inputType: any; /* Data input type. */
  @Input() submited: any; /* Data submission control variable. */
  @Input() colSizeClass: any; /* Column size. Ex: col-1, col-12. */
  @Input() autoFocus: any; /* When entering the component the input has a focus. */
  @Input() readOnly:any; /* Read-only field. */
  @Input() name:any;
  @Input() inputId:any
  @Input() disabled: any; /* Field must be disabled. */
  @Input() floatLabelClass: any; /* Float label type class. Ex: float-label-up */
  @Output() onChange = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onBlur = new EventEmitter();

  constructor(
    public errorStateMatcher: ErrorStateClass
  ) {}

  ngOnInit(): void {
  }

  testNumber(event: KeyboardEvent){
    if(this.inputType=='number' && isNaN(Number(event.key)) && event.code != 'Enter'){
      event.preventDefault()
    }
  }

  onInputChange() {
    this.onChange.emit();
  }

  onInputFocus() {
    this.onFocus.emit();
  }

  onInputBlur() {
    this.onBlur.emit();
  }
}
