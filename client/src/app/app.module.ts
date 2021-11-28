import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SearchComponent } from './layout/search/search.component';
import { ScheduleListComponent } from './components/schedule/list/schedule-list.component';
import { ScheduleFormComponent } from './components/schedule/form/schedule-form.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouteFormComponent} from "./components/routes/form/route-form.component";
import {RouteListComponent} from "./components/routes/list/route-list.component";
import {PlaneListComponent} from "./components/planes/list/planes.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchComponent,
    ScheduleListComponent,
    ScheduleFormComponent,
    RouteListComponent,
    RouteFormComponent,
    PlaneListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
