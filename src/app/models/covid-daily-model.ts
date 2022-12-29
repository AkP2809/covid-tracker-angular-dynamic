export interface CovidDailyDataModel {
    country: string,
    state: string,
    lastUpdated: string,
    confirmedCases: number,
    recoveredCases: number,
    deathCases: number,
    activeCases: number,
    incidentRate: number,
    caseFatalityRatio: number
  }