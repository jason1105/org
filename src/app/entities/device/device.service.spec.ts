import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Device } from './device.model';

@Injectable()
export class DeviceServiceSpec {

    private resourceUrl = 'api/devices'; // todo 'ctsdevice/api/devices'

    constructor(private http: Http) { }

    find(id: string): Observable<Device> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: any) => {
            return res.json(); // todo  return res.json()
        });
    }
}
