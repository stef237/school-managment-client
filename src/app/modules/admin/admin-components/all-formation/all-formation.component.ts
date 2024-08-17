import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../auth/services/admin/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {of} from "rxjs";

@Component({
  selector: 'app-all-formation',
  templateUrl: './all-formation.component.html',
  styleUrl: './all-formation.component.scss'
})
export class AllFormationComponent implements OnInit {
  formation: any = { file: '' }; // Remplacez par la source réelle des fichiers
  sanitizedFileUrl: SafeResourceUrl | null = null;
  fileType: string = '';

  isSpinning:boolean = false;
  teachers =[];
  formations = [];

  constructor(private service: AdminService,
              private snackBar:MatSnackBar,
              private sanitizer: DomSanitizer,
  ){}

  ngOnInit(){
    this.getAllFormations();
    if (this.formation.file) {
      this.updateFileDisplay(this.formation.file);
    }
    this.service.getAllTeachers().subscribe((res) => {
      console.log(res);
      this.teachers = res;
    })
  }
  updateFileDisplay(fileUrl: string) {
    // Créez une URL d'objet sécurisée
    this.sanitizedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);

    // Déduisez le type de fichier
    this.fileType = this.getFileType(fileUrl);
  }

  getFileType(fileUrl: string): string {
    if (fileUrl.endsWith('.pdf')) {
      return 'application/pdf';
    }
    return '';
  }

  isPdf(fileUrl: string): boolean {
    return fileUrl.endsWith('.pdf');
  }


  getAllFormations(){
    this.service.getAllFormations().subscribe((res) => {
      console.log(res);
      this.formations = res;
    })
  }

  deleteFormation(id:number){
    console.log(id)
    this.service.deleteFormation(id).subscribe((res) =>{
      console.log(res)
      this.getAllFormations();
      this.snackBar.open("Formation supprimée avec success","Close",{duration:5000})
    })
  }

  assignTeacher(teacherId: any, formationId: number) {
    // Code pour assigner un enseignant à une formation
    this.isSpinning = true;
    this.service.assignTeacherToFormation(teacherId, this.formations ,formationId).subscribe((res) =>{
      this.isSpinning = false;
      if (null != res["id"]) {
        this.snackBar.open("Formation enregistrée avec success", "Close", {duration: 5000});

      } else {
        this.snackBar.open("Cette formation existe déjà", "Close", {duration: 5000})

      }
    })
  }

}
