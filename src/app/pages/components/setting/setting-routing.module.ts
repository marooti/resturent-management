import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { settingComponent } from './setting.component';

const routes: Routes = [
  { path: '', component: settingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
