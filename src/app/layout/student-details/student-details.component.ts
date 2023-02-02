import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FormGroup, FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {


  // page = 1;
  // pageSize = 5;
  // totalPages!: number;
  page = 1;
  pageSize = 5;
  totalPages!: number;


  canceledstudents: any = [];
  Waitingstudents: any = [];
  dialogue: any = 'student'
  cancelstudent: FormGroup;
  public isVisible: boolean = false;
  message: any;
  constructor(private router: Router) {
    this.cancelstudent = new FormGroup({
      cancelreason: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.Waitingstudents = JSON.parse(localStorage.getItem('Waitingstudents') || '[]')
    this.totalPages = Math.ceil(this.Waitingstudents.length / this.pageSize);

    let z: any = localStorage.getItem("canceledstudents")
    if (z != null && z != undefined && z != "") {
      this.canceledstudents = JSON.parse(z)
    } else {
      this.canceledstudents = []
    }
  }

  addStudent(id: any) {
    let navigationExtras: any = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['/layout/viewdetails'], navigationExtras)
  }
  deleteStudent(student: any) {
    this.dialogue = student;
  }
  get pages(): number[] {
    let pageCount = Math.ceil(this.Waitingstudents.length / this.pageSize);
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
  deletedetails() {
    let cancelbody: any = {}
    cancelbody.id = this.dialogue.id;
    cancelbody.fullName = this.dialogue.fullName;
    cancelbody.email = this.dialogue.email;
    cancelbody.phone = this.dialogue.phone;
    cancelbody.homeAddress = this.dialogue.homeAddress;
    cancelbody.fatherName = this.dialogue.fatherName;
    cancelbody.motherName = this.dialogue.motherName;
    cancelbody.dob = this.dialogue.dob;
    cancelbody.marksObtained = this.dialogue.marksObtained;
    cancelbody.percentage = this.dialogue.percentage;
    cancelbody.boardOfExamination = this.dialogue.boardOfExamination;
    cancelbody.stream = this.dialogue.stream;
    cancelbody.yearOfPassing = this.dialogue.yearOfPassing;
    cancelbody.reason = this.cancelstudent.value.cancelreason
    this.setLocalStorage(cancelbody);
    const selectedObjectIndex = this.Waitingstudents.findIndex((student: { id: any; }) => student.id === this.dialogue.id);
    this.Waitingstudents.splice(selectedObjectIndex, 1);
    localStorage.setItem("Waitingstudents", JSON.stringify(this.Waitingstudents));
    this.showAlert('Your Application Cancelled')
  }
  setLocalStorage(cancelbody: any) {
    this.canceledstudents.push(cancelbody)
    localStorage.setItem('canceledstudents', JSON.stringify(this.canceledstudents));
    this.cancelstudent.reset();
  }
  generateExcel() {
    let DATA: any = document.getElementById('example2');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(DATA)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'example2')
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }
  showAlert(msg: any): void {
    if (this.isVisible) {
      return;
    }
    this.message = msg
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 2500)
  }
}
