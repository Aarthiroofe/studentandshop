import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productgroup',
  templateUrl: './productgroup.component.html',
  styleUrls: ['./productgroup.component.scss']
})
export class ProductgroupComponent implements OnInit {

  AddGroup: FormGroup;
  EditGroup: FormGroup;
  productgroup: any = []
  body: any = {}
  public isVisible: boolean = false;
  message: any;
  deletedata: any;
  editdata: any;
  page = 1;
  pageSize = 5;
  totalPages!: number;
  constructor() {
    this.AddGroup = new FormGroup({
      Groupname: new FormControl(''),
    });
    this.EditGroup = new FormGroup({
      replacename: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.productgroup = JSON.parse(localStorage.getItem('productgrouparray') || '[]')
    this.totalPages = Math.ceil(this.productgroup.length / this.pageSize);
  }
  addgroupname() {
    let body: any = {}
    body.gropname = this.AddGroup.value.Groupname
    body.id = this.productgroup.length + 1
    this.productgroup.push(body)
    localStorage.setItem('productgrouparray', JSON.stringify(this.productgroup));
    this.showAlert('New Product Group Added')
    this.AddGroup.reset()
  }
  canceldialogue() {
    this.AddGroup.reset()
  }

  editdialogue(product: any) {
    this.editdata = product;
    this.EditGroup.patchValue({ replacename: this.editdata.gropname })
  }
  deletedialogue(product: any) {
    this.deletedata = product

  }
  deleteproduct() {
    const selectedObjectIndex = this.productgroup.findIndex((product: { id: any; }) => product.id === this.deletedata.id);
    this.productgroup.splice(selectedObjectIndex, 1);
    localStorage.setItem("productgrouparray", JSON.stringify(this.productgroup));
    this.showAlert('Product Deleted')
  }
  editproductname() {
    const selectedObjectIndex = this.productgroup.findIndex((product: { id: any; }) => product.id === this.editdata.id);
    this.productgroup[selectedObjectIndex].gropname = this.EditGroup.value.replacename
    localStorage.setItem("productgrouparray", JSON.stringify(this.productgroup));
    this.showAlert('Edited')
    this.EditGroup.reset()
  }
  editproductcancel() {
    this.EditGroup.reset()
  }
  showAlert(msg: any): void {
    if (this.isVisible) {
      return;
    }
    this.message = msg
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 2500)
  }
  // paginator
  get pages(): number[] {
    let pageCount = Math.ceil(this.productgroup.length / this.pageSize);
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
}
