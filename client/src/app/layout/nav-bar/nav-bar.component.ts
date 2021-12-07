import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private rol: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string = '';

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn, 'this.isLoggedIn');
    if (this.isLoggedIn) {
      const {user} = this.tokenStorageService.getUser();
      this.rol = user.rol;
      this.username = user.username;
    }
  }

  get isUserAuthenticated(): any {
    return this.tokenStorageService.getToken;
  }

  get userNameValue(): any {
    const {user} = this.tokenStorageService.getUser();
    console.log(user);
    return user.username;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
