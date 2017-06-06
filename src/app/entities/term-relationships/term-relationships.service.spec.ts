import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, BaseRequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {TermRelationships} from './term-relationships.model';

@Injectable()
export class TermRelationshipsServiceSpec {

  private resourceUrl = 'api/termRelationships';

  constructor(private http: Http) {
  }

  query(termId: string, req?:any): Observable<Response> {
    const options = this.createRequestOption(req);

    return this.http.get(`${this.resourceUrl}?termId=${termId}`, options);
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

}
