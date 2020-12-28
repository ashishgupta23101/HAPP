import { environment } from 'src/environments/environment';
// import { Storage } from '@ionic/storage';
export class ActivePackages {
    TrackingNo: string;
    Status: string;
    Carrier: string;
    ProductName: string;
    ProductUrl: string;
    DateCreated: string;
    ExpectedDate: string;
    LastUpdated: string;
    Key: any;
    ImgUrl: any;
}
export class Packages {
    All: Array<ActivePackages> = [];
    Today: Array<ActivePackages> = [];
    Yesterday: Array<ActivePackages> = [];
    ThisWeek: Array<ActivePackages> = [];
    LastWeek: Array<ActivePackages> = [];
    ThisMonth: Array<ActivePackages> = [];
    LastMonth: Array<ActivePackages> = [];
}
export class FilteringDates {
    Today: Date;
    Yesterday: Date;
    ThisWeek: CusDates = new CusDates();
    LastWeek: CusDates = new CusDates();
    ThisMonth: CusDates = new CusDates();
    LastMonth: CusDates = new CusDates();
}
export class Report{
    labels : Array<string> = [];
    data : Array<number> = [];
    total : number;
}
export class CusDates {
    firstDate: any;
    lastDate: any;
}
export class SessionData {
    static packages: Packages = new Packages();
    static filteringDates: FilteringDates = new FilteringDates();
    static apiURL: string = environment.api_Url_Prod;
    // tslint:disable-next-line: no-inferrable-types
    static apiType: string = 'P';
}
