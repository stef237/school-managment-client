import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../../../../auth/services/admin/admin.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-seance-to-formation',
  templateUrl: './add-seance-to-formation.component.html',
  styleUrl: './add-seance-to-formation.component.scss'
})
export class AddSeanceToFormationComponent implements OnInit {
  validateForm: FormGroup;
  isSpinning:boolean = false;
  date:FormControl ;
  today: Date = new Date();


  formationId: number = this.activatedRoute.snapshot.params['formationId'];

  constructor(private service:AdminService,
              private fb:FormBuilder,
              private snackBar:MatSnackBar,
              private router: Router,
              private activatedRoute:ActivatedRoute,
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      obtenu: ['', Validators.required],
      validite: ['', Validators.required]

    });

  }
  onStartDateChange(event: any): void {
    const startDate = new Date(event.value);
    const endDate = new Date(startDate);


    if (endDate.getDate() !== startDate.getDate()) {
      endDate.setHours(23, 59, 59, 999);
    }

    this.validateForm.get('validite')?.setValue(endDate);
  }

  addSeance(formationId: number) {
    this.service.addSeanceToFormation(this.formationId, this.validateForm.value).subscribe((res)=>{
      console.log(res);
      if (res.id != null) {
        this.snackBar.open("Seance ajouter avec successfully", "SUCCESS", { duration: 5000 });
        this.router.navigateByUrl('/admin/seances');
      } else {
        this.snackBar.open("Seance existe ", "ERROR", { duration: 5000 });
        this.router.navigateByUrl('/admin/seances');
      }
    })
  }




}
