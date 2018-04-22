import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from 'primeng/api';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {
  CropClient,
  CropVm,
  EntryClient,
  EntryVm,
  FarmClient,
  FarmVm,
  HarvestClient,
  HarvesterClient,
  HarvesterVm,
  HarvestParams,
  HarvestVm,
  NewEntryParams,
  OrganizationClient,
  OrganizationVm,
  SwaggerException,
  UserClient,
  UserVm
} from '../app.api';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {
  token: string;
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
  selectedVar: string;
  selectedOrg: string;
  comment: string;

  doneLoading = false;

  varieties: string[];

  entryIdArray: any[] = [];

  form: FormGroup;

  constructor(private entryService: EntryClient,
              private farmService: FarmClient,
              private cropService: CropClient,
              private harvesterService: HarvesterClient,
              private organizationService: OrganizationClient,
              private harvestService: HarvestClient,
              private router: Router,
              private userService: UserClient,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.today = new Date().toLocaleDateString();
    this.harvestStarted = false;
    this.editMode = false;
    this.initForm();
    Observable
      .combineLatest(
        this.farmService.getAll(),
        this.cropService.getAll()
      )
      .subscribe((data: [FarmVm[], CropVm[]]) => {
        const [farms, crops] = data;
        this.farms = farms;
        this.crops = crops;
        this.doneLoading = true;
      });
  }

  initForm() {
    this.form = this.fb.group({
      crop: ['', Validators.required],
      harvester: [''],
      farm: [''],
      variety: [''],
      recipient: [''],
      comment: [''],
      pounds: [0],
      priceTotal: [{value: 0, disabled: true}]
    });
  }

  ngOnDestroy(): void {
  }

  startHarvest() {
    const newHarvest: HarvestParams = new HarvestParams();
    newHarvest.farmId = this.selectedFarm._id;
    this.harvestService.registerHarvest(newHarvest)
      .mergeMap((harvest: HarvestVm) => {
        this.harvest = harvest;
        this.harvest.entries = [];
        localStorage.setItem('harvest_id', JSON.stringify({harvest: this.harvest._id}));
        this.harvestStarted = true;
        return Observable
          .combineLatest(
            this.harvesterService.getAll(),
            this.organizationService.getAll(),
            this.userService.getAllUsers()
          );
      })
      .subscribe((data: [HarvesterVm[], OrganizationVm[], UserVm[]]) => {
        const [harvesters, organizations, users] = data;
        this.harvesters = harvesters;
        this.users = users;
        this.organizations = organizations;
      });

  }

  submitEntry() {
    const newEntry: NewEntryParams = new NewEntryParams({
      cropId: this.form.get('crop').value,
      selectedVariety: this.form.get('variety').value,
      recipientId: this.form.get('recipient').value,
      pounds: this.form.get('pounds').value,
      comments: this.form.get('comment').value,
      harvesterId: this.form.get('harvester').value
    });

    this.entryService.registerEntry(newEntry)
      .subscribe((entry: EntryVm) => {
        console.log('New Entry', entry);
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: 'Entry Saved! You\'re saving Trees'});
        this.entryIdArray.push(entry._id);
        localStorage.setItem('entry_id', JSON.stringify({
          entries: this.entryIdArray
        }));
        this.form.reset();
        this.priceTotal = 0;
        this.pounds = 0;
      }, (error: SwaggerException) => {
        console.log(error);
      });
  }

  submitHarvest() {
    const harvestId = JSON.parse(localStorage.getItem('harvest_id'));
    const entryId = JSON.parse(localStorage.getItem('entry_id'));
    console.log(entryId.entries);
    console.log(harvestId.harvest);

    const harvestParams: HarvestParams = new HarvestParams({
      farmId: this.selectedFarm._id,
      entriesIds: entryId.entries,
      harvestId: harvestId.harvest
    });
    this.harvestService.registerHarvest(harvestParams)
      .subscribe(data => {
          this.router.navigate(['home']);
        },
        (error) => {
          console.log(error);
        });
    // go to review page which shows all entries, each with an edit button
  }

  onCropChanged($event) {
    this.cropTest = this.crops.filter(c => c._id === $event.value)[0];
    this.varieties = this.cropTest.variety;
  }

  onPoundChanged($event) {
    this.pounds = $event.value;
    this.priceTotal = parseFloat((this.pounds * this.cropTest.pricePerPound).toFixed());
    this.form.get('priceTotal').setValue(this.priceTotal);
  }
}
