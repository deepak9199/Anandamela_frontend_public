import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const PRODUCT_KEY = 'auth-productkey';
const CART_KEY = 'auth-cartkey';
const BUYNOW_KEY = 'auth-buynow';
const CETAGORY_KEY = 'auth-cetagory';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}
  signOut(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
  public saveUserSession(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserSession(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  // product

  public saveProduct(user: any): void {
    window.localStorage.removeItem(PRODUCT_KEY);
    window.localStorage.setItem(PRODUCT_KEY, JSON.stringify(user));
  }

  public getProduct(): any {
    return JSON.parse(localStorage.getItem(PRODUCT_KEY));
  }

  // cart
  public saveCart(user: any): void {
    window.localStorage.removeItem(CART_KEY);
    window.localStorage.setItem(CART_KEY, JSON.stringify(user));
  }

  public getCart(): any {
    return JSON.parse(localStorage.getItem(CART_KEY));
  }

  public removecart(): any {
    window.localStorage.removeItem(CART_KEY);
  }

  // buy now
  public savebuynow(user: any): void {
    window.localStorage.removeItem(BUYNOW_KEY);
    window.localStorage.setItem(BUYNOW_KEY, JSON.stringify(user));
  }

  public getbuynow(): any {
    return JSON.parse(localStorage.getItem(BUYNOW_KEY));
  }

  public removebuynow(): any {
    window.localStorage.removeItem(BUYNOW_KEY);
  }

  // CETAGORY_KEY now
  public saveCetagory(user: any): void {
    window.localStorage.removeItem(CETAGORY_KEY);
    window.localStorage.setItem(CETAGORY_KEY, JSON.stringify(user));
  }

  public getCetagory(): any {
    return JSON.parse(localStorage.getItem(CETAGORY_KEY));
  }

  public removeCetagory(): any {
    window.localStorage.removeItem(CETAGORY_KEY);
  }
}
