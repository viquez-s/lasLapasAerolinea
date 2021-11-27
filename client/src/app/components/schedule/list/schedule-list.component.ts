import {Component, OnInit} from '@angular/core';
import {ScheduleService} from 'src/app/services/schedule.service';

@Component({
  selector: 'app-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  constructor(private service: ScheduleService) { }
  models:any  = []
  ngOnInit(): void {
    this.service.get().subscribe(
      (res:any) => {
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
