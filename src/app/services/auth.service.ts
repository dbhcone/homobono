import { Injectable, OnInit } from '@angular/core';
import { Auth } from '../api/endpoints';
import { IAccount, ICredentials, IUser } from '../models/auth.interface';
import { Client } from '../utils/client';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(private client: Client) {}

  ngOnInit(): void {}
  login(credentials: ICredentials) {
    return this.client.POST(`${Auth.login}`, { ...credentials });
  }

  signup(user: IUser, accountData: IAccount) {
    return this.client.POST(`${Auth.signup}`, { user, account: accountData });
  }

  activateAccount(token: string, pin: string) {
    return this.client.POST(`${Auth.activate}`, { token, pin });
  }
  setToken(token: string) {
    const promise = new Promise((resolve, reject) => {
      localStorage.setItem('access-token', token);
      resolve(token);
      reject(Error('There was an error'));
    });
    return promise;
  }

  getToken() {
    return localStorage.getItem('access-token');
  }

  data(): IUser {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken() || undefined;

    const decodedToken = jwtHelper.decodeToken(token);
    // const expirationDate = jwtHelper.getTokenExpirationDate(token);
    // const isExpired = jwtHelper.isTokenExpired(token);
    return decodedToken;
  }

  session() {
    const jwtHelper = new JwtHelperService();

    const isTokenExpired = jwtHelper.isTokenExpired(
      this.getToken() || undefined
    );
    const decodedToken = jwtHelper.decodeToken(this.getToken() || undefined);
    console.log('decoded', decodedToken)
    const { username, email, role } = decodedToken;

    return { username, isTokenExpired, email, role };
  }

  isTokeExpired(): boolean {
    return this.session().isTokenExpired;
  }

  get isAdmin() {
    return this.data().role === 'admin';
  }
}
