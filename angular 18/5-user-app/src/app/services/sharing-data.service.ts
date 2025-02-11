import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private addNewUserSubject = new Subject<User>();
  private idUserSubject = new Subject<number>();
  private findByIdSubject = new Subject<number>();
  private userSelectedSubject = new Subject<User>();

  addNewUser$ = this.addNewUserSubject.asObservable();
  idUser$ = this.idUserSubject.asObservable();
  findById$ = this.findByIdSubject.asObservable();
  userSelected$ = this.userSelectedSubject.asObservable();
  constructor() { }

  addNewUser(user: User): void {
    this.addNewUserSubject.next(user);
  };

  idUser(id: number): void {
    this.idUserSubject.next(id);
  };

  findById(id: number): void {
    this.findByIdSubject.next(id);
  };

  userSelected(user: User): void {
    this.userSelectedSubject.next(user);
  };

}
