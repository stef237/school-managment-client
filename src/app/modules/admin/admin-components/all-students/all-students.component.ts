import {Component, OnInit} from '@angular/core';
import { AdminService } from '../../../../auth/services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.scss'
})
export class AllStudentsComponent implements OnInit {

  students = [];
  displayedColumns: string[] = ['name', 'studentClass', 'email', 'address', 'birthDate', 'gender', 'actions'];

  validateForm: FormGroup;
  isSpinning:boolean = false;
  formation: any = [];
  studentId: number = this.activatedRoute.snapshot.params['studentId'];
  formationId: number= this.activatedRoute.snapshot.params['formationId'];



  constructor(private service: AdminService,
              private snackBar:MatSnackBar,
              private activatedRoute:ActivatedRoute,
  ){}

  ngOnInit(){
    this.getAllStudents();
  }

  getAllStudents(){
    this.service.getAllStudents().subscribe((res) => {
      console.log(res);
      this.students = res;
    });

  }

  deleteStudent(studentId:number){
    this.service.deleteStudent(studentId).subscribe((res) =>{
      console.log(res)
      this.getAllStudents();
      this.snackBar.open("Adhérent supprimé avec success","Close",{duration:5000})
    })
  }


}

