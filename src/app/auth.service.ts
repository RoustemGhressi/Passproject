import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
  JsonpClientBackend,
} from '@angular/common/http';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _Verified = new BehaviorSubject<boolean>(false);
  verified = this._Verified.asObservable();
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  data_url = '';
  tokentook = '';
  qrconfirm: any;

  verify = null;

  constructor(
    private http: HttpClient,
    private webService: WebRequestService,
    private router: Router
    
  ) {}

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this._isLoggedIn$.next(true);
        this.setSession(res.body.userId, res.body.token, res.body.qrconfirm);

        this.qrconfirm = localStorage.getItem('qrconfirm');
      }),

      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server is down');
  }

  VerifyToken(userId: any, token: string) {
    return this.webService
      .VerifyToken((userId = localStorage.getItem('userId')), token)
      .pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          if (res.body.verified === true) {
            console.log('connecté');
            localStorage.setItem('token2',token);
          }
          this.verify = res.body.verified;
          console.log({ verify: this.verify });
        }),

        catchError(this.errorHand)
      );
  }
  errorHand(error: HttpErrorResponse) {
    return throwError(error.message || 'server is down');
  }

  generateQrcode(userId: any) {
    return this.webService
      .generateQrcode((userId = localStorage.getItem('userId')))
      .pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          this.data_url = res.body.data_url;
          console.log('code generated');
        })
      );
  }



  logout() {
    this.removeSession();
    this.router.navigateByUrl('/login');
  }

  setSession(userId: string, token: string, qrconfirm: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('qrconfirm', qrconfirm);
  }

  removeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('qrconfirm');
    localStorage.removeItem('token2');
  }

  getUserPayload() {
    var token = localStorage.getItem('token');
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }



  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }

  istwologgedin() {
    if(localStorage.getItem('token2')){
      return true
    }else{
      return false
    }
  }

  getAccessToken() {
    return localStorage.getItem('token');
  }

  setAcessToken(token: string) {
    localStorage.setItem('token', token);
  }

  getAccessId() {
    return localStorage.getItem('UserId');
  }

  private removeID() {
    localStorage.removeItem('userId');
  }
}
