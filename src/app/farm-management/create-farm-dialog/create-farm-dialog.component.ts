import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {INewFarmParams} from "../../swagger-api/model/iNewFarmParams";

@Component({
  selector: 'app-create-farm-dialog',
  templateUrl: 'create-farm-dialog.component.html',
  styleUrls: ['./create-farm-dialog.component.scss']
})
export class CreateFarmDialogComponent implements OnInit {
  farm: INewFarmParams;

  constructor(private dialogRef: MatDialogRef<CreateFarmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit(): void {
    this.farm = {name: "", lat: 0, _long: 0};
  }
}
