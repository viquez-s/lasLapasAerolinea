import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-form',
  templateUrl: './user-form.component.html',
 // styleUrls: ['./plane-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: UserService
  ) {
  }

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    birthday: new FormControl(''),
    address: new FormControl('', Validators.required),
    work_phone: new FormControl('', Validators.required),
    cellphone: new FormControl('', Validators.required),

  });
  list = '/user'

  editMode = false;
  model: any = {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;

        this.service.getById(params.id).subscribe((data: any) => {
          this.model = data;
          console.log(data, 'data')
          const {username,
            rol,
            name,
            lastName,
            email,
            birthday,
            address,
            work_phone,
            cellphone} = data;
          this.form.setValue({
            username,
            rol,
            name,
            lastName,
            email,
            birthday,
            address,
            work_phone,
            cellphone,
          });
        });

      }

    });
  }

  navigateToList() {
    this.router.navigate([this.list]);
  }

  submitForm() {
    if (this.form.valid) {
      if (this.editMode) {
        this.service
          .edit(this.model._id, this.form.value)
          .subscribe(() => {
            this.navigateToList();
          });
      } else {
        this.service.create(this.form.value).subscribe(() => {
          this.navigateToList();
        });
      }
    }
  }

}
