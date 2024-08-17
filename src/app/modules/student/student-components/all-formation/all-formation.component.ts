import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../auth/services/admin/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {StudentService} from "../student-service/student.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-all-formation',
  templateUrl: './all-formation.component.html',
  styleUrl: './all-formation.component.scss'
})
export class AllFormationComponent implements OnInit {


  formations :any [] = [];


  constructor(private service: StudentService,
              private snackBar:MatSnackBar,
              private sanitizer: DomSanitizer,
              private activatedRoute:ActivatedRoute,
  ){}

  ngOnInit(){
    this.getAllFormations();

    }

  getAllFormations(){
    this.service.getAllFormations().subscribe((res) => {
      console.log(res);
      this.formations = res;
    })
  }

  applyFormation(formationId: number ) {
    this.service.addUserToFormation(this.formations, formationId).subscribe(

      res => {
        this.snackBar.open('Inscription à la formation réussie avec succes.', 'Fermer', {
          duration: 3000
        });
    }, error => {
        this.snackBar.open('Erreur lors de l\'inscription','Fermer', {
          duration: 3000
        });
    });
  }
/*  applyFormation(studentId: number, formationId: number){
    this.service.addFormationToStudent(this.formations,formationId).subscribe(

      res => {
        this.snackBar.open('Formation ajoutée à votre liste personnelle.', 'Fermer', {
          duration: 3000
        });
      },
      error => {
        this.snackBar.open('Erreur lors de l\'ajout de la formation.', 'Fermer', {
          duration: 3000
        });
      }
    );
  }*/

}
