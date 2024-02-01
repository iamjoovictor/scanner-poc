import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { tap } from 'rxjs';

@Injectable()
export class GetTranslateService {

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private primengConfig: PrimeNGConfig,
  ) { }

  translate(path: string) {
    let translate: string = '';

    this.translateService.get(path).pipe(
      tap({
        next: (data) => {
          translate = data;
        },
        error: (error) => {
          translate = '';
        }
      })
    ).subscribe().unsubscribe();
    
    return translate;
  }

  supportedLanguages() {
    return ['en', 'pt'];
  }

  getLanguage() {
    return localStorage.getItem('language') ?? 'en';
  }

  setLanguage(language: string) {
    this.authService.setDataInLocalStorage('language', language);
  }

  setDefaultLang(language: any) {
    this.translateService.setDefaultLang(language);
  }

  use(defaultLanguage: any) {
    return this.translateService.use(defaultLanguage);
  }

  addLangs(languages: any) {
    this.translateService.addLangs(languages);
  }

  primeNgTranslate() {
    this.translateService.get('primeng').pipe(
      tap({
        next: (data) => {
          this.primengConfig.setTranslation(data)
        }
      })
    ).subscribe();
  }
}
