import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FleetListComponent} from "./components/fleet/list/fleet-list.component";
import {FleetFormComponent} from "./components/fleet/form/fleet-form.component";
import {ScheduleListComponent} from "./components/schedule/list/schedule-list.component";
import {ScheduleFormComponent} from "./components/schedule/form/schedule-form.component";
import {RouteListComponent} from "./components/routes/list/route-list.component";
import {RouteFormComponent} from "./components/routes/form/route-form.component";
import {PlaneListComponent} from "./components/planes/list/planes.component";
import {PlaneFormComponent} from "./components/planes/form/planes-form.component";
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from "./components/register/register.component";
import { UserListComponent } from './components/users/list/user-list.component';
import {UserFormComponent} from "./components/users/form/user-form.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: 'fleet', component: FleetListComponent,},
  {path: 'fleet/create', component: FleetFormComponent},
  {path: 'fleet/:id', component: FleetFormComponent},
  {path: 'schedule', component: ScheduleListComponent,},
  {path: 'schedule/create', component: ScheduleFormComponent},
  {path: 'schedule/:id', component: ScheduleFormComponent},
  {path: 'route', component: RouteListComponent,},
  {path: 'route/create', component: RouteFormComponent},
  {path: 'route/:id', component: RouteFormComponent},
  {path: 'plane', component: PlaneListComponent,},
  {path: 'plane/create', component: PlaneFormComponent},
  {path: 'plane/:id', component: PlaneFormComponent},
  {path: 'user', component: UserListComponent},
  {path: 'user/create', component: UserFormComponent},
  {path: 'user/:id', component: UserFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: '', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
