import {Component, OnInit} from '@angular/core';
import {PlaneService} from 'src/app/services/planes.service';

@Component({
  selector: 'app',
  templateUrl: './planes-list.component.html',
  //styleUrls: ['./route-list.component.scss']
})
export class PlaneListComponent implements OnInit {

    constructor(private service: PlaneService) { }
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
  
