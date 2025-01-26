import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private searchQuery = new BehaviorSubject('');
  currentSearchQuery = this.searchQuery.asObservable();

  constructor() { }

  updateSearchQuery(query: string) {
    this.searchQuery.next(query)
  }

  getIdFromToken(token: string): any | null {
    try {
      const decodedToken: any = jwtDecode(token);
      let userName : string | null = localStorage.getItem('message');
      if(userName){
        userName = userName.split(' ')[0];
      }

      return {email: decodedToken.email || null, userName: userName  }
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}
