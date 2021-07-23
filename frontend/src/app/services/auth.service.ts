import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers: any;
  constructor(private http: HttpClient) {
    this.headers = {
      Authorization: '',
      'Content-Type': 'application/json',
    };
  }

  login(username: string, password: string) {
    return this.http.post(
      Auth.login,
      { username, password },
      { headers: this.headers }
    );
  }

  signup(data: any) {
    return this.http.post(Auth.signup, data, { headers: this.headers });
  }

  activateAccount(data: any, headers?: any) {
    return this.http.post(Auth.activate, data, {headers: {...this.headers, headers}});
  }
}
