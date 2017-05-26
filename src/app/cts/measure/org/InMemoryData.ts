import {Term} from "../../../entities/term/term.model";
import {TermRelationships} from "../../../entities/term-relationships/term-relationships.model";
import {InMemoryDbService} from "angular-in-memory-web-api";
/**
 * Created by lv-wei on 2017-02-27.
 */

export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    let terms: Term[] = [
      {"id":"dc1de55dc1a25a51", "name":"", "type":"", "parent":"#", "appId":"cts", "meta":"", "description": ""},
      {"id":"dca12e3eacd2", "name":"", "type":"", "parent":"dc1de55dc1a25a51", "appId":"cts", "meta":"", "description": ""},
      {"id":"14c5e2d", "name":"", "type":"", "parent":"dca12e3eacd2", "appId":"cts", "meta":"", "description": ""},
      {"id":"14c5e2d-sub1", "name":"", "type":"", "parent":"14c5e2d", "appId":"cts", "meta":"", "description": ""},
      {"id":"14c5e2d-sub2", "name":"", "type":"", "parent":"14c5e2d", "appId":"cts", "meta":"", "description": ""},
      {"id":"c312ab4dba1ba3e", "name":"", "type":"", "parent":"dca12e3eacd2", "appId":"cts", "meta":"", "description": ""},
      {"id":"c312ab4dba1ba3e-sub1", "name":"", "type":"", "parent":"c312ab4dba1ba3e", "appId":"cts", "meta":"", "description": ""},
      {"id":"c312ab4dba1ba3e-sub2", "name":"", "type":"", "parent":"c312ab4dba1ba3e", "appId":"cts", "meta":"", "description": ""},
    ];

    return {terms};
  }
}
