import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../../auth/services/admin/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-post-seance',
  templateUrl: './post-seance.component.html',
  styleUrl: './post-seance.component.scss'
})


export class PostSeanceComponent implements OnInit {


  validateForm: FormGroup;
  isSpinning:boolean = false;
  date:FormControl ;
  today: Date = new Date();

  constructor(private service:AdminService,
              private fb:FormBuilder,
              private snackBar:MatSnackBar,
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


    // Si la date de fin dépasse minuit, elle reste le même jour avec un maximum de 10 heures
    if (endDate.getDate() !== startDate.getDate()) {
      endDate.setHours(23, 59, 59, 999);
    }

    this.validateForm.get('validite')?.setValue(endDate);
  }

  postSeance(){
    console.log(this.validateForm.value);
    this.isSpinning = true;
    this.service.addSeance(this.validateForm.value).subscribe((res) =>{
      this.isSpinning = false;
      if(res.id != null){
        this.snackBar.open("Seance ajoutée avec success","Close",{duration:5000});
      }else{
        this.snackBar.open("Seance existe déjà","Close",{duration:5000})
      }
    })
  }

}
