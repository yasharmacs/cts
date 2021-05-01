import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addbook!: FormGroup;
 
  constructor(public fb:FormBuilder,private bookservice: BookService) { }

  ngOnInit(): void {
    this.addbook=this.fb.group({
      title: new FormControl('',[
        Validators.required,
      ]),
        pagecount: new FormControl('',[
          Validators.required,
        ]),
        publishdate: new FormControl('',[
          Validators.required,
        ]),
        thumbnailUrl: new FormControl('',[
          Validators.required,
        ]),
        shortdescrption: new FormControl('',[
          Validators.required,
        ]),
        longdescrption: new FormControl('',[
          Validators.required,
        ]),
        price: new FormControl('',[
          Validators.required,
        ]),
         currency: new FormControl('',[
          Validators.required,
        ]),
        discount: new FormControl('',[
          Validators.required,
        ]),
        author: new FormControl('',[
          Validators.required,
        ]),
        categories: new FormControl('',[
          Validators.required,
        ]),




})
  }


get title():AbstractControl{
  return this.addbook.controls['title'];
}
get pagecount(): AbstractControl{
  return this.addbook.controls['pagecount'];
}
get publishdate(): AbstractControl{
  return this.addbook.controls['publishdate'];
}
get thumbnailUrl(): AbstractControl{
  return this.addbook.controls['thumbnailUrl'];
}
get shortdescrption(): AbstractControl{
  return this.addbook.controls['shortdescrption'];
}
get longdescrption(): AbstractControl{
  return this.addbook.controls['longdescrption'];
}
get price(): AbstractControl{
  return this.addbook.controls['price'];
}
get currency(): AbstractControl{
  return this.addbook.controls['currency'];
}
get discount(): AbstractControl{
  return this.addbook.controls['discount'];
}
get author(): AbstractControl{
  return this.addbook.controls['author'];
}
get categories(): AbstractControl{
  return this.addbook.controls['categories'];
}


datacapture(){
  // //console.log(this.addbook.value);
  // console.log(this.publishdate.value);
 this.bookservice.addbook(this.title.value,this.pagecount.value,this.publishdate.value,this.thumbnailUrl.value,
   this.shortdescrption.value,this.longdescrption.value,this.author.value,this.categories.value,this.price.value,
   this.currency.value,this.discount.value);

}
}
