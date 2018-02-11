import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {GenerateReportDialogComponent} from "./generate-report-dialog/generate-report-dialog.component";

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
  constructor(private matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  generateNewReport(): void {
    let dialogRef = this.matDialog.open(
      GenerateReportDialogComponent,
      {
        width: '90vw'
      }
    );

    dialogRef.afterClosed().subscribe(
      (reportType: string): void => {
        if (reportType) {
          console.log(reportType)
        } else {
          console.log("twas cancelled.");
        }
      }
    );
  }
}
