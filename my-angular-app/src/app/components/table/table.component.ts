import { Component, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges, AfterViewInit {

  @Input() displayedColumns: string[] = []
  @Input() dataSource!: Account[];
  @Input() exchangeRate!: number;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSourceTable!: MatTableDataSource<Account>;

  constructor(private readonly router: Router) {

  }

  ngOnChanges() {
    this.dataSourceTable = new MatTableDataSource(this.dataSource); // Initialize dataSourceTable with new data
    if (this.sort) {
      this.dataSourceTable.sort = this.sort; // Assign the sort instance if it's available
    }
    if (this.paginator) {
      this.dataSourceTable.paginator = this.paginator; // Assign the paginator instance if it's available
    }
  }

  ngAfterViewInit() {
    this.dataSourceTable.sort = this.sort; // Assign MatSort to the data source
    this.dataSourceTable.paginator = this.paginator; // Assign MatPaginator to the data source
  }

  public goToDetails = (account: Account) => {
    const navigationExtras: NavigationExtras = {
      state: {
        ...account
      }
    };
    this.router.navigate(['/account'], navigationExtras);

  }

}
