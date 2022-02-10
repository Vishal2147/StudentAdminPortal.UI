import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/sevices/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

   studentId: string | null | undefined;
    student : Student={
          id:"",
          firstName:"",
          lastName: "",
          dateofBirth:"",
          email:"",
          mobile:0,
          genderId: "",
          profileImageUrl: "",
          gender: {
            id:"",
            description:""
          },
          address:{
            id:"",
            physicalAddress:"",
            postalAddress:""
          }

    }

    genderList: Gender[]=[];

  constructor(private readonly studentService: StudentService ,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackbar: MatSnackBar,
    private router: Router) { }               // injecting service
                                                          // ActivatedRoute to take details out of url
  ngOnInit(): void {
    this.route.paramMap.subscribe(
         (params) => {
          this.studentId=params.get('id');

            if(this.studentId){
              var response =this.studentService.getStudent( this.studentId);

               response.subscribe((successResponse) => this.student=successResponse);

            }


          }
    );
    // to get gender list from api
      this.genderService.getGenderList().subscribe(
          (successResponse)=> {
              this.genderList=successResponse;
       }
    )
  }



    onUpdate():void {
    // Call student service to update student
     var updatesResponse=this.studentService.updateStudent(this.student.id, this.student);

     updatesResponse.subscribe(
       (successResponse)=> {
      this.snackbar.open("Student updated Successfully",undefined, {
         duration:2000
      })
       }
     );

     updatesResponse.subscribe(
       (errorResponse) => console.log(errorResponse)
     );


    }

    onDelete(): void{
      //student service to delete api
     var res= this.studentService.deleteStudent(this.student.id);

     res.subscribe(
       (successResponse)=> this.snackbar.open("Student deleted Successfully", undefined, {
         duration:2000
       })
     );

     setTimeout(()=> {                   // to navigate back to student page after deletion after 2 sec
      this.router.navigateByUrl('students');
     },2000);

     res.subscribe(
      (errorResponse)=> console.log(errorResponse)
    );
    }

}
