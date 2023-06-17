import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmerComponent } from './confirmer.component';
@NgModule({
  declarations: [ConfirmerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ConfirmerComponent }
    ])
  ]
})
export class ConfirmerModule {


}
