import {Component, Inject, OnInit} from '@angular/core';
import {ICropVm} from '../../swagger-api';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-confirm-delete-crop-dialog',
  templateUrl: './confirm-delete-crop-dialog.component.html',
  styleUrls: ['./confirm-delete-crop-dialog.component.scss']
})
export class ConfirmDeleteCropDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public crop: ICropVm) {
  }

  ngOnInit(): void {
  }
}
