import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FarmClient, FarmVm, HarvestClient, HarvestVm} from '../../app.api';

@Component({
  selector: 'app-edit-harvest-dialog',
  templateUrl: './edit-harvest-dialog.component.html',
  styleUrls: ['./edit-harvest-dialog.component.scss']
})
export class EditHarvestDialogComponent implements OnInit {
  harvestForm: FormGroup;
  token: string;
  harvests: Array<HarvestVm> = [];
  loading: boolean;
  farms: Array<FarmVm> = [];

  constructor(@Inject(MAT_DIALOG_DATA) private harvest: HarvestVm,
              private formBuilder: FormBuilder,
              private harvestService: HarvestClient,
              private farmService: FarmClient,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.farmService.getAll().subscribe(farms => {
      this.farms = farms;
      this.harvestForm = this.formBuilder.group({
        selectedFarmId: [this.harvest.farm._id, Validators.required],
      });
      this.loading = false;
    }, error2 => {
      console.log(error2);
    });
  }
}
