import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  rol: string = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.rol = this.tokenStorage.getUser().roles;
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value, 'this.form.value ')
      this.authService.login(this.form.value).subscribe(
        (data: any) => {
          console.log(data);
          if (data.success === true) {
            console.log(data.success, 'data.success');
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.rol = data.user.rol
            if (this.rol === 'user') {
              this.router.navigate(['/']);
            }
            if (this.rol === 'admin') {
              this.router.navigate(['/schedule']);
            }
            console.log(this.rol, 'this.rol');
          } else {
            this.errorMessage = data.msg;
            this.isLoginFailed = true;
          }
        },
        (err) => {
          //console.log(err);
          this.errorMessage = err.msg;
          this.isLoginFailed = true;
        }
      );
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}
