import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleListComponent} from "./components/schedule/list/schedule-list.component";
import {ScheduleFormComponent} from "./components/schedule/form/schedule-form.component";
import {RouteListComponent} from "./components/routes/list/route-list.component";
import {RouteFormComponent} from "./components/routes/form/route-form.component";

const routes: Routes = [
  {path: 'schedule', component: ScheduleListComponent,},
  {path: 'schedule/create', component: ScheduleFormComponent},
  {path: 'schedule/:id', component: ScheduleFormComponent},
  {path: 'route', component: RouteListComponent,},
  {path: 'route/create', component: RouteFormComponent},
  {path: 'route/:id', component: RouteFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
