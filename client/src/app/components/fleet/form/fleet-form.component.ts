import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FleetService} from "../../../services/fleet.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './fleet-form.component.html',
  styleUrls: ['./fleet-form.component.scss']
})
export class FleetFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: FleetService
  ) {
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    plane: new FormControl('', [Validators.required]),
    route: new FormControl('', Validators.required),
  });
  list = '/fleet'

  editMode = false;
  model: any = {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;

        this.service.getById(params.id).subscribe((data: any) => {
          this.model = data;
          this.form.setValue({
            name: data.name,
            plane: data.plane,
            route: data.route,
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
