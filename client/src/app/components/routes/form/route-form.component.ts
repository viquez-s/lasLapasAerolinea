import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouteService} from "../../../services/route.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ScheduleService} from "../../../services/schedule.service";

@Component({
  selector: 'app-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: RouteService,
    private scheduleService: ScheduleService
  ) {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    schedules: new FormControl('', Validators.required),

  });
  list = '/route'

  editMode = false;
  model: any = {}
  schedulesDropdown: any = [];

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;

        this.service.getById(params.id).subscribe((data) => {

          this.model = data;
          this.form.setValue({
            name: data.name,
            duration: data.duration,
            schedules: data.schedules,

          });
        });
      }

    });
    this.scheduleService.get().subscribe((data) => {
      console.log(data, 'data ')
      this.schedulesDropdown = data;
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
          .subscribe((data) => {
            this.navigateToList();
          });
      } else {
        console.log(this.form.value, 'this.form.value ')
        this.service.create(this.form.value).subscribe((data) => {
          this.navigateToList();
        });
      }
    }
  }

}
