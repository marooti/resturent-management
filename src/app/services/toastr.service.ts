import { Injectable } from '@angular/core';
import { ToastrService as Toastr } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(
    private toastr: Toastr
  ) { }


  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }
}
