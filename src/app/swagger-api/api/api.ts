export * from './crop.service';
import { CropService } from './crop.service';
export * from './entry.service';
import { EntryService } from './entry.service';
export * from './farm.service';
import { FarmService } from './farm.service';
export * from './harvest.service';
import { HarvestService } from './harvest.service';
export * from './harvester.service';
import { HarvesterService } from './harvester.service';
export * from './organization.service';
import { OrganizationService } from './organization.service';
export * from './reporting.service';
import { ReportingService } from './reporting.service';
export * from './system.service';
import { SystemService } from './system.service';
export const APIS = [CropService, EntryService, FarmService, HarvestService, HarvesterService, OrganizationService, ReportingService, SystemService];
