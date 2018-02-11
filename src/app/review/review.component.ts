import {Component, OnInit} from '@angular/core';
import {HarvestService} from "../swagger-api/api/harvest.service";
import {IHarvestVm} from "../swagger-api/model/iHarvestVm";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  harvest: IHarvestVm;

  constructor(private harvestService: HarvestService) {
  }

  ngOnInit(): void {
    let harvestId: string = localStorage.getItem("harvest_id");
    this.harvestService.getHarvestById(harvestId).subscribe(
      (harvest: IHarvestVm) => {
        this.harvest = harvest;
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }
}
