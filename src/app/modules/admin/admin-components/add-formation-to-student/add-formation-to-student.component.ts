import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../../../../auth/services/admin/admin.service";

@Component({
  selector: 'app-add-formation-to-student',
  templateUrl: './add-formation-to-student.component.html',
  styleUrl: './add-formation-to-student.component.scss'
})
export class AddFormationToStudentComponent implements OnInit {


  students:any = [];
  formations:any = [];
  selectedStudentId: number | null = null;
  selectedFormationId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;


  validateForm: FormGroup;
  isSpinning:boolean = false;




  constructor(private service:AdminService,
              private fb:FormBuilder,
              private snackBar:MatSnackBar,
              private router: Router,
              private activatedRoute:ActivatedRoute,

  ){}

  ngOnInit(){
    // Charger les étudiants et les formations disponibles
    this.loadStudents();
    this.loadFormations();
  }


  loadStudents() {
    this.service.getAllStudents().subscribe((res) => {
      console.log(res);
      this.students = res;
    });
  }

  loadFormations(){
    this.service.getAllFormations().subscribe((res) => {
      console.log(res);
      this.formations = res;
    })
  }


  assignStudentToFormation(): void {
    console.log(this.selectedStudentId);
    console.log(this.selectedFormationId);

    if (this.selectedStudentId && this.selectedFormationId) {
      this.service.addStudentToFormation(this.selectedStudentId, this.selectedFormationId).subscribe({
        next: () => {
          this.successMessage = 'Étudiant assigné à la formation avec succès';
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'assignation de l\'étudiant à la formation';
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = 'Veuillez sélectionner un étudiant et une formation';
      this.successMessage = null;
    }
  }

}
