import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetTranslateService } from 'src/app/services/utils/get-translate/get-translate.service';
import { ThemeService } from 'src/app/services/utils/theme/theme.service';
import QrScanner from 'qr-scanner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  //Subscriptions
  subscriptions: Subscription[] = [];

  //Form Controls
  formControlTitle = '';
  formControlPage = '';
  formControlLayout = '';

  //Logo by theme
  theme: string = 'light';

  // Variable Toast Controller
  toastController: boolean = false;

  videoStream: any;

  constructor(
    private messageService: MessageService,
    private themeService: ThemeService,
    public translateService: GetTranslateService
  ) { }

  ngOnInit(): void {
    this.translateConfigToLoginModule();
    this.getTheme();
  }

  ngAfterViewInit(): void {
    this.videoRequestPermission();
  }

  async videoRequestPermission() {
    let videoElement = document.querySelector('video') as HTMLVideoElement;

    let qrScanner = new QrScanner(
      videoElement,
      result => {
        let json: any = {};

        try {
          json = JSON.parse(result?.data);
        }
        catch (e) {
          json = {};
        }

        if(json.type == 'Scan Data' && !this.formControlTitle && !this.formControlPage && !this.formControlLayout) {
          let formElement = document.querySelector('.principal-form') as HTMLDivElement;

          formElement.style.zIndex = '1';

          this.formControlTitle = json.name;
          let labelTitle = document.getElementById('title') as HTMLSpanElement;
          labelTitle.textContent = json.name;

          this.formControlPage = json.pages;
          let inputPage = document.getElementById('page') as HTMLInputElement;
          inputPage.value = json.pages;
          
          this.formControlLayout = json.layout;
          let inputLayout = document.getElementById('layout') as HTMLInputElement;
          inputLayout.value = json.layout;
        }

        else if(json.type != 'Scan Data' && !this.formControlTitle && !this.formControlPage && !this.formControlLayout && !this.toastController) {
          this.toastController = true;

          let toastError = document.getElementById("toast-error") as HTMLDivElement;

          toastError.className = "show";

          setTimeout(() => {
            toastError.className = toastError.className.replace("show", "");
            this.toastController = false;

          }, 3000);
        }
      },
      {
        preferredCamera: 'environment'
      }
    );

    qrScanner.start();
  }

  translateConfigToLoginModule() {
    this.translateService.addLangs(this.translateService.supportedLanguages());
    let defaultLanguage = this.translateService.getLanguage();
    this.translateService.setLanguage(defaultLanguage);
    this.translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(defaultLanguage);
    this.translateService.primeNgTranslate();
  }

  getTheme() {
    this.theme = this.themeService.getTheme();
  }

  changeLanguage() {
    let defaultLanguage = this.translateService.getLanguage();
    let newLanguage = (defaultLanguage == 'en' ? 'pt' : 'en');

    this.translateService.setLanguage(newLanguage);
    this.changeLanguageWithReload();
    // this.changeLanguageWithoutReload(newLanguage);
  }

  // Works for all project modules.
  changeLanguageWithReload() {
    location.reload();
  }

  // Only works for the current module in the project.
  changeLanguageWithoutReload(language: string) {
    this.translateService.use(language);
  }

  closeForm() {
    let formElement = document.querySelector('.principal-form') as HTMLDivElement;

    formElement.style.zIndex = '-2';
    this.formControlTitle = '';
    this.formControlPage = '';
    this.formControlLayout = '';
  }

  onClickHandleSave() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }
}
