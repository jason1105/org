import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TermRelationships } from './term-relationships.model';

@Injectable()
export class TermRelationshipsService {

    private resourceUrl = 'api/termRelationships';

    constructor(private http: Http) { }

    create(termRelationships: TermRelationships): Observable<TermRelationships> {
        const copy = this.convert(termRelationships);
        return this.http.post(this.resourceUrl, copy).map((res: any) => {
            res._body = res._body.data;
            return res.json();
        });
    }

    update(termRelationships: TermRelationships): Observable<TermRelationships> {
        const copy = this.convert(termRelationships);
        return this.http.put(`${this.resourceUrl}/${termRelationships.id}`, copy).map((res: any) => {
          return res;
        });
    }

    find(id: number): Observable<TermRelationships> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }
    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }

    private convert(termRelationships: TermRelationships): TermRelationships {
        const copy: TermRelationships = Object.assign({}, termRelationships);
        return copy;
    }
}
