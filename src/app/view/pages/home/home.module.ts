import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {LeftPaneComponent} from "../../left-pane/left-pane.component";
import {RightPaneComponent} from "../../right-pane/right-pane.component";
import { SearchBarComponent } from "../../utils/search-bar/search-bar.component";
import { ProfilComponent } from "../profil/profil.component";
import { MessageComponent } from "../message/message.component";
import { AgendaComponent } from "../agenda/components/agenda.component";
import { AddEventComponent } from "../add-event/add-event.component";
import { NotifPageComponent } from "../notif-page/notif-page.component";
import { UserCardComponent } from "../../utils/user-card/user-card.component";

import { SugestFriendComponent } from "../../utils/sugest-friend/sugest-friend.component";
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Ajout de HttpClientModule et HttpClient
import { UserService } from 'src/app/model/services/user/user.service'; // Ajout de UserService
import { ApiService } from "src/app/api.service";

import { AuthentificationService } from "src/app/model/services/authentification/authentification.service";

import { ProfilSectionComponent } from "../profil/profil-section/profil-section.component";
import { EventService } from "src/app/model/services/event/event.service";
import { ContainerEventComponent } from "../../utils/container-event/container-event.component";
import { CardEventComponent } from "../../utils/card-event/card-event.component";
import { MainEventComponent } from "../../utils/main-event/main-event.component";
import { EventComponent} from "../event/event.component";



@NgModule({
  declarations: [
    HomeComponent,
    LeftPaneComponent,
    RightPaneComponent,
    SearchBarComponent,
    ProfilComponent,
    MessageComponent,
    AgendaComponent,
    AddEventComponent,
    NotifPageComponent,
    UserCardComponent,
    SugestFriendComponent,
    ProfilSectionComponent,
    ContainerEventComponent,
    CardEventComponent,
    MainEventComponent,
    EventComponent,
  ],
  providers: [
    UserService,
    AuthentificationService,
    EventService
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule, // Ajout de HttpClientModule
    

  ]
})
export class HomeModule {

}
