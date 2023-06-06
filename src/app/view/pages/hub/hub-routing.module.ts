import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HubComponent} from "./hub/hub.component";

const routes: Routes = [
  {
    path: '', component: HubComponent,
    children : [
      {path: 'login', loadChildren: () => import('../../forms/components/login/login.module')
          .then(m => m.LoginModule)},
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HubRoutingModule {

}
