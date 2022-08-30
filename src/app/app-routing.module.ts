import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthentifComponent } from './authentif/authentif.component';
import { TwofactorComponent } from './twofactor/twofactor.component';
import { UserComponent } from './user/user.component';
import { AuthguardGuard } from './authentif/authguard.guard';
import { AccessComponent } from './user/access/access.component';
import { TableComponent } from './table/table.component';
import { RegisterComponent } from './user/register/register.component';


const routes: Routes = [
  { path: 'register' ,component: RegisterComponent},
  { path: '', component: AuthentifComponent },
  { path: 'login', component: AuthentifComponent },
  {
    path: 'twofactor',
    component: TwofactorComponent,
    canActivate: [AuthguardGuard],
  },
  { path: 'profil', component: UserComponent, canActivate: [AuthguardGuard] },
  { path: 'access', component: AccessComponent, canActivate:[AuthguardGuard]},
  { path: 'table', component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
