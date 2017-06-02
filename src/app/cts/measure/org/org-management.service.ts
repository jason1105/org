import {Component, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TermService} from "../../../entities/term/term.service";
import {Log} from "ng2-logger";
import {LOG_LEVEL} from "./common/org-management.const";
import {Term} from "../../../entities/term/term.model";
import {OrgTreeModel} from "./common/org-management-orgTree.model";
import {TermRelationships} from "../../../entities/term-relationships/term-relationships.model";
/**
 * Created by lv-wei on 2017-05-23.
 */

@Injectable()
export class OrgManagementService {

  constructor(private termService: TermService){}


  log = Log.create("OrgManagementService", ...LOG_LEVEL);

  /**
   * 取得当前用户所能管理的组织结构，并将结构转换为jsTree格式
   *
   * @param root
   * @returns {any}
   */
  getOrgs(root?: string): Observable<OrgTreeModel[]> {
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

  updateOrg(node: OrgTreeModel): Observable<OrgTreeModel> {
    // todo
    // 没有的场合，增加；已有的场合，更新

    return Observable.create(observer => {
      let orgTreeModel: OrgTreeModel = new OrgTreeModel();

      if (node.id) {
        this.termService.update(node).subscribe(
          (term) => {
            this.log.data("Update term: ", term);
            orgTreeModel = {...OrgTreeModel, ...term};
            orgTreeModel.text = orgTreeModel.name;
            observer.next(orgTreeModel);
          });

      } else {
        this.termService.create(node).subscribe(
          (term) => {
            this.log.data("Create term: ", term);
            orgTreeModel = {...OrgTreeModel, ...term};
            orgTreeModel.text = orgTreeModel.name;
            observer.next(orgTreeModel);
          });
      }

    });
  }

  delOrg(node: OrgTreeModel): Observable<boolean> {
    this.log.data("[SERVICE]", "delOrg");

    return Observable.create(observer => {

      // todo 删除Term表中的数据
      // todo 删除TermRelationship表中的数据

      observer.next(true);
    });
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

  addOrgRelationships(parentId:string, objectId:string , objectType?:string): Observable<boolean>{
    this.log.data("[SERVICE]", "addOrgRelationships");
    let rel = new TermRelationships()
    rel.appId = "CTS";
    rel.termId = parentId;
    rel.objectType = objectType;
    rel.objectId = objectId;

    // todo
    return Observable.create((observer) => {
      observer.next(true);
    });
  }

  delOrgRelationships(parentId:string, objectId:string , objectType?:string): Observable<boolean>{
    this.log.data("[SERVICE]", "delOrgRelationships");
    let rel = new TermRelationships()
    rel.appId = "CTS";
    rel.termId = parentId;
    rel.objectType = objectType;
    rel.objectId = objectId;

    // todo
    return Observable.create((observer) => {
      observer.next(true);
    });
  }
  // addOrgRelationships(): Observable<boolean>{return null;};
}
