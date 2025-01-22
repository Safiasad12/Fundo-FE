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

  



  addNoteApiCall(data: any){

    return this.httpService.postApiCall("http://localhost:5000/api/v1/note/", data, this.getHeader())
  }

  fetchNotesApiCall(){
    return this.httpService.getApiCall("http://localhost:5000/api/v1/note/", this.getHeader())
  }

  toggleArchiveApiCall(id: any){ 
    return this.httpService.putApiCall("http://localhost:5000/api/v1/note/archive/"+id, {}, this.getHeader())
  }

  toggleTrashApiCall(id: any){ 
    return this.httpService.putApiCall("http://localhost:5000/api/v1/note/trash/"+id, {}, this.getHeader())
  }

  changeColorApiCall(id: any, color: any){
    console.log(color);
    return this.httpService.putApiCall("http://localhost:5000/api/v1/note/color/"+id, color)
  }

  deletePermanentlyApiCall(id: any){
    
    return this.httpService.deleteApiCall("http://localhost:5000/api/v1/note/"+id, this.getHeader())
  }

  

}
