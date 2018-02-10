import {Component, OnInit} from '@angular/core';
import {INewFarmParams} from "../../swagger-api/model/iNewFarmParams";

@Component({
  selector: 'app-create-farm-dialog',
  templateUrl: 'create-farm-dialog.component.html',
  styleUrls: ['./create-farm-dialog.component.scss']
})
export class CreateFarmDialogComponent implements OnInit {
  farm: INewFarmParams;

  constructor() {
  }

  ngOnInit(): void {
    this.farm = {name: "", lat: 0, lng: 0};
  }
}
