import {Component, OnInit,} from '@angular/core';
import {AdminService} from "../../../../auth/services/admin/admin.service";
import { FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentService} from "../student-service/student.service";


@Component({
  selector: 'app-all-seance',
  templateUrl: './all-seance.component.html',
  styleUrl: './all-seance.component.scss',

})
export class AllSeanceComponent implements OnInit{

  validateForm: FormGroup;
  seances= [];



  constructor(private service: StudentService,
              private snackBar:MatSnackBar
  ){}

  ngOnInit(){
    this.getAllSeances();
  }


  getAllSeances(){
    this.service.getAllSeances().subscribe((res) => {
      console.log(res);
      this.seances = res;
    })
  }

/*

  addFormation(formationId:any): void {

    this.service.(formationId).subscribe(
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
  }

*/




}
