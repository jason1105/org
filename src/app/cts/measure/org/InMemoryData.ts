import {Term} from "../../../entities/term/term.model";
import {TermRelationships} from "../../../entities/term-relationships/term-relationships.model";
import {InMemoryDbService} from "angular-in-memory-web-api";
/**
 * Created by lv-wei on 2017-02-27.
 */

export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    let terms: Term[] = [
      {"id":"dc1de55dc1a25a51", "name":"/", "type":"org", "parent":"#", "appId":"cts", "meta":"", "description": ""},
      {"id":"dca12e3eacd2", "name":"铁路总公司", "type":"org", "parent":"dc1de55dc1a25a51", "appId":"cts", "meta":"", "description": ""},
      {"id":"14c5e2d", "name":"铁路轨道动态响应系统（西北地区）", "type":"org", "parent":"dca12e3eacd2", "appId":"cts", "meta":"", "description": ""},
      {"id":"14c5e2d-sub1", "name":"大西线", "type":"org", "parent":"14c5e2d", "appId":"cts", "meta":"", "description": ""},
      {"id":"14c5e2d-sub2", "name":"西宝客专", "type":"org", "parent":"14c5e2d", "appId":"cts", "meta":"", "description": ""},
      {"id":"c312ab4dba1ba3e", "name":"铁路轨道动态响应系统（华南地区）", "type":"org", "parent":"dca12e3eacd2", "appId":"cts", "meta":"", "description": ""},
      {"id":"c312ab4dba1ba3e-sub1", "name":"赣深客专", "type":"org", "parent":"c312ab4dba1ba3e", "appId":"cts", "meta":"", "description": ""},
      {"id":"c312ab4dba1ba3e-sub2", "name":"南昆客专", "type":"org", "parent":"c312ab4dba1ba3e", "appId":"cts", "meta":"", "description": ""},
    ];

    return {terms};
  }
}
