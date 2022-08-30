import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
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

const fadeOut = trigger('fadeOut', [exitTransition]);
const fadeIn = trigger('fadeIn', [enterTransition]);

@Component({
  selector: 'app-authentif',
  templateUrl: './authentif.component.html',
  styleUrls: ['./authentif.component.css'],
  animations: [fadeIn, fadeOut],
})
export class AuthentifComponent implements OnInit {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  qrconfirm: any;
  registerForm!: FormGroup;
  submitted = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
   
    
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if (this.authService.isLoggedIn()) this.router.navigateByUrl('/twofactor');

    this.qrconfirm = localStorage.getItem('qrconfirm');
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService
      .login(email, password)
      .subscribe((res: HttpResponse<any>) => {
        this.toastr.success('Authentification Valide','Succées!');
        this.qrconfirm = res.body.qrconfirm;
        this.router.navigateByUrl('/twofactor');
        console.log(res);
      },err =>{
        this.toastr.error('Vérifier vos informations','Erreur!');
      });
  }
}
