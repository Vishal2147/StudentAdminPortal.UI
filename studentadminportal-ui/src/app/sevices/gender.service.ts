import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApi="https://localhost:44305";

  constructor(private httpClient: HttpClient) { }

  getGenderList() : Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseApi+ '/genders')
  }
}