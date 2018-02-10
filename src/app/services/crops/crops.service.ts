import { Injectable } from '@angular/core';
import * as config from '../../app.constants'
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CropsService {
  BACKEND_URL: string = config.BACKEND_URL;

  constructor(private http: HttpClient) { }

  getCrops(){
    this.http.get(this.BACKEND_URL + '/crops');
  }
}
