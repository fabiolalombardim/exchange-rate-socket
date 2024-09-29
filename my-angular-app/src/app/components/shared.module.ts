import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BadgeComponent } from './badge/badge.component';
import { TransactionTableComponent } from './txs-table/txs-table.component';

@NgModule({
  declarations: [TableComponent, BadgeComponent, TransactionTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  exports: [TableComponent, BadgeComponent, TransactionTableComponent]
})
export class SharedModule {};
