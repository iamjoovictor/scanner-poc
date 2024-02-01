// Angular Imports
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

// Routing  Imports
import { AppRoutingModule } from './app-routing.module';

// Module Imports
import { DefaultComponentsModule } from './default-components/default-components.module';
import { PrimengModule } from './modules/primeng/primeng.module';

// Translate Imports
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GetTranslateService } from './services/utils/get-translate/get-translate.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,

    //Import Modules
    DefaultComponentsModule,
    PrimengModule,

    //Translate Module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
        },
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    GetTranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
