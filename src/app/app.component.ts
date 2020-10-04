import { Component } from '@angular/core';
import { service } from './service/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Service-Provider';
  serviceList: any;
  providerList: any;
  serviceProviderList : any;
  errorMessage : string;
  selectedIndex: number;
  constructor(private apiService : service)
  {

  }

  ngOnInit()
  {
    this.getServices();
    this.getProviders();
  }
  
  getServices()
  {
    this.apiService.getServices()
    .subscribe(
      (response) => {                           
        this.serviceList = response["data"];
        console.log(this.serviceList);
        if(this.serviceList)
         this.filterServiceList(this.serviceList);
      },
      (error) => {                              
        this.errorMessage = error;
      }
    )
  }

  getProviders()
  {
    this.apiService.getProviders()
    .subscribe(
      (response) => {                           
        this.providerList = response;
        if(this.providerList)
         this.filterProviderList(this.providerList);
      },
      (error) => {                              
        this.errorMessage = error;
      }
    )
  }

  selectService(i: number, service : any)
  {
    this.selectedIndex = i;
    this.filterServiceProviderList(service);
  }

  filterServiceProviderList(service: any)
  {
    this.serviceProviderList = this.providerList.filter(x=> x["attributes"]["service"] == service["attributes"]["name"]);
  }

  filterServiceList(list: any)
  {
    let newArr = [];
    list.forEach((item) => {
        if (newArr.findIndex(i => i["attributes"]["name"] == item["attributes"]["name"]) === -1) 
        {
            newArr.push(item)
        }    
    });
    this.serviceList = newArr;
  }

  filterProviderList(list : any)
  {
    let newArr = [];
    list["included"].forEach((item, index) => {
        if (item["attributes"]["name"] != "" && item["attributes"]["name"] != undefined) 
        {
          if(newArr.findIndex(i => i["attributes"]["name"] == item["attributes"]["name"]) === -1)
          {
            // Get Data Item.
            let dataItem  = list["data"].find(x=> x?.relationships?.locations?.data[0].id == item.id);
            if(dataItem)
            item["pimg"] = dataItem?.attributes["profile-image"];
            item["subspecialties"] = dataItem?.attributes?.subspecialties;
            newArr.push(item)
          }
        }    
    });
    this.providerList = newArr;
    this.serviceProviderList = newArr;
  }

}
