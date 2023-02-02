import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cancellist',
  templateUrl: './cancellist.component.html',
  styleUrls: ['./cancellist.component.scss']
})
export class CancellistComponent implements OnInit {
  Cancelstudents: any = [];
  page = 1;
  pageSize = 5;
  totalPages!: number;

  constructor() { }

  ngOnInit(): void {
    this.Cancelstudents = JSON.parse(localStorage.getItem('canceledstudents') || '[]')
    this.totalPages = Math.ceil(this.Cancelstudents.length / this.pageSize);
  }
  get pages(): number[] {
    let pageCount = Math.ceil(this.Cancelstudents.length / this.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
    return pages;
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  goToPage(p: number) {
    this.page = p;
  }
  generateExcel() {
    let DATA: any = document.getElementById('example2');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(DATA)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'example2')
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }
}
