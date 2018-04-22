import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntryClient, EntryVm} from '../../app.api';

@Component({
  selector: 'app-edit-entry-dialog',
  templateUrl: './edit-entry-dialog.component.html',
  styleUrls: ['./edit-entry-dialog.component.scss']
})
export class EditEntryDialogComponent implements OnInit {
  editEntryForm: FormGroup;
  token: string;
  harvests: Array<EntryVm> = [];
  loading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private entry: EntryVm,
              private formBuilder: FormBuilder,
              private entryService: EntryClient,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar) {
    console.log("inthe construct");
  }

  ngOnInit(): void {
    this.loading = true;
    console.log(this.entry._id);
    this.entryService.getSingleEntry(this.entry._id).subscribe(farms => {
      this.editEntryForm = this.formBuilder.group({
        crop: [this.entry.crop, Validators.required],
      });
      this.loading = false;
    }, error2 => {
      console.log(error2);
    });
  }
}
