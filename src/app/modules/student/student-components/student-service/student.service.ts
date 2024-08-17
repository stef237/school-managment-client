import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';


const BASIC_URL=["http://localhost:8080/api/student/"]


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentById():Observable<any>{
    return this.http.get<[]>(BASIC_URL+`${StorageService.getUserId()}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  getAllAppliedPermitsById():Observable<any>{
    return this.http.get<[]>(BASIC_URL+`permit/${StorageService.getUserId()}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  applyPermit(studentPermitDto: { userId: any; }): Observable<any> {
    studentPermitDto.userId = StorageService.getUserId();
    return this.http.post<[]>(BASIC_URL + 'permit', studentPermitDto, {
      headers: this.createAuthorizationHeader()
    });
  }



  updateStudent(studentDto: any):Observable<any>{
    return this.http.put<[]>(BASIC_URL+`${StorageService.getUserId()}`,studentDto,{
      headers:this.createAuthorizationHeader(),
    });
  }


  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.append(
      "Authorization", "Bearer " + StorageService.getToken()
    );
  }
  // Méthodes pour les formations

  getAllFormations(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + 'formations', {
      headers:this.createAuthorizationHeader(),
    });
  }
  getFormationsByStudentId():Observable<any>{
    return this.http.get<[]>(BASIC_URL+`${StorageService.getUserId()}/formations`,{
      headers:this.createAuthorizationHeader()
    })
  }


  addUserToFormation(formationDto : any, formationId: any): Observable<[]> {
    return this.http.put<[]>(BASIC_URL + `formations/${formationId}/students/${StorageService.getUserId()}`, formationDto,{
      headers: this.createAuthorizationHeader(),
    });
  }
/*  addStudentToFormation(formationDto : any, formationId: any): Observable<[]> {
    return this.http.post<[]>(BASIC_URL + `${StorageService.getUserId()}/formations/${formationId}`, formationDto,{
      headers: this.createAuthorizationHeader(),
    });
  }*/




// Méthodes pour les séances

  getAllSeances(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + 'seances',{
      headers:this.createAuthorizationHeader()
    });
  }
  getAllSeanceByUserId():Observable<any>{
    return this.http.get<[]>(BASIC_URL+`seance/${StorageService.getUserId()}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  // Méthodes pour les certificats

  getCertificatById(certificatId: number): Observable<any>{
    return this.http.get(BASIC_URL + `certificat/${certificatId}`, {
      headers:this.createAuthorizationHeader(),
    })
  }

  getAllCertificatByUserId():Observable<any>{
    return this.http.get<[]>(BASIC_URL+`certificat/${StorageService.getUserId()}`,{
      headers:this.createAuthorizationHeader()
    })
  }

}
