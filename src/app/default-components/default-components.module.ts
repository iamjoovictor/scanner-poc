// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Mask Imports
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

// Module Imports
import { PrimengModule } from '../modules/primeng/primeng.module';

// Component Imports
import { InputValidatorComponent } from 'src/app/default-components/input-validator/input-validator.component';
import { LabelErrorComponent } from 'src/app/default-components/label-error/label-error.component';
import { ProgressSpinnerComponent } from 'src/app/default-components/progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    // Components
    InputValidatorComponent,
    LabelErrorComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    // Module Imports
    PrimengModule,

    // Angular Imports
    CommonModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    ReactiveFormsModule,
  ],
  exports: [
    // Component Imports
    InputValidatorComponent,
    LabelErrorComponent,
    ProgressSpinnerComponent,

    // Andular Imports
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideNgxMask()
  ]
})
export class DefaultComponentsModule { }
