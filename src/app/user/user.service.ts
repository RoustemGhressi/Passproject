import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userlist: User[] = [];

  constructor() {}
}
