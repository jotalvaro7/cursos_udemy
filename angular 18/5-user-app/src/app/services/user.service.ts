import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'john.doe',
      password: 'password'
    },
    {
      id: 2,
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      username: 'jane.smith',
      password: 'password'
    },
    {
      id: 3,
      name: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      username: 'alice.johnson',
      password: 'password'
    },
    {
      id: 4,
      name: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      username: 'bob.brown',
      password: 'password'
    },
    {
      id: 5,
      name: 'Charlie',
      lastName: 'Davis',
      email: 'charlie.davis@example.com',
      username: 'charlie.davis',
      password: 'password'
    },
    {
      id: 6,
      name: 'Diana',
      lastName: 'Evans',
      email: 'diana.evans@example.com',
      username: 'diana.evans',
      password: 'password'
    }
  ];

  constructor() { }


  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
