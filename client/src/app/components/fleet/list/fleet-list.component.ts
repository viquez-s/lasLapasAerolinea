import {Component, OnInit} from '@angular/core';
import {FleetService} from 'src/app/services/fleet.service';

@Component({
  selector: 'app-list',
  templateUrl: './fleet-list.component.html',
  styleUrls: ['./fleet-list.component.scss']
})
export class FleetListComponent implements OnInit {

  constructor(private service: FleetService) { }
  models:any  = []
  ngOnInit(): void {
    this.service.get().subscribe(
      (res:any) => {
        this.models = res
      }
    )

  }
  delete(id: string): void {
    if (confirm('¿Esta seguro que quiere borrar esta flota?')) {
      this.service.delete(id).subscribe((res: any) => {
        this.models = this.models.filter((model: any) => model._id !== id);
      });
    }
  }

}
