import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private authService: AuthService
  ) { }

  getTheme() {
    return localStorage.getItem('theme') ?? 'light';
  }

  setTheme(theme: string) {
    this.authService.setDataInLocalStorage('theme', theme);

    if(theme == 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }

    else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }
}
