import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../auth/services/admin/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-all-formation',
  templateUrl: './detail-formation.component.html',
  styleUrl: './detail-formation.component.scss'
})
export class DetailFormationComponent implements OnInit {

  isSpinning:boolean = false;
  displayedColumns: string[] = ['name'];
  formations: [] = [];
  seances = [];
  studentId: number = this.activatedRoute.snapshot.params['studentId'];
  formationId: number | null = null;
  students = [];
  constructor(private service: AdminService,
              private snackBar:MatSnackBar,
              private sanitizer: DomSanitizer,
              private activatedRoute:ActivatedRoute,

              private router:Router,
  ){}

  ngOnInit(): void {
    this.loadStudents();
    // Récupérer l'ID de la formation depuis les paramètres de l'URL
    this.formationId = Number(this.activatedRoute.snapshot.paramMap.get('formationId'));

    this.service.getFormationsByStudentId(this.studentId).subscribe((data: []) => {
      this.formations = data;
    });

    // Charger les séances associées à la formation

    this.service.getSeancesByFormationId(this.formationId).subscribe(
      (data) => {
        this.seances = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des séances:', error);
      }
    );

  }




  loadStudents() {
    if (this.formationId) {
      this.service.getStudentsByFormation(this.formationId).subscribe(
        (students) => {
          this.students = students;
        },
        (error) => {
          console.error('Erreur lors du chargement des étudiants', error);
        }
      );
    }
  }

}
