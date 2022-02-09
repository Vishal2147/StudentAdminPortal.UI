import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

private baseApi="https://localhost:44305";

  constructor(private httpClient: HttpClient) { }



  getStudents():Observable<Student[]> {  // to call Student get API ie httpget
    return  this.httpClient.get<Student[]>(this.baseApi+"/student");    // returns an observable Array of student so wee need to subscribe in component.ts
  }
}
