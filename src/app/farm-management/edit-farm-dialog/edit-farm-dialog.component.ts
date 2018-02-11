import {Component, Inject, OnInit} from '@angular/core';
import {INewFarmParams} from '../../swagger-api';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-edit-farm-dialog',
  templateUrl: './edit-farm-dialog.component.html',
  styleUrls: ['./edit-farm-dialog.component.scss']
})
export class EditFarmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private farm: INewFarmParams) {
  }

  ngOnInit(): void {
  }
}
