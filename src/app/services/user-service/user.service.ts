import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  loginApiCall(data:any){
    return this.httpService.postApiCall("http://localhost:5000/api/v1/user/login", data)
  }

  signupApiCall(data: any){
    return this.httpService.postApiCall("http://localhost:5000/api/v1/user/register", data)
  }


}
