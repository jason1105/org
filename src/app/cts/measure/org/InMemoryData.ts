import {Term} from "../../../entities/term/term.model";
import {TermRelationships} from "../../../entities/term-relationships/term-relationships.model";
import {InMemoryDbService} from "angular-in-memory-web-api";
import {APPID} from "./common/org-management.const";
import {User} from "../../../shared/user/user.model";
import {Device} from "../../../entities/device/device.model";
/**
 * Created by lv-wei on 2017-02-27.
 */

export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    let terms: Term[] = [
      {id:"dc1de55dc1a25a51", name:"/", type:"org", parent:"#", appId: APPID, meta:"", description: ""},
      {id:"dca12e3eacd2", name:"铁路总公司", type:"org", parent:"dc1de55dc1a25a51", appId: APPID, meta:"", description: ""},
      {id:"14c5e2d", name:"铁路轨道动态响应系统（西北地区）", type:"org", parent:"dca12e3eacd2", appId: APPID, meta:"", description: ""},
      {id:"14c5e2dsub1", name:"大西线", type:"org", parent:"14c5e2d", appId: APPID, meta:"", description: ""},
      {id:"14c5e2dsub2", name:"西宝客专", type:"org", parent:"14c5e2d", appId: APPID, meta:"", description: ""},
      {id:"c312ab4dba1ba3e", name:"铁路轨道动态响应系统（华南地区）", type:"org", parent:"dca12e3eacd2", appId: APPID, meta:"", description: ""},
      {id:"c312ab4dba1ba3esub1", name:"赣深客专", type:"org", parent:"c312ab4dba1ba3e", appId: APPID, meta:"", description: ""},
      {id:"c312ab4dba1ba3esub2", name:"南昆客专", type:"org", parent:"c312ab4dba1ba3e", appId: APPID, meta:"", description: ""},
    ];

    let termRelationships: TermRelationships[] = [
      {id: "rel1", objectId:"device1", termId: "c312ab4dba1ba3esub1", objectType: "device", appId: APPID},
      {id: "rel2", objectId:"device2", termId: "c312ab4dba1ba3esub1", objectType: "device", appId: APPID},
      {id: "rel3", objectId:"user1", termId: "c312ab4dba1ba3esub1", objectType: "user", appId: APPID},
      {id: "rel4", objectId:"user1", termId: "14c5e2dsub1", objectType: "user", appId: APPID},
      {id: "rel5", objectId:"user2", termId: "14c5e2dsub1", objectType: "user", appId: APPID},
    ];

    let users: User[] = [
      {id: "user1", firstName: "王", lastName: "一"},
      {id: "user2", firstName: "王", lastName: "二"},
      {id: "user3", firstName: "张", lastName: "一"},
      {id: "user4", firstName: "张", lastName: "二"},
    ];

    let devices: Device = [
      {id: "device1", sn: "A1B0A001", conf: "{\"sysinfo\":{\"diname\":\"原平端直缓点\"}}"},
      {id: "device2", sn: "A1B0A002", conf: "{\"sysinfo\":{\"diname\":\"原平端缓圆点\"}}"},
      {id: "device3", sn: "A1B0A003", conf: "{\"sysinfo\":{\"diname\":\"测试设备\"}}"},
    ];

    return {terms, termRelationships, users, devices};
  }
}
