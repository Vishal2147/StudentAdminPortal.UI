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
   isNewStudent=false;
   header='';
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

    displayProfileImageUrl:string ='';

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

              //if route contains keyword add
              //this will be create student fuctionality

              if(this.studentId.toLowerCase()=== 'Add'.toLowerCase()){
                      this.isNewStudent=true;
                      this.header='Add New Student';
                      this.setImage();
              }else{
                    //otherwise existing student functionality
                    this.isNewStudent=false;
                    this.header="Edit Student";

                    var response =this.studentService.getStudent( this.studentId);

                    response.subscribe((successResponse) => this.student=successResponse);
                    this.setImage();

                    response.subscribe((errorResponse) => this.setImage());

              }
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

    onAdd(): void{
     var res= this.studentService.addStudent(this.student);

      res.subscribe(
        (successResponse)=> this.snackbar.open("Student Added Successfully", undefined, {
          duration:2000})
      );

      setTimeout(() => {
        this.router.navigateByUrl("students/${successResponse.id}");
      },2000);
    }

    public setImage():void{

      if(this.student.profileImageUrl){
            // Fetch the Image url
            this.displayProfileImageUrl=this.studentService.getImagePath(this.student.profileImageUrl);
      }else{
             //Display a default image
             this.displayProfileImageUrl="/assets/user.png";

      }

    }

    uploadImage(event: any):void{
       if(this.studentId){
         const file:File = event.target.files[0];
        var res= this.studentService.uplaodImage(this.studentId,file);

        res.subscribe((successResponse)=> {
          this.student.profileImageUrl=successResponse;
          this.setImage();

          this.snackbar.open("Image uploaded Successfully", undefined, {
            duration:2000})
        })

       }
    }

  }
