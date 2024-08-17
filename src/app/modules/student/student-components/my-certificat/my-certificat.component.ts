import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StudentService} from "../student-service/student.service";

@Component({
  selector: 'app-my-certificat',
  templateUrl: './my-certificat.component.html',
  styleUrl: './my-certificat.component.scss'
})
export class MyCertificatComponent implements OnInit {

  certificats: any =[];
  isSpinning:boolean = false;

  constructor(private service:StudentService,
              private router:Router,
  ) {}


  ngOnInit(): void {
    this.loadCertificats();

  }

  loadCertificats(){
    this.isSpinning = true;
    this.service.getAllCertificatByUserId().subscribe((res) =>{
      console.log(res);
      this.isSpinning = false;
      this.certificats = res;
    })
  }
}
