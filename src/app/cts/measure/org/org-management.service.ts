import {Component, Injectable} from "@angular/core";
import {Observable} from "rxjs";
/**
 * Created by lv-wei on 2017-05-23.
 */

@Injectable()
export class OrgManagementService {


  /**
   * 取得当前用户所能管理的组织结构
   *
   * @param root
   * @returns {any}
   */
  getTerms(root?: string): Observable<any[]> {

    // todo, for test
    let terms = [
      {
        'text' : '工务段A',
        'state' : {
          'opened' : true,
          'selected' : true
        },
        'type': 'org',
        'children' : [
          { 'text' : 'Child 1', 'type': 'user'},
          { 'text' : 'Child 2', 'type': 'device'},
        ]
      },
      {
        'text' : '工务段B',
        'type': 'org',
        'state' : {
          'opened' : true,
          'selected' : true
        },
        'children' : [
          { 'text' : 'Child 1' , 'type': 'device'},
          { 'text' : 'Child 2', 'type': 'device'}
        ]
      }
    ];

    console.log("Find term, result:" , terms);
    return Observable.create(observer => {
      observer.next(terms);
    });
  }

  updateTermRelation(org:string, obj:string, objtype:string): boolean {
    // todo
    return true;
  }

  getUsers(root?:string): Observable<any[]> {

    // todo
    let users = [{"text": "王一", "type": "user"}, {"text": "张二", "type": "user"}];
    return Observable.create(observer => {
      observer.next(users);
    });
  }

  getDevices(root?:string): Observable<any[]> {

    // todo
    let devices = [{"text": "风机动态设备", "type": "device"}, {"text": "风机静态设备", "type": "device"}];
    return Observable.create(observer => {
      observer.next(devices);
    });
  }
}
