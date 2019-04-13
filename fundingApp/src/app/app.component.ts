import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {IfundDetails} from './model/fundDetails';
import {DataSharingService} from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fundingApp';
  ErrorText:string = ""; // Error text
  loading:boolean = false; // show Loading ? 

  // Fund object which will bind to child UI via input
  fundDetails: IfundDetails = <IfundDetails> {};
 
  // injecting dependencies
  constructor(private _sharingService : DataSharingService){
    this._sharingService.loader.subscribe((loading) => this.loading = loading);// subscribe to loader
  }

  // API call will be initiate here
  ngOnInit(){
    // Service call and subscribe for response
    this.getFundDetails();
  }

  // Child sent notofication about new Fund Update (Give now button clicked)
  onFundDetailsUpdate(value : boolean){
    console.log('parent called');
    if(value)
      this.getFundDetails();
  }

  getFundDetails(){
    try{
      // Loader
      this._sharingService.UpdateLoaderValue(true);

      this._sharingService.getFundDetails()
      .subscribe(
        (data : IfundDetails) => {
        this.fundDetails = data;
        // Loader
        this._sharingService.UpdateLoaderValue(false);
        },
        (error) => {
            this.ErrorText = "Error : " + error.message;
            // Loader
            this._sharingService.UpdateLoaderValue(false);
        }, 
      );  
    }
    catch{
      // to do error handling
    }        
  }

  // Reset DB values to 0
  resetFundData(){
    try{
      // Loader
      this._sharingService.UpdateLoaderValue(true);

      this._sharingService.resetFundDetails()
      .subscribe(
        (data : any) => {
          this.getFundDetails();
          // Loader
          this._sharingService.UpdateLoaderValue(false);
        },
        (error) => {
            this.ErrorText = "Error : " + error.message;
           // Loader
           this._sharingService.UpdateLoaderValue(false);
        }, 
      );
    }
    catch{
         // to do error handling
    }     
  }
}
