import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private tostr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        if(error){
          switch(error.status){
            case 400: 
            if(error.error.errors){
              const modalStateErrors = [];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modalStateErrors.push(key);
                }
              }
              throw modalStateErrors.flat();
            }else{
              this.tostr.error(error.starusText, error.status)
            }
            break;
            case 401:
              this.tostr.error(error.starusText, error.status); break;
            case 404:
              this.router.navigateByUrl('/not-found'); break;
            case 500:
              const navigationExtras: NavigationExtras = {state:{error:error.error}}
              this.router.navigateByUrl('/server-error', navigationExtras);  break;
              default:
                this.tostr.error("Something unexpected went wrong.");
          }
        }
        return throwError(error);
      })
    )
  }
}
