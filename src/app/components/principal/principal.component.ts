import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetTranslateService } from 'src/app/services/utils/get-translate/get-translate.service';
import { ThemeService } from 'src/app/services/utils/theme/theme.service';
import QrScanner from 'qr-scanner';
import { MessageService } from 'primeng/api';

declare var AFRAME: any; 
declare namespace AFrame{
  // interface Coordinate{}
} 

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  // @ViewChild('blueBox') blueBox?: ElementRef;
  // @ViewChild('pinkBox') pinkBox?: ElementRef;
  // @ViewChild('yellowBox') yellowBox?: ElementRef;
  // @ViewChild('greenBox') greenBox?: ElementRef;

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

    // if(navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     let gpsBlueBox = document.createAttribute('gps-new-entity-place');
    //     let gpsPinkBox = document.createAttribute('gps-new-entity-place');
    //     let gpsYellowBox = document.createAttribute('gps-new-entity-place');
    //     let gpsGreenBox = document.createAttribute('gps-new-entity-place');

    //     gpsBlueBox.value = `latitude: ${position.coords.latitude + 0.00006}; longitude: ${position.coords.longitude}`;
    //     gpsPinkBox.value = `latitude: ${position.coords.latitude - 0.00006}; longitude: ${position.coords.longitude}`;
    //     gpsYellowBox.value = `latitude: ${position.coords.latitude + 0.00006}; longitude: ${position.coords.longitude - 0.00012}`;
    //     gpsGreenBox.value = `latitude: ${position.coords.latitude - 0.00006}; longitude: ${position.coords.longitude - 0.00012}`;

    //     this.blueBox?.nativeElement.setAttributeNode(gpsBlueBox);
    //     this.pinkBox?.nativeElement.setAttributeNode(gpsPinkBox);
    //     this.yellowBox?.nativeElement.setAttributeNode(gpsYellowBox);
    //     this.greenBox?.nativeElement.setAttributeNode(gpsGreenBox);

    //     // latitude: -3.079789495999005; longitude: -59.96492510633917
    //     console.log(position.coords.latitude);
    //     console.log(position.coords.longitude);
    //   })
    // }

  }

  ngAfterViewInit(): void {
    // AFRAME.registerComponent('registerEvents', {
    //   init: function() {
    //     var marker = this.el;

    //     marker.setAttribute('emitevents', 'true');

    //     marker.addEventListener('markerFound', function() {
    //       var markerId = marker.id;

    //       console.log('markerFound', markerId);
    //     });


    //   }
    // });

    // let marker = document.querySelector("a-marker") as any;

    // marker.object3D.visible = true;

    // console.log(marker.object3D);

    // marker.addEventListener("markerFound", (e)=>{
    //   console.log(e);
    //   console.log("found")
    //   // document.getElementById("HeadText").style.visibility = "hidden";
    // });

    // marker.addEventListener("markerLost", (e)=>{
    //   console.log("lost");
    // // document.getElementById("HeadText").style.visibility = "visible";
    // });

    // this.videoRequestPermission();

    // const camera = document.querySelector('[camera]');
    // const marker = document.querySelector('a-marker');

    // let check: any;

    // marker?.addEventListener('markerFound', () => {
    //     let cameraPosition = (camera as any).object3D?.position;
    //     let markerPosition = (marker as any).object3D?.position;
    //     let distance = cameraPosition.distanceTo(markerPosition)

    //     check = setInterval(() => {
    //         cameraPosition = (camera as any).object3D.position;
    //         markerPosition = (marker as any).object3D.position;
    //         distance = cameraPosition.distanceTo(markerPosition)

    //         // do what you want with the distance:
    //         console.log(distance);
    //     }, 100);
    // });

    // marker?.addEventListener('markerLost', () => {
    //   clearInterval(check);
    // })
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
