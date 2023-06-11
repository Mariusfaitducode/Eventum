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
    SugestFriendComponent

  ],
  providers: [
    UserService
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule, // Ajout de HttpClientModule
    

  ]
})
export class HomeModule {

}
