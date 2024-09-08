import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllChatComponent } from './all-chat.component';

const routes: Routes = [
  { path: '', component: AllChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllChatRoutingModule { }
