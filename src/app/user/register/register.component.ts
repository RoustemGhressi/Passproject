import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { WebRequestService } from 'src/app/web-request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeIn, fadeOut]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private formBuilder: FormBuilder,private authservice: AuthService, private webservice: WebRequestService, private toastr: ToastrService, private router: Router)  { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if (this.authservice.isLoggedIn()) this.router.navigateByUrl('/twofactor');
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

  inscription(nom:string,prenom:string,email:string,password:string){
    this.webservice.register(nom,prenom,email,password).subscribe(
      res=>{
          this.toastr.success('Inscription valide','Succées!');
          this.router.navigateByUrl('login');
      },
      err=>{
        this.toastr.error('Cet email est déja utilisé','Erreur!');
      }
    )

  }

}
