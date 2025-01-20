import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService: HttpService) { }

  getHeader(){
    return new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem("authToken") || ""
    });
  }

  getId(){
    return new HttpHeaders({
      "Id": localStorage.getItem("_id") || ""
    });
  }

  addNoteApiCall(data: any){
    return this.httpService.postApiCall("http://localhost:5000/api/v1/note/", data, this.getHeader())
  }

  fetchNotesApiCall(){
    return this.httpService.getApiCall("http://localhost:5000/api/v1/note/", this.getHeader())
  }

  // toggleArchiveApiCall(){
  //   return this.httpService.postApiCall("http://localhost:5000/api/v1/note/archive/678e0ed2ad16a4b1d6feddbe")
  // }
}
