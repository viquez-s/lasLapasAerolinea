import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlaneService} from "../../../services/planes.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './planes-form.component.html',
 // styleUrls: ['./plane-form.component.scss']
})
export class PlaneFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: PlaneService
  ) {
  }

  form = new FormGroup({
    capacity: new FormControl('', [Validators.required]),
    rows: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required]),
    model: new FormControl('', Validators.required),
    brand: new FormControl('', [Validators.required]),

  });
  list = '/plane'

  editMode = false;
  model: any = {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;

        this.service.getById(params.id).subscribe((data: any) => {
          this.model = data;
          this.form.setValue({
            capacity: data.capacity,
            rows: data.rows,
            year: data.year,
            model: data.model,            
            brand: data.brand,
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
