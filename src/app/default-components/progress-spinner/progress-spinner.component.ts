import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent {
  
  @Input() showProgress: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
