import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { CropService } from './api/crop.service';
import { EntryService } from './api/entry.service';
import { FarmService } from './api/farm.service';
import { HarvestService } from './api/harvest.service';
import { HarvesterService } from './api/harvester.service';
import { OrganizationService } from './api/organization.service';
import { ReportingService } from './api/reporting.service';
import { SystemService } from './api/system.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    CropService,
    EntryService,
    FarmService,
    HarvestService,
    HarvesterService,
    OrganizationService,
    ReportingService,
    SystemService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
