import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class service {

  
  serviceUrl = "https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/services";
  providerUrl = "https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/providers?include=locations,schedules.location&page[number]=1&page[size]=10";
  constructor(private http : HttpClient) { }

  getServices() {
    return this.http.get<any>(this.serviceUrl);
  }

  getProviders() {
    return this.http.get<any>(this.providerUrl);
  }
}
