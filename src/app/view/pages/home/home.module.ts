import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {CentralPaneComponent} from "../../central-pane/central-pane.component";
import {LeftPaneComponent} from "../../left-pane/left-pane.component";
import {RightPaneComponent} from "../../right-pane/right-pane.component";
import { ProfilComponent } from "../profil/profil.component";
import { MessageComponent } from "../message/message.component";
import { AgendaComponent } from "../agenda/components/agenda.component";
import { AddEventComponent } from "../add-event/add-event.component";
import { NotifPageComponent } from "../notif-page/notif-page.component";

@NgModule({
  declarations: [
    HomeComponent,
    LeftPaneComponent,
    RightPaneComponent,
    ProfilComponent,
    MessageComponent,
    AgendaComponent,
    AddEventComponent,
    NotifPageComponent,
    

  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule {

}
