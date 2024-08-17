import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StudentService} from "../student-service/student.service";

@Component({
  selector: 'app-my-seance',
  templateUrl: './my-seance.component.html',
  styleUrl: './my-seance.component.scss'
})
export class MySeanceComponent implements OnInit {

  seances:any[] = [];
  isSpinning:boolean = false;

  constructor(private service:StudentService,
              private router:Router,
  ) {}


  ngOnInit(): void {
    this.loadSeances();
  }

  loadSeances(){
    this.isSpinning = true;
    this.service.getAllSeanceByUserId().subscribe((res) =>{
      console.log(res);
      this.isSpinning = false;
      this.seances = res;
    })
  }

}
