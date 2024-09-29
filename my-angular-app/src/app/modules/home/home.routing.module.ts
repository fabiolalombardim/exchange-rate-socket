import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AccountDetailsComponent } from './components/account-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
