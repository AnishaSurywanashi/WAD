import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registeredUser: User | null = null;
  private currentUser: User | null = null;

  register(user: User): void {
    this.registeredUser = { ...user };
    this.currentUser = { ...user };
  }

  login(email: string, password: string): boolean {
    if (!this.registeredUser) {
      return false;
    }

    const isValidUser =
      this.registeredUser.email === email && this.registeredUser.password === password;

    if (isValidUser) {
      this.currentUser = { ...this.registeredUser };
    }

    return isValidUser;
  }

  getUser(): User | null {
    return this.currentUser;
  }
}
