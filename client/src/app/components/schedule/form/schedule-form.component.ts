import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduleService} from "../../../services/schedule.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: ScheduleService
  ) {
  }

  form = new FormGroup({
    departure: new FormControl('', [Validators.required]),
    price: new FormControl('', Validators.required),
  });
  list = '/schedule'

  editMode = false;
  model: any = {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;

        this.service.getById(params.id).subscribe((data: any) => {
          this.model = data;
          this.form.setValue({
            departure: data.departure,
            price: data.price,
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
