import {Component, OnInit} from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import {RouteService} from "../../../services/route.service";

@Component({
  selector: 'app-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {

  constructor(private service: RouteService, private scheduleService: ScheduleService) { }
  models:any  = []
  schedules: any = [];
  ngOnInit(): void {
    this.service.get().subscribe(
      res => {
        this.models = res
      },
      err => console.log(err)
    )
    this.scheduleService.get().subscribe(
      (res:any) => {
        this.schedules = res
      },
      (err:any) => console.log(err)
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
