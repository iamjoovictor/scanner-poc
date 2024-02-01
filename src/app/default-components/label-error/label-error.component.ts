import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-label-error',
  templateUrl: './label-error.component.html',
  styleUrls: ['./label-error.component.scss']
})
export class LabelErrorComponent {
  
  @Input() submitted: Boolean = false;
  @Input() field: any;
  @Input() message: any;

  constructor() { }

  ngOnInit(): void {
  }
}
