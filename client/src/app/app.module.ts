import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BeltComponent } from './belt/belt.component';

import { BeltService } from './belt/belt.service';

import { routing } from './app.routes';
import { BeltAddComponent } from './belt/belt-add/belt-add.component';
import { BeltDashboardComponent } from './belt/belt-dashboard/belt-dashboard.component';
import { FilterPipe } from './belt/belt-dashboard/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BeltComponent,
    BeltAddComponent,
    BeltDashboardComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [BeltService],
  bootstrap: [AppComponent]
})
export class AppModule { }
