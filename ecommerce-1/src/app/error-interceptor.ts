import { ErrorComponent } from './components/error/error.component';
import {MatDialog} from '@angular/material/dialog';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialog:MatDialog){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      
      return next.handle(req).pipe(
          catchError((error:HttpErrorResponse)=>{
           let errorMessage = "An unknown error occurred!";
            if (error.error.message) {
              errorMessage = error.error.message;
            }
               this.dialog.open(ErrorComponent,{data: {message: errorMessage}})
              return throwError(error);
          })
      );
    }
  }
  