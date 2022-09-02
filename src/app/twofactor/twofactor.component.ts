import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WebRequestService } from '../web-request.service';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';


const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('1s ease-in', style({ opacity: 1 })),
]);
const exitTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('1s ease-out', style({ opacity: 0 })),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);
const fadeOut = trigger('fadeOut', [exitTransition]);

@Component({
  selector: 'app-twofactor',
  templateUrl: './twofactor.component.html',
  styleUrls: ['./twofactor.component.css'],
  animations: [fadeIn, fadeOut],
})
export class TwofactorComponent implements OnInit {
  registerForm!: FormGroup;
  data_url = '';
  qrconfirm = localStorage.getItem('qrconfirm');
  existId = true;
  submitted = false;
  private _isOut$ = new BehaviorSubject<boolean>(false);
  isOut$ = this._isOut$.asObservable();

  constructor(
    private authService: AuthService,
    private webservice: WebRequestService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      token: ['', Validators.required],
    });

    if (localStorage.getItem('token')) {
      this.webservice.gototwofactor(localStorage.getItem('token')).subscribe(
        (res) => {
          if (res) {
            console.log('deuxiéme authentification');
          } else {
            console.log('somthing wrong');
          }
        },
        (err) => {
          if (err) {
            console.log('error');
          }
        }
      );
    }
    if (this.authService.istwologgedin()) this.router.navigateByUrl('/profil');

    //window.onblur = this.newTabaction;
  }

  //newTabaction() {
    //localStorage.removeItem('token');
    //localStorage.removeItem('userId');
    //localStorage.removeItem('qrconfirm');
    //window.location.replace('/login');
  //}

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

  onConfirmButtonClicked(token: any) {
    this.authService
      .VerifyToken(localStorage.getItem('userId'), token)
      .subscribe((res: HttpResponse<any>) => {
        if (res.body.verified === true) {
          this.toastr.success('Code validé','Succées!');
          this.router.navigateByUrl('/profil');
        } else {
          this.toastr.error('Code invalide','Erreur!');
        }

        console.log(res);
      });
  }

  generateQrcode() {
    this.authService
      .generateQrcode(localStorage.getItem('userId'))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.data_url = res.body.data_url;
      });
  }
  
  onlogout() {
    this.authService.removeSession();
    this.router.navigateByUrl('/login');
  }
}
