import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubComponent } from './hub/hub.component';
import {HubRoutingModule} from "./hub-routing.module";



@NgModule({
  declarations: [
    HubComponent
  ],
  imports: [
    CommonModule,
    HubRoutingModule,
  ]
})
export class HubModule { }
