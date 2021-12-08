import {Component, OnInit} from '@angular/core';

import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app',
  templateUrl: './user-list.component.html',
  //styleUrls: ['./route-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private service: UserService) {
  }

  models: any = []

  ngOnInit(): void {
    this.service.get().subscribe(
      (res: any) => {
        console.log(res, 'res ')
        console.log(this.models, 'this.models ')
        this.models = res
      }
    )

  }

  delete(id: string): void {
    if (confirm('¿Esta seguro que quiere borrar este post?')) {
      this.service.delete(id).subscribe((res: any) => {
        this.models = this.models.filter((model: any) => model._id !== id);
      });
    }
  }

}

