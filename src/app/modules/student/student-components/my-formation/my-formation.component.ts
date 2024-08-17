import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StudentService} from "../student-service/student.service";

@Component({
  selector: 'app-my-formation',
  templateUrl: './my-formation.component.html',
  styleUrl: './my-formation.component.scss'
})
export class MyFormationComponent implements OnInit {

  formations:any[] = [];
  isSpinning:boolean = false;

  constructor(private service:StudentService,
              private router:Router,
  ) {}


  ngOnInit(): void {
    this.loadFormations();

  }

  loadFormations(){
    this.isSpinning = true;
    this.service.getFormationsByStudentId().subscribe((res) =>{
      console.log(res);
      this.isSpinning = false;
      this.formations = res;
    })
  }

}
