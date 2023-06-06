import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddEventComponent } from './view/pages/add-event/add-event.component';
import { AgendaComponent } from './view/pages/agenda/components/agenda.component';
import { NotifPageComponent } from './view/pages/notif-page/notif-page.component';
import { ProfilComponent } from './view/pages/profil/profil.component';
import { MessageComponent } from './view/pages/message/message.component';
import { ContainerEventComponent } from './view/utils/container-event/container-event.component';
import { CardEventComponent } from './view/utils/card-event/card-event.component';
import { SearchBarComponent } from './view/utils/search-bar/search-bar.component';
import { AppRoutingModule } from './app-routing.module';
import {HubModule} from "./view/pages/hub/hub.module";
import {HomeModule} from "./view/pages/home/home.module";
import { LoginComponent } from './view/forms/components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    AgendaComponent,
    NotifPageComponent,
    ProfilComponent,
    MessageComponent,
    ContainerEventComponent,
    CardEventComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HubModule,
    HomeModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
