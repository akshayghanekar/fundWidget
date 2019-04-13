import { Injectable } from '@angular/core';
import { IfundDetails } from '../model/fundDetails';
import { AppSettings } from '../constants/AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

_fundDetails:IfundDetails = <IfundDetails>{};

// Loader subscriber
private _loader: boolean =false;
private loadermessageSource = new BehaviorSubject<boolean>(this._loader);
loader = this.loadermessageSource.asObservable();

  constructor(private _http : HttpClient) { } 

  // Get Fund Details from WebService. It will always be called from parent component.
  // This method will return an response object which parent component will pass to child component.
  // WebServie will return AmountNeeded, Days Left, Number of donor,min amount
  getFundDetails():Observable<object>{
    return this._http.get(AppSettings.apiURL + "getFundDetails");
  }

  // Update fund details. This will be called from child component.
  updateFundDetails(_updateObj : IfundDetails): Observable<object>{
    return this._http.post(AppSettings.apiURL + "updateFundDetails", _updateObj);
  }

  // reset fund details. This will be called from child component.
  resetFundDetails(): Observable<object>{
    return this._http.get(AppSettings.apiURL + "resetFundDetails");
  }

  // this method will show or hide laoder
  UpdateLoaderValue(value: boolean){
    this.loadermessageSource.next(value);
  }

}
