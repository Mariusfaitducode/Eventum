import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {CentralPaneComponent} from "../../central-pane/central-pane.component";
import {LeftPaneComponent} from "../../left-pane/left-pane.component";
import {RightPaneComponent} from "../../right-pane/right-pane.component";

@NgModule({
  declarations: [
    HomeComponent,
    CentralPaneComponent,
    LeftPaneComponent,
    RightPaneComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule {

}
