import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './student-components/dashboard/dashboard/dashboard.component';
import { studentGuard } from '../../auth/guards/student/student.guard';
import { ApplyPermitComponent } from './student-components/student-permit/apply-permit/apply-permit.component';
import { GetAllPermitsComponent } from './student-components/get-all-permits/get-all-permits.component';
import { UpdateStudentComponent } from './student-components/update-student/update-student.component';
import {UpdateSeanceComponent} from "../admin/admin-components/update-seance/update-seance.component";
import {UpdateFormationComponent} from "../admin/admin-components/update-formation/update-formation.component";
import {AllCertificatComponent} from "../admin/admin-components/all-certificat/all-certificat.component";
import {UpdateCertificatComponent} from "../admin/admin-components/update-certificat/update-certificat.component";
import {AllSeanceComponent} from "./student-components/all-seance/all-seance.component";
import {AllFormationComponent} from "./student-components/all-formation/all-formation.component";
import {MyFormationComponent} from "./student-components/my-formation/my-formation.component";
import {MySeanceComponent} from "./student-components/my-seance/my-seance.component";
import {MyCertificatComponent} from "./student-components/my-certificat/my-certificat.component";


const routes: Routes = [
  {path:"profil",component:DashboardComponent, canActivate:[studentGuard]},
  {path:"permit",component:ApplyPermitComponent, canActivate:[studentGuard]},
  {path:"permits",component:GetAllPermitsComponent, canActivate:[studentGuard]},
  {path:"update",component:UpdateStudentComponent, canActivate:[studentGuard]},


  {path: "seances", component:AllSeanceComponent, canActivate:[studentGuard]},
  {path: "seance", component:MySeanceComponent, canActivate:[studentGuard]},
  {path: "formations", component:AllFormationComponent, canActivate:[studentGuard]},
  {path: "formation/:formationId", component:UpdateFormationComponent,canActivate:[studentGuard]},
  {path: "certificats", component:AllCertificatComponent, canActivate:[studentGuard]},
  {path: "certificat", component:MyCertificatComponent, canActivate:[studentGuard]},
  {path: "formation", component:MyFormationComponent, canActivate:[studentGuard]},
  /* {path: "chat", component: HomeChatComponent, canActivate:[studentGuard]},
 */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
