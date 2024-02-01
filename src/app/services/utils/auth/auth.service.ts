import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() {
  }

  // Get data in Local Storage
  getDataInLocalStorage(variableName: string) {
    return localStorage.getItem(variableName);
  }

  // Set any data in Local Storage
  setDataInLocalStorage(variableName: string, data: any) {
    localStorage.setItem(variableName, data);
  }

  clearStorage() {
    localStorage.clear();
  }
}
