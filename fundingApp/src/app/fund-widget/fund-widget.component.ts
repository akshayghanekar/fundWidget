import { Component, OnInit,Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {IfundDetails} from './../model/fundDetails';
import {DataSharingService} from '../services/data-sharing.service';

@Component({
  selector: 'app-fund-widget',
  templateUrl: './fund-widget.component.html',
  styleUrls: ['./fund-widget.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FundWidgetComponent implements OnInit {

  // Input and output, so that input can be sent to child from parent and output for emitting event for parent
  @Input() fundDetails: IfundDetails = <IfundDetails> {};
  @Output() giveNowSuccessEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  progressBar:string; // Update progreebar
  disablePay:boolean = false; // If Fund amount is met with target, then disable Give Now button
 
  // Inject dependencies
  constructor(private _cdRef : ChangeDetectorRef,
              private _shareing : DataSharingService) { }

  ngOnInit(){
  }
  
  // Give now button is clickd, send modified object to server to update donation.
  onFundUpdate(){
    try{
        // Loader
        this._shareing.UpdateLoaderValue(true);
      
        // Send details to webservice for updation.
        this._shareing.updateFundDetails(this.fundDetails)
        .subscribe(
          (data) => {      
              this.giveNowSuccessEvent.emit(true); // notify parnt to get latest data

               // Loader
              this._shareing.UpdateLoaderValue(false);
          },
          (error) => {
            this.giveNowSuccessEvent.emit(false); // notify parnt

             // Loader
              this._shareing.UpdateLoaderValue(false);
          }
        );  
    }
    catch{
        // to do error handling
    }     
  }

  // It will return value if and only if entered value is number
  numberOnly(event): boolean {
    try{
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
    catch{
      // to do error handling
    }      
  }

  // Hooks
  ngOnChanges(){
    console.log("ngOnChanges called");
  }

  ngDoCheck(){
    try{
      console.log("ngDoCheck called");
      // Calculate progressbar
      this.progressBar = ((this.fundDetails.fundingObtained / this.fundDetails.fundingRequired) * 100).toString();
      
      // Check for remaining amount. if it is greater then disable pay button
      this.disablePay = (this.fundDetails.fundingObtained > this.fundDetails.fundingRequired)? true:false;
    }
    catch{
      // to do error handling
    }    
  }

  ngAfterContentInit(){
    console.log("ngAfterContentInit called");
  }

  ngAfterContentChecked(){
    console.log("ngAfterContentChecked called");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit called");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called");
  }
}
