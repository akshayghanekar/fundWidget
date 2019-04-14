import { Component, OnInit,Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
  arrowMovement : string; // Arrow movement
  disablePay:boolean = false; // If Fund amount is met with target, then disable Give Now button
  @ViewChild('childTextBox') childTextBox : ElementRef; // Element ref to get valur of current selected textBox
 
  // Inject dependencies
  constructor(private _cdRef : ChangeDetectorRef,
              private _shareing : DataSharingService) { }

  ngOnInit(){
  }
  
  // Give now button is clickd, send modified object to server to update donation.
  onFundUpdate(){
    try{
      // Check whether Amount is less than MinimumAmount or not.
      if(this.childTextBox.nativeElement.value < this.fundDetails.minimumFundingAmount){
        // show alert and return control
        alert("Minimum amount should be " + this.fundDetails.minimumFundingAmount);
        this.childTextBox.nativeElement.value = this.fundDetails.minimumFundingAmount; // Assign Defult minimum amount
        return;
      }

      // Update value of Object First, which will be sent to server
      this.fundDetails.minimumFundingAmount = this.childTextBox.nativeElement.value;

        // Loader
        this._shareing.UpdateLoaderValue(true);
      
        // Send details to webservice for updation.
        this._shareing.updateFundDetails(this.fundDetails)
        .subscribe(
          (data) => {                  
               // Loader
               this._shareing.UpdateLoaderValue(false);

              this.giveNowSuccessEvent.emit(true); // notify parnt to get latest data
          },
          (error) => {
            // Loader
            this._shareing.UpdateLoaderValue(false);
            
            this.giveNowSuccessEvent.emit(false); // notify parnt             
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
      this.disablePay = (this.fundDetails.fundingObtained >= this.fundDetails.fundingRequired)? true:false;  
      
      // Calculate arrow movement
      this.arrowMovement = (parseInt(this.progressBar) + 5 < 95 )? (parseInt(this.progressBar) + 5).toString() : "92";
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
