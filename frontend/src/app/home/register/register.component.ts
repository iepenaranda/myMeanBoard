import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  public registerData: any;
  public errorMessage: String;

  constructor(private auth: AuthService, private router: Router) {
    this.registerData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      console.log('Failed process: Incomplete data');
      this.errorMessage = 'Failed process: Incomplete data';
      this.closeAlert();
    } else {
      this.auth.registerUser(this.registerData).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this.router.navigate(['/saveTask']);
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      );
    }
  }

  // Asigna a los mensaje de error y exito un mensaje vacio, al estar vacios el HTML dejará de mostrar los recuadros de menjajes
  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }
}
