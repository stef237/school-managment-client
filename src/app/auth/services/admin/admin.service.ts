import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import {Observable, of, throwError} from 'rxjs';


const BASIC_URL =  ["http://localhost:8080/api/admin/"]
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addStudent(studentDto:any):Observable<any>{
    return this.http.post<[]>(BASIC_URL+"student",studentDto,{
      headers: this.createAuthorizationHeader(),
    });

  }

  getAllStudents():Observable<any>{
    return this.http.get<[]>(BASIC_URL+"students",{
      headers:this.createAuthorizationHeader()
    })
  }

  deleteStudent(id:any):Observable<any>{
    return this.http.delete<[]>(BASIC_URL+`student/${id}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  getStudentById(studentId:any):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`student/${studentId}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  updateStudent(studentId:number,studentDto:any):Observable<any>{
    return this.http.put<[]>(BASIC_URL+`student/${studentId}`,studentDto,{
      headers:this.createAuthorizationHeader(),
    });
  }

  getAllAppliedPermits():Observable<any>{
    return this.http.get<[]>(BASIC_URL+`permits`,{
      headers:this.createAuthorizationHeader()
    })
  }

  changePermitStatus(permitId:number,status:string):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`permit/${permitId}/${status}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  addTeacher(teacherDto:any):Observable<any>{
    return this.http.post<[]>(BASIC_URL+"teacher",teacherDto,{
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteTeacher(teacherId:any):Observable<any>{
    return this.http.delete<[]>(BASIC_URL+`teacher/${teacherId}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  getAllTeachers():Observable<any>{
    return this.http.get<[]>(BASIC_URL+"teachers",{
      headers:this.createAuthorizationHeader()
    })
  }

  getTeacherById(teacherId:any):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`teacher/${teacherId}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  updateTeacher(teacherId:number,teacherDto:any):Observable<any>{
    return this.http.put<[]>(BASIC_URL+`teacher/${teacherId}`,teacherDto,{
      headers:this.createAuthorizationHeader(),
    });
  }


  createAuthorizationHeader():HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization","Bearer "+ StorageService.getToken()
    );
  }

  payFee(studentId:number,feeDto:any):Observable<any>{
    return this.http.post<[]>(BASIC_URL+`fee/${studentId}`,feeDto,{
      headers: this.createAuthorizationHeader(),
    });

  }


  // Méthodes pour les séances

  getAllSeances(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + 'seances',{
      headers:this.createAuthorizationHeader()
    });
  }


  getSeanceById(seanceId:any):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`seance/${seanceId}`,{
      headers:this.createAuthorizationHeader()
    })
  }
  addSeance(seanceDto: any): Observable<any>{
    return this.http.post<[]>(BASIC_URL + 'seance',seanceDto,{
      headers:this.createAuthorizationHeader(),
    });
  }
  updateSeance(seanceId: number, seanceDto: any): Observable<any>{
    return this.http.put<[]>(BASIC_URL + `seance/${seanceId}`,seanceDto,{
      headers:this.createAuthorizationHeader(),
    });
  }
  deleteSeance(seanceId: any): Observable<any>{
    return this.http.delete<[]>(BASIC_URL + `seance/${seanceId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  public setStatus(seanceId:number) : Observable<boolean>{
    let Seance: any;
    Seance = this["Seance"].find((seanceDto: { seanceId: number; }) => seanceDto.seanceId == seanceId);
    if (Seance != undefined){
      Seance.status=!Seance.status;
      return of(true);
    }else return throwError(()=>new Error("Seance not found "))
  }


  // Méthodes pour les formations

  getAllFormations(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + 'formations', {
      headers:this.createAuthorizationHeader(),
    });
  }

  getFormationById(formationId:any):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`formation/${formationId}`,{
      headers:this.createAuthorizationHeader()
    })
  }
  addFormation(formationDto: any): Observable<any>{
    return this.http.post<[]>(BASIC_URL + 'formation',formationDto,{
      headers:this.createAuthorizationHeader(),
    });
  }
  updateFormation(formationId: number, formationDto: any): Observable<any>{
    return this.http.put<[]>(BASIC_URL + `formation/${formationId}`,formationDto,{
      headers:this.createAuthorizationHeader(),
    });
  }
  deleteFormation(formationId: any): Observable<any>{
    return this.http.delete<[]>(BASIC_URL + `formation/${formationId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Méthodes pour les certificats
  getAllCertificats(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + 'certificats', {
      headers:this.createAuthorizationHeader(),
    });
  }

  addCertificat(certificatDto: any): Observable<any>{
    return this.http.post<[]>(BASIC_URL + 'certificat',certificatDto,{
      headers:this.createAuthorizationHeader(),
    });
  }
  getCertificatById(certificatId: number): Observable<any>{
    return this.http.get(BASIC_URL + `certificat/${certificatId}`, {
      headers:this.createAuthorizationHeader(),
    })
  }
  updateCertificat(certificatId: number, certificatDto: any): Observable<any>{
    return this.http.put<[]>(BASIC_URL + `certificat/${certificatId}`,certificatDto,{
      headers:this.createAuthorizationHeader(),
    });
  }

  deleteCertificat(certificatId: any): Observable<any>{
    return this.http.delete<[]>(BASIC_URL + `certificat/${certificatId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

/* ====== Methodes spécifiques ==========*/

// Ajouter une séance à une formation

  addSeanceToFormation(formationId: number, seanceDto: any ): Observable<any> {
    return this.http.post<[]>(BASIC_URL + `formation/${formationId}/seance`, seanceDto, {
      headers: this.createAuthorizationHeader(),
    });
  }


  // Assigner une formation à un enseignant
  addFormationToTeacher( teacherId: number, formationDto: any  ): Observable<[]> {
    return this.http.post<[]>(BASIC_URL + `teacher/${teacherId}/formation`, formationDto,{
      headers: this.createAuthorizationHeader(),
    });
  }
 /* // Assigner une formation à un etudiant
  addUserToFormation( studentId: any, formationDto: any, formationId: any ): Observable<[]> {
    return this.http.put<[]>(BASIC_URL + `students/${studentId}/formations/${formationId}`, formationDto,{
      headers: this.createAuthorizationHeader(),
    });
  }*/

  addCertificatToUser( studentId: number, certificatDto: any  ): Observable<any> {
    return this.http.post<[]>(BASIC_URL + `student/${studentId}/certificat`, certificatDto,{
      headers: this.createAuthorizationHeader(),
    });
  }

  assignTeacherToFormation(teacherId: any,formationDto : any, formationId: any): Observable<any> {
    return this.http.post<[]>(BASIC_URL + `${teacherId}/formations/${formationId}`, formationDto,{
      headers: this.createAuthorizationHeader(),
    });
  }
  getStudentsByFormation(formationId: number): Observable<any> {
    return this.http.get<[]>( BASIC_URL + `formations/${formationId}/students`, {
      headers: this.createAuthorizationHeader(),
    });
  }



  getSeancesByFormationId(formationId: number): Observable<any> {
    return this.http.get<[]>( BASIC_URL + `${formationId}/seances`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  assignFormationToStudent(studentId: number, formationId: number) :Observable<any> {
    return this.http.post<[]>( BASIC_URL + `${studentId}/formations/${formationId}`, {
      headers: this.createAuthorizationHeader(),});
  }




  // Assigner un étudiant à une formation
  addStudentToFormation(studentId: number, formationId: number): Observable<any> {
    return this.http.post(BASIC_URL + `students/${studentId}/formations/${formationId}`,  {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Obtenir les formations d'un étudiant
  getFormationsByStudentId(studentId: number): Observable<[]> {
    return this.http.get<[]>(BASIC_URL + `students/${studentId}/formations`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  // Obtenir les étudiants d'une formation
  getStudentsByFormationId(formationId: number): Observable<[]> {
    return this.http.get<[]>(BASIC_URL + `formations/${formationId}/students`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  // Mettre à jour une association (par exemple, changer la date d'inscription)
  updateStudentFormation(studentId: number, formationId: number, newDate: string): Observable<any> {
    return this.http.put(BASIC_URL + `students/${studentId}/formations/${formationId}`, { newDate },{
      headers: this.createAuthorizationHeader(),
    });
  }

  // Supprimer une association
  removeStudentFromFormation(studentId: number, formationId: number): Observable<any> {
    return this.http.delete(BASIC_URL + `students/${studentId}/formations/${formationId}`,{
      headers: this.createAuthorizationHeader(),
    });
  }


}
