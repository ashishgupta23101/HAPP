import { Trackingheader } from "./Trackingheader";
import { TrackingScans } from "./TrackingScans";
import { ResultData } from "./ResultData";

export class TrackingDetails
{
    ResultData: ResultData;
    Trackingheader: Trackingheader;
    TrackingScans: Array<TrackingScans> = [];
    isPickUpscan = true;
    isOutforDelivery = true;
    isDelivered = true;
    isNofinaldeliveredstatus = true;
    isDamaged = true;
    isWeatherDelay = true;
}