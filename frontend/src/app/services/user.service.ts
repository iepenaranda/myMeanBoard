import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;

  constructor(private http: HttpClient) {
    this.env = environment.APP_URL;
  }

  listUser() {
    return this.http.get<any>(this.env + 'user/listUsers');
  }

  deleteUser(user: any) {
    return this.http.put<any>(this.env + 'user/deleteUser', user._id);
  }
}
