import {Component, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TermService} from "../../../entities/term/term.service";
import {Log} from "ng2-logger";
import {LOG_LEVEL} from "./common/org-management.const";
import {Term} from "../../../entities/term/term.model";
import {OrgTreeModel} from "./common/org-management-orgTree.model";
/**
 * Created by lv-wei on 2017-05-23.
 */

@Injectable()
export class OrgManagementService {

  constructor(private termService: TermService){}


  log = Log.create("OrgManagementOrgTreeComponent", ...LOG_LEVEL);

  /**
   * 取得当前用户所能管理的组织结构，并将结构转换为jsTree格式
   *
   * @param root
   * @returns {any}
   */
  getTerms(root?: string): Observable<OrgTreeModel[]> {
    return Observable.create(observer => {
      this.termService.query().subscribe(
        (terms) => {
          this.log.data("getTerms: ", terms);
          observer.next(terms.json().map((term: Term) => {
            let orgTreeModel:OrgTreeModel = {...new OrgTreeModel(), ...term};
            orgTreeModel.text = orgTreeModel.name;
            return orgTreeModel;
          }));
        }
      );
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
    let devices = [{"text": "原平端直缓点", "type": "device"}, {"text": "原平端缓圆点", "type": "device"}];
    return Observable.create(observer => {
      observer.next(devices);
    });
  }
}
