import { BookData } from './components/admin/book-data.model';
 
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
 

@Injectable({
    providedIn: 'root'
  })
  export class BookService {
    constructor(private _http:HttpClient,private _router:Router) { }  



addbook(title:string,
  pagecount:string,
  publishdate: string,
  thumbnailUrl: string,
  shortdescrption: string,
  longdescrption: string,
  author: string,
  categories: string,
  price: string,
  currency: string,
  discount: string,){
  const BookData: BookData = { title:title,  pagecount:pagecount,
    publishdate:publishdate,thumbnailUrl: thumbnailUrl, shortdescrption: shortdescrption,
    longdescrption:longdescrption,author:author,categories:categories,price:price,currency:currency,discount:discount};
  this._http
    .post("http://localhost:3000/api/addbook", BookData)
    .subscribe(() => {
      this._router.navigate(["/admin"]);
    });
}
}