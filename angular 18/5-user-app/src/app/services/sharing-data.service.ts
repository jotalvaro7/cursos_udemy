import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private addNewUserSubject = new Subject<User>();
  private idUserSubject = new Subject<number>();

  addNewUser$ = this.addNewUserSubject.asObservable();
  idUser$ = this.idUserSubject.asObservable();


  constructor() { }

  addNewUser(user: User): void {
    this.addNewUserSubject.next(user);
  };

  idUser(id: number): void {
    this.idUserSubject.next(id);
  };

}
