import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';



@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
  public webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  array: any = 10
  AddStudent: FormGroup;
  public isVisible: boolean = false;
  message: any;
  body: any = {}
  imageUrl: any
  Waitingstudents: any = []
  currentdate: any
  futureDate: any;
  cameraenable: boolean = false
  constructor(private router: Router) {
    this.AddStudent = new FormGroup({
      id: new FormControl(''),
      fullName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      homeAddress: new FormControl(''),
      fatherName: new FormControl(''),
      motherName: new FormControl(''),
      dob: new FormControl(''),
      marksObtained: new FormControl(''),
      percentage: new FormControl(''),
      boardOfExamination: new FormControl(''),
      stream: new FormControl(''),
      yearOfPassing: new FormControl(''),

    });
  }

  ngOnInit(): void {
    let z: any = localStorage.getItem("Waitingstudents")
    if (z != null && z != undefined && z != "") {
      this.Waitingstudents = JSON.parse(z)
    } else {
      this.Waitingstudents = []
    }
    var date = new Date()
    this.currentdate = date.toLocaleDateString("de-DE");
    date.setMonth(date.getMonth() + 3);
    this.futureDate = date.toLocaleDateString("de-DE")

  }
  submit() {
    if (this.AddStudent.valid) {
      this.body.fullName = this.AddStudent.value.fullName;
      this.body.email = this.AddStudent.value.email;
      this.body.phone = this.AddStudent.value.phone;
      this.body.homeAddress = this.AddStudent.value.homeAddress;
      this.body.fatherName = this.AddStudent.value.fatherName;
      this.body.motherName = this.AddStudent.value.motherName;
      this.body.dob = this.AddStudent.value.dob;
      this.body.marksObtained = this.AddStudent.value.marksObtained;
      this.body.percentage = this.AddStudent.value.percentage;
      this.body.boardOfExamination = this.AddStudent.value.boardOfExamination;
      this.body.stream = this.AddStudent.value.stream;
      this.body.yearOfPassing = this.AddStudent.value.yearOfPassing;
      this.body.image = this.url
      this.setLocalStorage(this.body);

    }
  }
  setLocalStorage(body: any) {
    body.id = this.Waitingstudents.length + 1
    this.Waitingstudents.push(body)
    localStorage.setItem('Waitingstudents', JSON.stringify(this.Waitingstudents));

    let x = JSON.parse(localStorage.getItem('Waitingstudents') || '[]')
    this.showAlert('Your Id Generated')
  }



  showAlert(msg: any): void {
    if (this.isVisible) {
      return;
    }
    this.message = msg
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 2500)
  }
  url = "../../../assets/img/logo.jpg"
  onselectFile(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: any = fileList[0];
      let reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }
  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.url = webcamImage.imageAsDataUrl
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  cameraon() {
    this.cameraenable = !this.cameraenable
  }
  printIDCard() {
    const content = `
        <div id="printSection">
          <style>
            #printSection{display: block !important;}
            body *{visibility: hidden;}
            .alert{display:none}
            #printSection, #printSection *{visibility: visible;}
            #printSection{
              position: absolute;top: 1%; left:20%;right:20%; width: 60%; 
              padding:1rem;border:30px solid palegreen;  border-radius:20px; background: lavenderblush;
               background-image: linear-gradient(to right, #2C3E50, #3498DB);color: white;
            }
            table{font-size: 25px;
            }
            h3{
              font-size: 40px;
            }
            .idimage {
               border-radius: 100px; height: 100px; width: 100px;
            }
             .idtop{text-align:center;} 
             }
          </style>
          <div >
                    <div class="idtop" >
                    <h3>Temporary ID Card</h3>
                    <br>
                    <img src=${this.url} class="idimage">
                    <br>
                        <h4>${this.body.fullName}</h4>
                    </div>
                    <table>
                        <tr>
                            <td>Student Temporary ID</td>
                            <td>:</td>
                            <td>${this.body.id}</td>
                        </tr>
                        <tr>
                            <td>Stream</td>
                            <td>:</td>
                            <td>${this.body.stream}</td>
                        </tr>
                        <tr>
                            <td>Issue Date</td>
                            <td>:</td>
                            <td>${this.currentdate}</td>
                        </tr>
                        <tr>
                            <td>Expiration Date</td>
                            <td>:</td>
                            <td>${this.futureDate}</td>
                        </tr>
                    </table>
                </div>
        </div>
      `;
    const printElement = document.createElement('content');
    printElement.innerHTML = content;
    // printElement.setAttribute("style", "font-size: 30px;color:red;padding:1rem;border:2px solid red;");
    // printElement.classList.add("idcard");
    document.body.appendChild(printElement);
    window.print();
    document.body.removeChild(printElement);
    this.AddStudent.reset();
    this.url = "../../../assets/img/logo.jpg"
  }
  idnoprint() {
    this.AddStudent.reset();
    this.url = "../../../assets/img/logo.jpg"
  }
}