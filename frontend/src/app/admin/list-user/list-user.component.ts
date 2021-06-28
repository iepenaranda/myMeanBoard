import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  public usersData: any;
  public successMessage: string;
  public errorMessage: string;

  constructor(private user: UserService, private router: Router) {
    this.usersData = {};
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit(): void {
    this.user.listUser().subscribe(
      (res)=>{
        this.usersData = res.users;
      },
      (err) => {
        this.errorMessage = err;
      }
    )
  }

  deleteUser(user: any){}

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }
}
