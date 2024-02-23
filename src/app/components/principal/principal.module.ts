// Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing Import
import { PrincipalRoutingModule } from 'src/app/components/principal/principal-routing.module';

// Component Imports
import { PrincipalComponent } from 'src/app/components/principal/principal.component';

// Module Imports
import { DefaultComponentsModule } from 'src/app/default-components/default-components.module';
import { PrimengModule } from 'src/app/modules/primeng/primeng.module';

// Translate Imports
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GetTranslateService } from 'src/app/services/utils/get-translate/get-translate.service';

@NgModule({
  declarations: [
    PrincipalComponent,
  ],
  imports: [
    // Angular Imports
    CommonModule,

    // Routing Import
    PrincipalRoutingModule,

    // Module Imports
    DefaultComponentsModule,
    PrimengModule,

    // Translate Imports
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, '../../../assets/i18n/principal/', '.json');
        },
        deps: [HttpClient]
      },
      isolate: true,
    })
  ],
  providers: [
    GetTranslateService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrincipalModule {
}
