import {Component, Inject, OnInit} from '@angular/core';
import {INewFarmParams} from "../../swagger-api/model/iNewFarmParams";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-edit-farm-dialog',
  templateUrl: './edit-farm-dialog.component.html',
  styleUrls: ['./edit-farm-dialog.component.scss']
})
export class EditFarmDialogComponent implements OnInit {
  updatedFarm: INewFarmParams;

  constructor(@Inject(MAT_DIALOG_DATA) public farm: INewFarmParams) {
  }

  ngOnInit(): void {
    this.updatedFarm = {name: this.farm.name, lat: this.farm.lat, lng: this.farm.lng};
  }
}
