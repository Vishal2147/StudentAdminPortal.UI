import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';
import { Student } from '../models/api-models/student.model';
import { updateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

private baseApi= environment.baseApiUrl;

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

  addStudent(studentRequest:Student) : Observable<Student>{
    const addStudentRequest :AddStudentRequest = {

      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateofBirth: studentRequest.dateofBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      postalAddress: studentRequest.address.postalAddress,
      physicalAddress:studentRequest.address.postalAddress
  };

      return  this.httpClient.post<Student>(this.baseApi+'/student/add',addStudentRequest);

}

uplaodImage(studentId: string, file:File) :Observable<string> {
  const formData=new FormData();

  formData.append("profileImage", file);

  return this.httpClient.post(this.baseApi+'/student/'+studentId+ '/upload-image', formData, {
    responseType:'text'
  })
}

getImagePath(relativePath: string){
  return `${this.baseApi}/${relativePath}`;
}
}
