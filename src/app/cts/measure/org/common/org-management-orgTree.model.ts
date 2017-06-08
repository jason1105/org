import {Term} from "../../../../entities/term/term.model";
/**
 * Created by lv-wei on 2017-05-26.
 */
export class OrgTreeModel extends Term {

  constructor(
    public text?: string,
    public objId?: string
  ) {
    super();
  }

}

export class NodeType {
  public static ORGANIZATION = "org";
  public static DEVICE = "device";
  public static USER = "user";
}
