import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FleetService} from "../../services/fleet.service";
import {TicketService} from "../../services/ticket.service";
import {PlaneService} from "../../services/planes.service";
import {ScheduleService} from "../../services/schedule.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: TicketService,
    private PlaneService: PlaneService,
    private FleetService: FleetService,
    private ScheduleService: ScheduleService
    ) {
  }

  form = new FormGroup({
    ida: new FormControl('', Validators.required),
    origen: new FormControl('', Validators.required),
    vuelta: new FormControl(''),
    fleet: new FormControl('', [Validators.required]),
    plane: new FormControl('', [Validators.required]),
    schedule: new FormControl('', [Validators.required]),
  });
  list = '/ticket'
  editMode = false;
  model: any = {}
  planesDropdown: any = [];
  fleetsDropdown: any = [];
  schedulesDropdown: any = [];
  totalPrice: any = [];

  ngOnInit(): void {


    this.form.get("ida")?.valueChanges.subscribe(x => {

      if (x === "ida") {
        this.form.get('destino')?.disable()
        this.form.get('destino')?.setValue('')
        this.form.get('vuelta')?.setValue('')
        this.form.get('vuelta')?.disable()

      } else {
        this.form.get('destino')?.enable();
        this.form.get('vuelta')?.enable();
      }
      console.log('firstname value changed')
      console.log(x)
    })
    this.activeRoute.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;

        this.service.getById(params.id).subscribe((data: any) => {
          this.model = data;
          this.form.setValue({
            seats: data.seats,
            price: data.price,
            fleet: data.fleet,
            user: data.user,
          });
        });
      }

    });
    this.PlaneService.get().subscribe((data) => {
      console.log(data, 'data ')
      this.planesDropdown = data;
    });
    this.FleetService.get().subscribe((data) => {
      console.log(data, 'data ')
      this.fleetsDropdown = data;
    });
    this.ScheduleService.get().subscribe((data) => {
      console.log(data, 'data ')
      this.schedulesDropdown = data;

    });

    this.form.get("schedules")?.valueChanges.subscribe(x => {
      this.ScheduleService.getById(this.form.get("schedules")?.value).subscribe((data) => {
      console.log(data, 'data ')
      this.totalPrice = data.price * this.form.get("asientos")?.value;
      });
    })

  }


}
