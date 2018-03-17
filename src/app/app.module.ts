import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


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
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
