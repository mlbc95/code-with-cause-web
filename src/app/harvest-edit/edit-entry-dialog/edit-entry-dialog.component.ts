import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  CropClient,
  CropVm, EntryClient, EntryVm, FarmClient, FarmVm, HarvestClient, HarvesterClient, HarvesterVm, HarvestVm,
  OrganizationClient,
  OrganizationVm, UserClient,
  UserVm
} from '../../app.api';
import {Message} from "primeng/api";
import {Router} from "@angular/router";
import {combineLatest} from "rxjs/observable/combineLatest";

@Component({
  selector: 'app-edit-entry-dialog',
  templateUrl: './edit-entry-dialog.component.html',
  styleUrls: ['./edit-entry-dialog.component.scss']
})
export class EditEntryDialogComponent implements OnInit {
  editEntryForm: FormGroup;
  token: string;
  harvests: Array<EntryVm> = [];
  today: string;
  harvestStarted: boolean;
  editMode: boolean;
  msgs: Message[] = [];

  // dropdown lists
  farms: FarmVm[] = [];
  organizations: OrganizationVm[];
  crops: CropVm[];
  variety: any[] = [];
  harvesters: HarvesterVm[];
  selectedFarm: FarmVm;
  harvest: HarvestVm;
  cropTest: CropVm;
  users: UserVm[];
  harvester: string;
  pounds = 0;
  priceTotal = 0;
  farm: string;
  comment: string;
  firstEntry = false;
  entryCounts = 0;
  loading: boolean;
  varieties: string[];
  entryIdArray: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private entry: EntryVm,
              private formBuilder: FormBuilder,
              private entryService: EntryClient,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar,
              private farmService: FarmClient,
              private cropService: CropClient,
              private harvesterService: HarvesterClient,
              private organizationService: OrganizationClient,
              private harvestService: HarvestClient,
              private router: Router,
              private userService: UserClient,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.today = new Date().toLocaleDateString();
    this.harvestStarted = false;
    this.editMode = false;
    this.initForm();

    combineLatest(
      this.farmService.getAll(),
      this.cropService.getAll(),
      this.userService.getAllUsers()
    ).subscribe((data: [FarmVm[], CropVm[], UserVm[]]) => {
      const [farms, crops, users] = data;
      this.farms = farms;
      this.crops = crops;
      this.users = users;
    });
  }

  initForm() {
    this.entryService.getSingleEntry(this.entry._id).subscribe(entrySelected => {
      this.editEntryForm = this.fb.group({
        crop: [entrySelected.crop, Validators.required],
      });
      this.editEntryForm.get('crop').valueChanges.subscribe(() => {
        this.editEntryForm.get('pounds').enable();
      });
      this.loading = false;
    }, error2 => {
      console.log(error2);
    });
  }


  onCropChanged($event) {
    this.cropTest = this.crops.filter(c => c._id === $event.value)[0];
    this.varieties = this.cropTest.variety;
  }

  onPoundChanged($event) {
    if ($event.value > 0 && this.cropTest) {
      this.pounds = $event.value;
      this.priceTotal = parseFloat((this.pounds * this.cropTest.pricePerPound).toFixed());
      this.editEntryForm.get('priceTotal').setValue(this.priceTotal);
    }
  }

}
