import { Injectable } from '@angular/core';
import * as config from '../../app.constants'
import {HttpClient} from "@angular/common/http";
import {CropService} from '../../swagger-api';

@Injectable()
export class CropsService {
  BACKEND_URL: string = config.BACKEND_URL;

  constructor(private cropApi: CropService) { }

  getCrops() {
    return this.cropApi.getAll();
  }
}
