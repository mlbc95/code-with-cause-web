import {Component, Inject, OnInit} from '@angular/core';
import {IFarmVm} from "../../swagger-api/model/iFarmVm";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-confirm-delete-farm-dialog',
  templateUrl: './confirm-delete-farm-dialog.component.html',
  styleUrls: ['./confirm-delete-farm-dialog.component.scss']
})
export class ConfirmDeleteFarmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private farm: IFarmVm) {
  }

  ngOnInit(): void {
  }
}
