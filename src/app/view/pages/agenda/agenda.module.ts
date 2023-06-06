import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CentralPaneComponent} from "../../central-pane/central-pane.component";
import {LeftPaneComponent} from "../../left-pane/left-pane.component";
import {RightPaneComponent} from "../../right-pane/right-pane.component";
import {EventComponent} from "../event/event.component";
import {AgendaRoutingModule} from "./agenda-routing.module";

@NgModule({
  declarations: [
    EventComponent,
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule
  ]
})
export class AgendaModule {

}
