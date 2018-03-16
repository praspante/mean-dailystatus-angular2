import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StatusDetailsComponent } from './statuses/status-details/status-details.component';
import { StatusListComponent } from './statues/status-list/status-list.component';


@NgModule({
  declarations: [
    AppComponent,
    StatusDetailsComponent,
    StatusListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
