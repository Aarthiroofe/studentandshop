import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  Addproduct: FormGroup;
  editproduct: FormGroup
  productgroup: any = []
  productdetails: any = []
  deletedata: any;
  public isVisible: boolean = false;
  message: any;
  editdata: any;
  page = 1;
  pageSize = 5;
  totalPages!: number;
  constructor() {
    this.Addproduct = new FormGroup({
      productname: new FormControl(''),
      productgroup: new FormControl(''),
      stock: new FormControl(''),
      Mrp: new FormControl(''),
    });
    this.editproduct = new FormGroup({
      editproductname: new FormControl(''),
      editproductgroup: new FormControl(''),
      editstock: new FormControl(''),
      editMrp: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.productdetails = JSON.parse(localStorage.getItem('productdetails') || '[]')
    this.productgroup = JSON.parse(localStorage.getItem('productgrouparray') || '[]')
    this.totalPages = Math.ceil(this.productdetails.length / this.pageSize);
  }
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  addproductname() {
    this.Addproduct.value.id = this.generateId();
    this.productdetails.push(this.Addproduct.value)
    localStorage.setItem("productdetails", JSON.stringify(this.productdetails));
    this.Addproduct.reset()
  }
  addproductcancel() {
    this.Addproduct.reset()
  }
  deletedproduct(product: any) {
    this.deletedata = product;
  }
  deleteproduct() {
    const selectedObjectIndex = this.productdetails.findIndex((product: { id: any; }) => product.id === this.deletedata.id);
    this.productdetails.splice(selectedObjectIndex, 1);
    localStorage.setItem("productdetails", JSON.stringify(this.productdetails));
    this.showAlert('Product Deleted')
  }
  editdetails(product: any) {
    this.editdata = product;
    this.editproduct.patchValue({
      editproductname: this.editdata.productname,
      editproductgroup: this.editdata.productgroup,
      editstock: this.editdata.stock,
      editMrp: this.editdata.Mrp,
    })
  }
  editproductname() {
    const selectedObjectIndex = this.productdetails.findIndex((product: { id: any; }) => product.id === this.editdata.id);
    this.productdetails[selectedObjectIndex].productname = this.editproduct.value.editproductname;
    this.productdetails[selectedObjectIndex].productgroup = this.editproduct.value.editproductgroup;
    this.productdetails[selectedObjectIndex].stock = this.editproduct.value.editstock;
    this.productdetails[selectedObjectIndex].Mrp = this.editproduct.value.editMrp;
    localStorage.setItem("productdetails", JSON.stringify(this.productdetails));
    this.showAlert('Edited')
    this.editproduct.reset()
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
    let pageCount = Math.ceil(this.productdetails.length / this.pageSize);
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
