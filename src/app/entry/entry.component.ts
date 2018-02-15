import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Configuration, ConfigurationParameters, CropService, EntryService, FarmService, HarvesterService, HarvestService, ICropVm, IEntryVm,
  IFarmVm, IHarvesterVm, IHarvestParams, IHarvestVm, INewEntryParams, IOrganizationVm, IUserVm, OrganizationService, SystemService
} from '../swagger-api';
import {Message} from 'primeng/api';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {HttpErrorResponse} from '@angular/common/http';

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
  farms: IFarmVm[] = [];
  organizations: IOrganizationVm[];
  crops: ICropVm[];
  variety: any[] = [];
  harvesters: IHarvesterVm[];


  selectedFarm: IFarmVm;
  harvest: IHarvestVm;
  currentEntry: IEntryVm;
  cropsList: ICropVm[];
  cropTest: ICropVm;
  users: IUserVm[];

  harvester: string;
  cropSleceted: string;
  pounds = 0;
  priceTotal = 0;
  farm: string;
  recipent: string;
  selectedVar: string;
  selectedHarvester: string;
  selectedOrg: string;
  comment: string;

  doneLoading = false;

  varieties: string[];

  entryIdArray: any[] = [];

  form: FormGroup;

  constructor(private entryService: EntryService,
              private farmService: FarmService,
              private cropService: CropService,
              private harvesterService: HarvesterService,
              private organizationService: OrganizationService,
              private harvestService: HarvestService,
              private router: Router,
              private systemService: SystemService,
              private fb: FormBuilder) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    const config: ConfigurationParameters = {
      apiKeys: {
        Authorization: this.token
      }
    };
    entryService.configuration = new Configuration(config);
    farmService.configuration = new Configuration(config);
    cropService.configuration = new Configuration(config);
    harvesterService.configuration = new Configuration(config);
    organizationService.configuration = new Configuration(config);
    harvestService.configuration = new Configuration(config);
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
      .subscribe((data: [IFarmVm[], ICropVm[]]) => {
        const [farms, crops] = data;
        this.farms = farms;
        this.crops = crops;
      });
    // const storedHarvestID = JSON.parse(localStorage.getItem('harvest_id'));
    // if (storedHarvestID) {
    //   this.harvestService.getHarvestById(storedHarvestID).subscribe((harvest) => {
    //     this.harvest = harvest;
    //   });
    // }
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
      priceTotal: [0]
    });
  }

  ngOnDestroy(): void {
    this.entryService.configuration.apiKeys['Authorization'] = null;
    this.farmService.configuration.apiKeys['Authorization'] = null;
    this.cropService.configuration.apiKeys['Authorization'] = null;
    this.harvesterService.configuration.apiKeys['Authorization'] = null;
    this.organizationService.configuration.apiKeys['Authorization'] = null;
    this.harvestService.configuration.apiKeys['Authorization'] = null;
  }

  startHarvest() {
    const newHarvest: IHarvestParams = {'farmId': this.selectedFarm._id};
    this.harvestService.registerHarvest(newHarvest)
      .mergeMap((harvest: IHarvestVm) => {
        this.harvest = harvest;
        this.harvest.entries = [];
        localStorage.setItem('harvest_id', JSON.stringify({harvest: this.harvest._id}));
        this.harvestStarted = true;
        return Observable
          .combineLatest(
            this.harvesterService.getAll(),
            this.organizationService.getAll(),
            this.systemService.getAllUsers()
          );
      })
      .subscribe((data: [IHarvesterVm[], IOrganizationVm[], IUserVm[]]) => {
        const [harvesters, organizations, users] = data;
        this.harvesters = harvesters;
        this.users = users;
        this.organizations = organizations;
      });

  }

  submitEntry() {
    const newEntry: INewEntryParams = {
      cropId: this.form.get('crop').value,
      selectedVariety: this.form.get('variety').value,
      recipientId: this.form.get('recipient').value,
      pounds: this.form.get('pounds').value,
      comments: this.form.get('comment').value,
      harvesterId: this.form.get('harvester').value
    };

    this.entryService.registerEntry(newEntry)
      .subscribe((entry: IEntryVm) => {
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
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    // const newEntry: INewEntryParams = {
    //   crop: this.cropSleceted,
    //   selectedVariety: this.selectedVar,
    //   recipient: this.selectedOrg,
    //   pounds: this.pounds,
    //   comments: this.comment,
    //   harvester: this.harvester,
    //   priceTotal: this.priceTotal
    // };
    // this.entryService.registerEntry(newEntry).subscribe(
    //   (entry: IEntryVm): void => {
    //     console.log(entry);
    //     this.msgs = [];
    //     this.msgs.push({severity: 'success', summary: 'Success', detail: 'Entry Saved! Your saving Trees'});
    //     this.entryIdArray.push(entry._id);
    //     localStorage.setItem('entry_id', JSON.stringify({
    //       entries: this.entryIdArray
    //     }));
    //   },
    //   (error) => {
    //     console.log(error);
    //   });

  }

  submitHarvest() {
    const harvestId = JSON.parse(localStorage.getItem('harvest_id'));
    const entryId = JSON.parse(localStorage.getItem('entry_id'));
    console.log(entryId.entries);
    console.log(harvestId.harvest);

    const harvestParams = {farmId: this.selectedFarm._id, entries: entryId.entries, harvestId: harvestId.harvest};
    console.log(harvestParams);
    this.harvestService.registerHarvest(harvestParams)
      .subscribe(data => {
          this.router.navigate([`/review-harvest/${harvestId.harvest}`]);
        },
        (error) => {
          console.log(error);
        });
    // go to review page which shows all entries, each with an edit button
  }

  // calcPrice() {
  //   let pricePerPound;
  //   let res = _.findIndex(this.cropsList, {_id: this.cropSleceted});
  //   pricePerPound = this.cropsList[res].pricePerPound;
  //   console.log(this.pounds, pricePerPound);
  //   this.priceTotal = pricePerPound * this.pounds;
  // }

  // filterVar() {
  // this.variety = [];
  // let cropName = _.filter(this.crops, {value: this.cropSleceted});
  // let res = _.filter(this.cropsList, {name: cropName[0].label});
  // res.forEach(v => {
  //   if (v.variety.length > 1) {
  //     v.variety.forEach(vv => {
  //       this.variety.push({label: vv, value: vv});
  //     });
  //   } else {
  //     this.variety.push({label: v.variety, value: v.variety});

  // calcPrice() {
  //   let pricePerPound;
  //   let res = _.findIndex(this.cropsList, {_id: this.cropSleceted});
  //   pricePerPound = this.cropsList[res].pricePerPound;
  //   console.log(this.pounds, pricePerPound);
  //   this.priceTotal = pricePerPound * this.pounds;
  // }

  // filterVar() {
  //   this.variety = [];
  //   let cropName = _.filter(this.crops, {value: this.cropSleceted});
  //   let res = _.filter(this.cropsList, {name: cropName[0].label});
  //   res.forEach(v => {
  //     if (v.variety.length > 1) {
  //       v.variety.forEach(vv => {
  //         this.variety.push({label: vv, value: vv});
  //       });
  //     } else {
  //       this.variety.push({label: v.variety, value: v.variety});
  //
  //     }
  //   });
  // }

  // sendHarvest(); {

  // clear this harvest from local storage
//   localStorage;
// .

//   removeItem(
//
//   'harvest_id';
// );
//   this;
// .
//   harvestStarted = false;
// }

// backAnEntry();
// {
//   console.log(this.currentEntry);
// }

// goToEntry();
// {
//
// }


  onCropChanged($event) {
    // this.cropSleceted = $event;
    // // console.log(this.crops);
    // console.log($event);
    this.cropTest = this.crops.filter(c => c._id === $event.value)[0];
    this.varieties = this.cropTest.variety;
  }

//
  onPoundChanged($event) {
    this.pounds = $event.value;
    this.priceTotal = parseFloat((this.pounds * this.cropTest.pricePerPound).toFixed());
    this.form.get('priceTotal').setValue(this.priceTotal);
  }
}
