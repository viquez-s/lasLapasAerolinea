import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleListComponent} from "./components/schedule/list/schedule-list.component";
import {ScheduleFormComponent} from "./components/schedule/form/schedule-form.component";

const routes: Routes = [
  {
  path: 'schedule', component: ScheduleListComponent,

  },
  {path: 'schedule/create', component: ScheduleFormComponent},
  {path: 'schedule/:id', component: ScheduleFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
