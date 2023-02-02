import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {
  selectid: any
  newdata: any
  dayscholarshow: boolean = false
  collegebusshow: boolean = false
  Conformedstudent: any = []
  feeForm = new FormGroup({
    Busno: new FormControl(''),
    city: new FormControl('')
  });
  registerList: any = [];
  Waitingstudents: any = []
  public isVisible: boolean = false;
  message: any;
  feesStructure: any =
    {
      "Governmentquota": '', "Collegemanagement": '', "dayscholar": '', "Hosteler": '',
      "Busfees": '', "Outbus": '', "Totalfees": '',
    }

  totalFees: any;
  constructor(private route: ActivatedRoute, private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.selectid = params['id'];
      this.Waitingstudents = JSON.parse(localStorage.getItem('Waitingstudents') || '[]');
      for (let student of this.Waitingstudents) {
        if (student.id == this.selectid) {
          this.newdata = student
        }
      }
    });
    let z: any = localStorage.getItem("conformstudents")
    if (z != null && z != undefined && z != "") {
      this.registerList = JSON.parse(z)
    } else {
      this.registerList = []
    }
  }

  changeValue(value: string) {
    if (value == 'governmentquota') {
      this.feesStructure.Governmentquota = 10000;
      this.feesStructure.Collegemanagement = 0;
    }
    if (value == 'collegemanagement') {
      this.feesStructure.Collegemanagement = 30000;
      this.feesStructure.Governmentquota = 0;
    }
    if (value == 'dayscholar') {
      this.feesStructure.dayscholar = 0;
      this.feesStructure.Hosteler = 0;
      this.dayscholarshow = true
    }
    if (value == 'hosteler') {
      this.feesStructure.dayscholar = 0;
      this.feesStructure.Hosteler = 50000;
      this.dayscholarshow = false
      this.collegebusshow = false
    }
    if (value == 'collegebus') {
      this.feesStructure.Busfees = 12500
      this.feesStructure.Outbus = 0
      this.collegebusshow = true
    }
    if (value == 'outbus') {
      this.feesStructure.Busfees = 0
      this.feesStructure.Outbus = 0
      this.collegebusshow = false
    }
    this.feesStructure.libraryfees = 1500
    let totalFees = [
      this.feesStructure.Governmentquota,
      this.feesStructure.Collegemanagement,
      this.feesStructure.dayscholar,
      this.feesStructure.Hosteler,
      this.feesStructure.Busfees,
      this.feesStructure.Outbus,
    ].reduce((a, b) => a + b);
    this.feesStructure.Totalfees = totalFees

  }

  Savetoconfirm() {
    let body: any = {}
    body.id = this.newdata.id,
      body.fullName = this.newdata.fullName,
      body.email = this.newdata.email,
      body.phone = this.newdata.phone,
      body.dob = this.newdata.dob,
      body.fatherName = this.newdata.fatherName,
      body.motherName = this.newdata.motherName,
      body.boardOfExamination = this.newdata.boardOfExamination,
      body.stream = this.newdata.stream,
      body.marksObtained = this.newdata.marksObtained,
      body.percentage = this.newdata.percentage,
      body.yearOfPassing = this.newdata.yearOfPassing,
      body.homeAddress = this.newdata.homeAddress,
      body.Governmentquota = this.feesStructure.Governmentquota,
      body.Collegemanagement = this.feesStructure.Collegemanagement,
      body.dayscholar = this.feesStructure.dayscholar,
      body.Hosteler = this.feesStructure.Hosteler,
      body.Busfees = this.feesStructure.Busfees,
      body.totalFees = this.feesStructure.Totalfees
    body.BusNo = this.feeForm.value.Busno,
      body.BusStop = this.feeForm.value.city,
      this.setLocalStorage(body);
    this.showAlert('Your Seat is Conformed')

    const selectedObjectIndex = this.Waitingstudents.findIndex((student: { id: any; }) => student.id === this.newdata.id);
    this.Waitingstudents.splice(selectedObjectIndex, 1);
    localStorage.setItem("Waitingstudents", JSON.stringify(this.Waitingstudents));

  }
  setLocalStorage(body: any) {
    this.registerList.push(body)
    localStorage.setItem('conformstudents', JSON.stringify(this.registerList));
    this.router.navigate(['/layout/Waitingstudents'])
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
