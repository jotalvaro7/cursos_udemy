import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  public async show(title: string, text: string, icon: string, showCancelButton: boolean, confirmButtonColor: string, cancelButtonColor: string, confirmButtonText: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon as SweetAlertIcon,
      showCancelButton: showCancelButton,
      cancelButtonColor: cancelButtonColor,
      confirmButtonText: confirmButtonText,
      confirmButtonColor: confirmButtonColor,
    });
  }
}
