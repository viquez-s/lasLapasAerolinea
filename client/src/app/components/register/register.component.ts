import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    birthday: new FormControl(''),
    address: new FormControl('', Validators.required),
    work_phone: new FormControl('', Validators.required),
    cellphone: new FormControl('', Validators.required),

  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  rol: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.rol = this.tokenStorage.getUser().rol;
    }
  }

  submitForm(): void {
    console.log(this.form, 'this.form.valid ')

    if (this.form.valid) {
      console.log(this.form.value, 'this.form.value ')
      console.log(this.form, 'this.form ')
      this.userService.create(this.form.value).subscribe(
        (data: any) => {
          console.log(data);
          if (data.success === true) {
            console.log(data.success, 'data.success');
            // data.roles = data.user.rol;
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.rol = this.tokenStorage.getUser().user.rol;
            console.log(this.rol, 'rol')
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
