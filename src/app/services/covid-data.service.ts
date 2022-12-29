import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidConfirmedDataModel } from '../models/covid-confirmed-model';
import { Observable } from 'rxjs';
import { CovidRecoveredDataModel } from '../models/covid-recovered-model';
import { CovidDeathDataModel } from '../models/covid-death-model';
import { CovidDailyDataModel } from '../models/covid-daily-model';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  private CONFIRMED_URL = "https://covid-tracker-sbapi.herokuapp.com/getConfirmedCasesGlobal";
  private RECOVERED_URL = "https://covid-tracker-sbapi.herokuapp.com/getRecoveredCasesGlobal";
  private DEATHS_URL = "https://covid-tracker-sbapi.herokuapp.com/getDeathCasesGlobal";
  private DAILY_URL = "https://covid-tracker-sbapi.herokuapp.com/getDailyCasesGlobal";
  
  constructor(private httpClient : HttpClient) { }

  getAllConfirmedCases = () : Observable<CovidConfirmedDataModel[]> => {
    return this.httpClient.get<CovidConfirmedDataModel[]>(this.CONFIRMED_URL);
  }

  getAllRecoveredCases = () : Observable<CovidRecoveredDataModel[]> => {
    return this.httpClient.get<CovidRecoveredDataModel[]>(this.RECOVERED_URL);
  }

  getAllDeathCases = () : Observable<CovidDeathDataModel[]> => {
    return this.httpClient.get<CovidDeathDataModel[]>(this.DEATHS_URL);
  }

  getDailyCases = () : Observable<CovidDailyDataModel[]> => {
    return this.httpClient.get<CovidDailyDataModel[]>(this.DAILY_URL);
  }
}
