import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from '../../components/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './components/account-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [HomeComponent, AccountDetailsComponent],
  imports: [HomeRoutingModule, CommonModule, SharedModule, MatIconModule, FlexLayoutModule, MatProgressSpinnerModule],
  exports: [HomeComponent, AccountDetailsComponent],
  providers: [],
  bootstrap: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
