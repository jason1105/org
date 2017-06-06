import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {User} from './user.model';

@Injectable()
export class UserServiceSpec {
  private resourceUrl = 'api/users'; // todo 'ctsuaa/api/users/id'

  constructor(private http: Http) {
  }

  /**
   * 根据id取得用户
   * @param id
   * @returns {Observable<R>}
   */
  find(id: any): Observable<User> {
    return this.http.get(`${this.resourceUrl}/${id}`).map((res: any) => {
      return res.json(); // todo  return res.json()
    });
  }

}
