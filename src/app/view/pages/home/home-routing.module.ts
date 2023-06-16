import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home.component";
import {ProfilComponent} from "../profil/profil.component";
import {MessageComponent} from "../message/message.component";


const routes: Routes = [
  {
    path: '', component: HomeComponent,

  },
  { path: 'messages', component: MessageComponent },



]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
