import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

 

  postApiCall(url: string, data: any, header: any = {}){

    return this.httpClient.post(url , data, {headers: header})
  }

  getApiCall(url: string, header: any = {}){
   
    return this.httpClient.get(url, {headers: header})
  }

  putApiCall(url: string, data:any, header: any = {}){
    
    return this.httpClient.put(url, data, {headers: header})
  }

  deleteApiCall(url: string, header: any = {}){  
    return this.httpClient.delete(url, {headers: header})
  }
}
