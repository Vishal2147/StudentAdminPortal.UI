import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { updateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

private baseApi="https://localhost:44305";

  constructor(private httpClient: HttpClient) { }



  getStudents():Observable<Student[]> {  // to call Student get API ie httpget
    return  this.httpClient.get<Student[]>(this.baseApi+"/student");    // returns an observable Array of student so wee need to subscribe in component.ts
  }

  getStudent(studentId : string) : Observable<Student>{

    var res= this.httpClient.get<Student>(this.baseApi+'/student/'+studentId);
    console.log(res);
    return res;
  }

  updateStudent(studentId: string, studentRequest:Student) : Observable<Student>{

       const updateStudentRequest :updateStudentRequest = {

         firstName: studentRequest.firstName,
         lastName: studentRequest.lastName,
         dateofBirth: studentRequest.dateofBirth,
         email: studentRequest.email,
         mobile: studentRequest.mobile,
         genderId: studentRequest.genderId,
         postalAddress: studentRequest.address.postalAddress,
         physicalAddress:studentRequest.address.postalAddress
    }

    return this.httpClient.put<Student>(this.baseApi+'/student/'+ studentId , updateStudentRequest);

  }

  deleteStudent(studentId: string) : Observable<Student>{
    return this.httpClient.delete<Student>(this.baseApi+'/student/'+studentId)
  }
}
