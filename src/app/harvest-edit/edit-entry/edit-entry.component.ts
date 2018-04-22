import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {Router,ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import {
  CropClient,
  EntryVm,
  CropVm,
  EntryClient,
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
} from '../../app.api';
import {MatSlider, MatSnackBar} from '@angular/material';
import {of} from 'rxjs/observable/of';
import {combineLatest} from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent implements OnInit {
  @ViewChild('slider') slider: MatSlider;

  today: string;
  harvestStarted: boolean;
  editMode: boolean;
  msgs: Message[] = [];
  harvestId:string;
  entryIndex:number;
  // dropdown lists
  farms: FarmVm[] = [];
  organizations: OrganizationVm[];
  crops: CropVm[];
  variety: any[] = [];
  harvesters: HarvesterVm[];
  selectedFarm: FarmVm;
  harvest: HarvestVm;
  cropTest: CropVm;


  harvester: string;
  pounds = 0;
  priceTotal = 0;
  farm: string;
  comment: string;


  doneLoading = false;

  varieties: string[];

  entryIdArray: any[] = [];

  form: FormGroup;
  cropSelected:any;

  constructor(public _activatedRoute: ActivatedRoute,
    private entryService: EntryClient,
    private farmService: FarmClient,
    private cropService: CropClient,
    private harvesterService: HarvesterClient,
    private organizationService: OrganizationClient,
    private harvestService: HarvestClient,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.harvestId = this._activatedRoute.snapshot.params['id'];
    this.entryIndex = this._activatedRoute.snapshot.params['index'];
    combineLatest(
      this.farmService.getAll(),
      this.cropService.getAll(),    
      this.harvestService.getHarvestById(this.harvestId),
      this.harvesterService.getAll(),
      this.organizationService.getAll(),

      
    ).subscribe((data: [FarmVm[], CropVm[],HarvestVm,HarvesterVm[], OrganizationVm[]]) => {
      const [farms, crops,harvest,harvesters, organizations,] = data;
      this.farms = farms;
      this.crops = crops;
      this.harvest =harvest;
      this.harvesters = harvesters;
      this.organizations = organizations;
      this.initForm();
     
    });
  }

  initForm() {
    this.form = this.fb.group({
      crop: [this.harvest.entries[this.entryIndex].crop._id, Validators.required],
      harvester: [this.harvest.entries[this.entryIndex].harvester._id],
      farm: [this.harvest.farm],
      variety: [this.harvest.entries[this.entryIndex].selectedVariety],
      recipient: [this.harvest.entries[this.entryIndex].recipient._id],
      comment: [this.harvest.entries[this.entryIndex].comments],
      pounds: [this.harvest.entries[this.entryIndex].pounds],
      priceTotal: [this.harvest.entries[this.entryIndex].priceTotal]
    });
  this.setVariety(this.harvest.entries[this.entryIndex].crop._id);
    this.doneLoading = true;
  }
  
  setVariety(ver){
    this.cropTest = this.crops.filter(c => c._id === ver)[0];
    this.varieties = this.cropTest.variety;
  }

  onCropChanged($event) {
  this.cropTest = this.crops.filter(c => c._id === $event.value)[0];
    this.varieties = this.cropTest.variety;
  }

  onPoundChanged($event) {
    if ($event.value > 0 && this.cropTest) {
      this.pounds = $event.value;
      console.log(this.pounds)
      this.priceTotal = parseFloat((this.pounds * this.cropTest.pricePerPound).toFixed());
      this.form.get('priceTotal').setValue(this.priceTotal);
    }
  }
  submitHarvest(){
    let pounds:number = this.form.value.pounds;
    let cropId:string =this.form.value.crop;
    let harvesterId:string=this.form.value.harvester;
    let comments:string =this.form.value.comment;
    let recipientId: string =this.form.value.recipient;
    let selectedVariety:string= this.form.value.variety;

    let entryParam:NewEntryParams = new NewEntryParams({
      pounds:pounds,
      cropId:cropId,
      harvesterId:harvesterId,
      comments: comments,
      recipientId: recipientId,
      selectedVariety: selectedVariety
    });

    this.entryService.updateEntry(this.harvest.entries[this.entryIndex]._id,entryParam,this.harvest._id).subscribe(data=>{
      this.snackBar.open(
        'Successful Updated',
        'OK',
        {
          duration: 2000,
          panelClass: 'snack-bar-success'
        },
      );
      this.router.navigate(['/harvest-edit']);
    })
   

  }

}
