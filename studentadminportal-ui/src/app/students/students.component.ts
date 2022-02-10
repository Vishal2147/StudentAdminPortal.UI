import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {


  filterString : string="";
   students: Student[]=[];
   displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender' ,'edit'];  // for table display

    dataSource: MatTableDataSource<Student> =new MatTableDataSource<Student>();


    // for paginator
   @ViewChild(MatPaginator) matPagintor!: MatPaginator;

    //ends

    // for sorting table
    @ViewChild(MatSort) matSort!: MatSort;
    //ends

  constructor(private studentService: StudentService) { }    //inject student service

  ngOnInit(): void {

    //fetch students
     // without subscribe not http call will be made

        const observableStudents= this.studentService.getStudents();

         observableStudents.subscribe(
           (sucessResponse) =>{
             this.students=sucessResponse;  // map the response of api model to ui student class
             this.dataSource=new MatTableDataSource<Student>(this.students);

             if(this.matPagintor){
               this.dataSource.paginator=this.matPagintor;     // assign paginator to datasource
             }

             if(this.matSort){                          // for sorting assign sort to datasource
               this.dataSource.sort=this.matSort;
             }

           }
         );

         observableStudents.subscribe(
          (errorResponse) =>{
            console.log(errorResponse);
          }
        );

}

filterStudents(){
  this.dataSource.filter=this.filterString.trim().toLowerCase();
}


}
