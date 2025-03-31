import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserglobalService {
  private localStorageKey = 'username';

  setUserName(username: string): void {
    localStorage.setItem(this.localStorageKey, username);
  }

  getUserName(): string {
    return localStorage.getItem(this.localStorageKey) || '';
  }

  clearUser(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}
