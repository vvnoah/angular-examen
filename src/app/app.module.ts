import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContainerListComponent } from './components/container-list.component';
import { ContainerComponent } from './components/container.component';
import { ColorComponent } from './components/color.component';
import { Data } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    ContainerListComponent,
    ContainerComponent,
    ColorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    Data
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
