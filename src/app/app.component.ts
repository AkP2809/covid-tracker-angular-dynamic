import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CovidConfirmedDataModel } from './models/covid-confirmed-model';
import { CovidDailyDataModel } from './models/covid-daily-model';
import { CovidDeathDataModel } from './models/covid-death-model';
import { CovidRecoveredDataModel } from './models/covid-recovered-model';
import { CovidDataService } from './services/covid-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'COVID-19 TRACKER BULLETIN';

  //for dark mode toggle
  checked = false;

  confirmedCases : CovidConfirmedDataModel[] = [];
  recoveredCases : CovidRecoveredDataModel[] = [];
  deathCases : CovidDeathDataModel[] = [];
  dailyCases : CovidDailyDataModel[] = [];

  totalConfirmed  = 0;
  totalRecovered = 0;
  totalDeaths = 0;

  displayedColumnsNav1: string[] = ['Country/Region', 'Latest Total Cases', 'Previous Day Total Cases'];
  displayedColumnsNav2: string[] = ['Province/State', 'Latest Total Cases', 'Previous Day Total Cases'];
  displayedColumnsNav3: string[] = ['Country', 'State', 'Confirmed', 'Recovered', 'Deaths', 'Active', 'Incident Rate', 'Case Fatality Ratio', 'Last Updated on'];

  constructor(private covidService : CovidDataService,
              private toastr : ToastrService) {}

  ngOnInit() : void {
        this.covidService.getAllConfirmedCases().subscribe({
          next: (confirmedCases: CovidConfirmedDataModel[]) => {
            this.confirmedCases = confirmedCases;

            //calculating total number of confirmed cases
            this.totalConfirmed = this.confirmedCases.reduce(
              (accumulator : number, obj : any) => {
                return accumulator + obj.latestTotalCases;
              }, 0
            );
          },
          error: (err) => {
            console.log(err);
            this.toastr.error(err.status, "Error fetching the Confirmed cases!");
          }
      });

      this.covidService.getAllRecoveredCases().subscribe({
        next : (recoveredCases : CovidRecoveredDataModel[]) => {
          this.recoveredCases = recoveredCases;

          //calculating total number of recovered cases
          this.totalRecovered = this.recoveredCases.reduce(
            (accumulator : number, obj : any) => {
              return accumulator + obj.latestRecoveredCases;
            }, 0
          );
        },
        error : (err) => {
          this.toastr.error(err.status, "Error fetching the Recovered cases!");
        }
      });

      this.covidService.getAllDeathCases().subscribe({
        next : (deathCases : CovidDeathDataModel[]) => {
          this.deathCases = deathCases;

          //calculating total number of death cases
          this.totalDeaths = this.deathCases.reduce(
            (accumulator : number, obj : any) => {
              return accumulator + obj.latestDeathCases;
            }, 0
          );
        },
        error : (err) => {
          this.toastr.error(err.status, "Error fetching the Death cases!");
        }
      });

      this.covidService.getDailyCases().subscribe({
        next : (dailyCases : CovidDailyDataModel[]) => {
          this.dailyCases = dailyCases;
          console.log(this.dailyCases);
        },
        error : (err) => {
          this.toastr.error(err.status, "Error fetching the Daily cases!");
        }
      });
  }
  
  updateVal(event: any) {
    this.checked = event;
  }
}
